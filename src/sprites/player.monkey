Import lp2
Import lp2.animatedsprite
Import src.components

Class Player Implements iDrawable, iOnCollide

    Field sprite:AnimatedSprite
    Field position:Rectangle

    Field control:SpaceShooterControl
    Field cannon:SpaceShooterCannon

    Method New()
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.position = New Rectangle(30,60,23,8)

        ''' ship animation
        Self.sprite = new AnimatedSprite("ship.png", new Vec2(0,0), 23, 8, 2)
        Self.sprite.AddSequence("fly", [0,1])
        Self.sprite.PlaySequence("fly", 1000/12)

        ''' movement controls
        Self.control = New SpaceShooterControl(Self.position)

        ''' cannon
        Self.cannon = New SpaceShooterCannon(Self.position)

        Self.cannon.Offset.X = 25
        Self.cannon.Offset.Y = 4

        Self.cannon.AddSprite("bullet_level_0.png")  '' level 0
        Self.cannon.AddSprite("bullet_level_1.png")  '' level 1
        Self.cannon.AddSprite("bullet_level_2.png")  '' level 2
        Self.cannon.AddSprite("bullet_level_3.png")  '' level 3

        CollisionEngine.Instance.AddBody(Self)
    End
    
    Method Update:Void()
        Self.sprite.Update()
        Self.control.Update()
        Self.cannon.Update()

        If (Self.control.Shot())
            Self.cannon.Shot()
        EndIf

    End
    
    Method Render:Void()
        PushMatrix()
        Translate Self.position.X, Self.position.Y
        Self.sprite.Render()
        PopMatrix()

        Self.cannon.Render()
    End


    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.position
    End

    Method OnCollide:Void(name:String)
        If (name = "powerup")
            Self.cannon.LevelUp()
        ElseIf (name = "enemy")
            Self.cannon.LevelDown()
        End
    End

    Method GetName:String()
        Return "player"
    End


End
