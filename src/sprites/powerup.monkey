Import lp2
Import src.components

Class PowerUp Implements iDrawable, iOnCollide

    Field sprite:lpImage
    Field position:Rectangle
    Field visible:Bool = True

    Method New(position:Rectangle)

        Self.position = position

        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        ''' adding tiled offset
        Self.position.X += 3
        Self.position.Y += 2

        ''' loading image into memory
        Self.sprite = New lpImage("powerup.png", New Vec2(0,0))

        '' add to collision engine
        CollisionEngine.Instance.AddBody(Self)
    End
    
    Method Update:Void()
    End
    
    Method Render:Void()

        If (Not(Self.visible)) Then Return 

        PushMatrix()
            Translate Self.position.X, Self.position.Y
            Self.sprite.Render()
        PopMatrix()
    End

    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.position
    End
    Method OnCollide:Void(name:String)
        If (name = "player")
            Self.Destroy()
        EndIf
    End
    Method GetName:String()
        Return "powerup"
    End


    Method Destroy:Void()
        Self.visible = False
        CollisionEngine.Instance.Destroy(Self)
    End
End
