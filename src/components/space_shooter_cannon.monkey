Import lp2
Import collision_engine
Import camerafx


Interface iOnDestroy
    Method OnDestroy(e:iDrawable)
End

Class Bullet Extends AnimatedSprite Implements iOnCollide

    Field max_live_time:Float = 0.3
    Field current_live_time:Float = 0
    Field visible:Bool = True

    Const STATE_SHOT:Int = 0
    Const STATE_EXPLODE:Int = 1

    Field state:Int = STATE_SHOT
    Field current_time_exploded:Int = 0

    Field destroy_listener:iOnDestroy

    Field speed:Int = 150

    Field level:Int = 0

    Global sound:Sound

    Method New(img:Image, position:Vec2)
        Super.New("bullet_level_0.png", position, 8.0, 4.0, 2)

        Self.AddSequence("shot", [0])
        Self.AddSequence("explode", [1])

        Self.PlaySequence("shot")

        CollisionEngine.Instance.AddBody(Self)

        If (Bullet.sound = Null)
            Bullet.sound = LoadSound("sounds/hit.mp3")
        EndIf
    End

    Method Update:Void()
        Super.Update()

        If (Self.state = Bullet.STATE_SHOT)

            Self.Position.X += Self.speed * Time.DeltaSecs
            If (Self.max_live_time * (1 + Self.level) <= Self.current_live_time)
                CollisionEngine.Instance.Destroy(Self)
                Self.Destroy()
            EndIf

        ElseIf (Self.state = Bullet.STATE_EXPLODE)

            If Self.max_live_time <= Self.current_live_time
                Self.visible = False
                Self.Destroy()
            End

        End

        Self.current_live_time += Time.DeltaSecs
    End


    Method GetBox:Rectangle()
        Return Self.Position
    End

    Method OnCollide:Void(name:String)
        If name = "wall" Or name = "enemy"
            Self.state = STATE_EXPLODE

            CollisionEngine.Instance.Destroy(Self)
            Self.PlaySequence("explode")

            Self.current_live_time = 0
            Self.max_live_time = 0.1

            PlaySound(Bullet.sound, 2)
        End
    End
    Method GetName:String()
        Return "player_bullet"
    End

    Method Destroy:Void()
        Self.destroy_listener.OnDestroy(Self)
    End

    Method OnDestroyListener:Void(l:iOnDestroy)
        Self.destroy_listener = l
    End
End

Class SpaceShooterCannon Implements iDrawable, iOnDestroy

    Field offset:Point
    Field target:Point
    Field sprites:Image[]

    Field bullets:List<Bullet>
    Field discard_list:List<Bullet>

    Field level:Int = 0

    Field camera_fx:CameraFX

    Field sound:Sound

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
        Self.sound = LoadSound("sounds/shot.mp3")
        SetChannelVolume( 0, 0.2 )
    End

    Method Update:Void()
        For Local b:=Eachin Self.bullets
            b.Update()
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
        img.OnDestroyListener = Self

        self.bullets.AddLast(img)
        Self.camera_fx.Recoil()

        PlaySound(Self.sound, 0)
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

    Method OnDestroy(e:iDrawable)
        Self.discard_list.AddLast(Bullet(e))
    End
    

End
