Import lp2

Class Bullet Extends lpImage

    Field max_live_time:Float = 0.2
    Field current_live_time:Float = 0

    Method New(img:Image, position:Vec2)
        Super.New(img, position)
    End
End

Class SpaceShooterCannon Implements iDrawable

    Field offset:Point
    Field target:Point
    Field sprites:Image[]

    Field bullets:List<Bullet>
    Field discard_list:List<Bullet>

    Field level:Int = 0

    Field speed:Int = 300

    Method New(target:Point)
        Self.target = target
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.offset = New Point(0,0)
        Self.bullets = New List<Bullet>
        Self.discard_list = New List<Bullet>
    End

    Method Update:Void()
        For Local b:=Eachin Self.bullets
            b.Position.X += Self.speed * Time.DeltaSecs
            b.current_live_time += Time.DeltaSecs

            If (b.max_live_time * (1 + Self.level) <= b.current_live_time)
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

    End

    Method Render:Void()
        For Local b:=Eachin Self.bullets
            b.Render()
        Next
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