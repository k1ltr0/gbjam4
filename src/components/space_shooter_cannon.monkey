Import lp2
Import collision_engine
Import camerafx

Class Bullet Extends lpImage Implements iOnCollide

    Field max_live_time:Float = 0.3
    Field current_live_time:Float = 0
    Field visible:Bool = True

    Method New(img:Image, position:Vec2)
        Super.New(img, position)

        CollisionEngine.Instance.AddBody(Self)
    End

    Method GetBox:Rectangle()
        Return Self.Position
    End
    Method OnCollide:Void(name:String)
        If name = "wall" Or name = "enemy"
            Self.Destroy()
        End
    End
    Method GetName:String()
        Return "player_bullet"
    End

    Method Destroy:Void()
        CollisionEngine.Instance.Destroy(Self)
        Self.visible = False
    End
End

Class SpaceShooterCannon Implements iDrawable

    Field offset:Point
    Field target:Point
    Field sprites:Image[]

    Field bullets:List<Bullet>
    Field discard_list:List<Bullet>

    Field level:Int = 0

    Field speed:Int = 150
    Field camera_fx:CameraFX

    Method New(target:Point)
        Self.target = target
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.offset = New Point(0,0)
        Self.bullets = New List<Bullet>
        Self.discard_list = New List<Bullet>
        Self.camera_fx = New CameraFX(Game.Instance.GetCurrentCamera.ViewPort)
    End

    Method Update:Void()
        For Local b:=Eachin Self.bullets
            b.Position.X += Self.speed * Time.DeltaSecs
            b.current_live_time += Time.DeltaSecs

            If (b.max_live_time * (1 + Self.level) <= b.current_live_time)
                b.Destroy()
                Self.discard_list.AddLast(b)
            EndIf
            
        Next

        ''' discard bullets
        For Local db:=Eachin Self.discard_list
            Self.bullets.RemoveEach( db )
        Next

        Self.discard_list.Clear()


        If (KeyHit(KEY_Q))
            Self.LevelUp()
        EndIf
        
        If (KeyHit(KEY_E))
            Self.LevelDown()
        EndIf

        Self.camera_fx.Update()

    End

    Method Render:Void()
        For Local b:=Eachin Self.bullets
            If (b.visible)
                b.Render()
            EndIf
        Next

        Self.camera_fx.Render()
    End

    Method Offset:Point()
        Return Self.offset
    End

    Method Shot:Void()
        Local img:= New Bullet(
                            sprites[Self.level], 
                            new Vec2(
                                Self.target.X + Self.offset.X, 
                                Self.target.Y + Self.offset.Y))

        self.bullets.AddLast(img)

        '' Self.camera_fx.Shake(100, 0.2 * (level+1), 0.2 * (level+1))
        Self.camera_fx.Recoil()
    End

    Method LevelUp:Void()
        Self.level += 1
        If (Self.sprites.Length() <= Self.level)
            Self.level = Self.sprites.Length() - 1
        EndIf
    End

    Method LevelDown:Void()
        Self.level -= 1
        If (Self.level < 0)
            Self.level = 0
        EndIf
    End

    '' add an image, adding more images implies adding more level of bullets
    Method AddSprite:Void(sprite_name:String)
        Local imgs:= new List<Image>(sprites)

        imgs.AddLast( lpLoadImage(sprite_name) )

        sprites = imgs.ToArray()
    End

End
