Import lp2
Import lp2.animatedsprite
Import src.components


Class Enemy Implements iDrawable, iOnCollide

    Field position:Rectangle
    Field type:String

    Field animated_sprite:AnimatedSprite
    Field visible:Bool = True

    Method New(position:Rectangle, type:String)
        Self.position = position
        Self.type = type
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()

        ''' sprite
        Self.animated_sprite = New AnimatedSprite("enemies.png", new Vec2(0,0), 9, 9, 3)
        Self.animated_sprite.AddSequence("4097", [0])
        Self.animated_sprite.AddSequence("4098", [1])
        Self.animated_sprite.AddSequence("4099", [2])

        Self.animated_sprite.PlaySequence(Self.type)

        ''' collisions
        CollisionEngine.Instance.AddStaticBody(Self)
    End
    
    Method Update:Void()
        Self.animated_sprite.Update()
    End
    
    Method Render:Void()
        If (Not(Self.visible)) Then Return
        
        PushMatrix()
        Translate Self.position.X, Self.position.Y
        Self.animated_sprite.Render()
        PopMatrix()
    End

    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.position
    End

    Method OnCollide:Void(name:String)
        If (name = "player")
            Self.visible = False
            CollisionEngine.Instance.Destroy(Self)
        EndIf
    End

    Method GetName:String()
        Return "enemy"
    End

End
