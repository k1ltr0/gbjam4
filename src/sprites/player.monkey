Import lp2
Import lp2.animatedsprite
Import src.components
Import main

Class Player Implements iDrawable, iOnCollide

    Field sprite:AnimatedSprite
    Field explosion:AnimatedSprite
    Field particles_emitter:ParticleEmitter
    Field position:Rectangle
    Field box:Rectangle

    Field control:SpaceShooterControl
    Field cannon:SpaceShooterCannon

    ''' state machine
    Const STATE_ALIVE:Int = 0
    Const STATE_EXPLODE:Int = 1
    Const STATE_DIE:Int = 2

    Field state:Int = STATE_ALIVE

    Method New()
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.position = New Rectangle(30,60,23,8)
        Self.box = New Rectangle(0, 0, 10, 4)

        ''' ship animation
        Self.sprite = new AnimatedSprite("ship.png", new Vec2(0,0), 23, 8, 1)
        Self.sprite.AddSequence("fly", [0])
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

        Self.particles_emitter = New ParticleEmitter()
        Self.particles_emitter.LoadFromJson(LoadString("ship_booster.json"))
        Self.particles_emitter.Position.X = 0
        Self.particles_emitter.Position.Y = 0

        CollisionEngine.Instance.AddBody(Self)

        ''' explosion
        Self.explosion = New AnimatedSprite("explosion.png", new Vec2(0,0), 9,9,14)
        Self.explosion.AddSequence("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13])
    End
    
    Method Update:Void()

        If Self.state = STATE_ALIVE
            Self.sprite.Update()
            Self.control.Update()
            Self.cannon.Update()
            Self.particles_emitter.Update()

            If (Self.control.Shot())
                Self.cannon.Shot()
            EndIf

            Self.box.X = Self.position.X + 10
            Self.box.Y = Self.position.Y + 2

            Self.particles_emitter.Position.X = Self.position.X + 7
            Self.particles_emitter.Position.Y = Self.position.Y + Self.position.Height / 2
        ElseIf Self.state = STATE_EXPLODE
            Self.explosion.Update()

            If (Self.explosion.IsLastFrame)
                Game.Instance.SetScene(GAME_SCENE)
            EndIf
        EndIf

    End
    
    Method Render:Void()

        If Self.state = STATE_ALIVE
            Self.particles_emitter.Render()

            PushMatrix()
            Translate Self.position.X, Self.position.Y
            Self.sprite.Render()
            PopMatrix()

            Self.cannon.Render()
        ElseIf Self.state = STATE_EXPLODE
            Self.explosion.Render()
        End
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

        Self.state = STATE_EXPLODE

        Self.explosion.Position.X = Self.position.X + 10
        Self.explosion.Position.Y = Self.position.Y
        Self.explosion.PlaySequence("explode")

        Time.SlowDown(0.5, 1000)
        '' Game.Instance.SetScene(GAME_SCENE)
    End

    Method GetName:String()
        Return "player"
    End


End
