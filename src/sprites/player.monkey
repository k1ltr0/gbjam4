Import lp2
Import lp2.animatedsprite
Import src.components
Import main

Class Player Implements iDrawable, iOnCollide

    Field sprite:AnimatedSprite
    Field position:Rectangle
    Field box:Rectangle

    Field control:SpaceShooterControl
    Field cannon:SpaceShooterCannon

    Field visible:Bool = True

    Method New()
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.position = New Rectangle(30,60,23,8)
        Self.box = New Rectangle(0, 0, 10, 4)

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

        Self.box.X = Self.position.X + 10
        Self.box.Y = Self.position.Y + 2

    End
    
    Method Render:Void()

        If (Not(Self.visible)) Then Return

        PushMatrix()
        Translate Self.position.X, Self.position.Y
        Self.sprite.Render()
        PopMatrix()

        Self.cannon.Render()
    End


    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.box
    End

    Method OnCollide:Void(name:String)
        If (name = "powerup")
            Self.cannon.LevelUp()
        ElseIf (name = "enemy" Or name = "enemy_bullet")

            If (Self.cannon.level = 0)
                Self.Die()
            Else
                Self.cannon.LevelDown()
                Time.Freeze(200)
            EndIf
        ElseIf (name = "wall")
            Self.Die()
        End
    End

    Method Die:Void()

        CollisionEngine.Instance.Destroy(Self)
        CollisionEngine.Instance.DestroyAll()
        Self.visible = False

        Game.Instance.SetScene(GAME_SCENE)
    End

    Method GetName:String()
        Return "player"
    End


End
