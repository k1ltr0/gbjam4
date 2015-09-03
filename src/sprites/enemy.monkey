Import lp2
Import lp2.animatedsprite
Import src.components
Import consts

Class SimpleShotAI Implements iDrawable

    Field shot_time :Int = 2000
    Field shot_timer:Int

    Field parent:Enemy

    Method New(parent:Enemy)
        Self.parent = parent

        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
    End
    
    Method Update:Void()

        Self.shot_timer += Time.Delta

        If (Self.shot_timer >= Self.shot_time)
            Self.shot_timer = 0

            Self.parent.Shot()
        EndIf

    End
    
    Method Render:Void()
    End

End


Class Enemy Implements iDrawable, iOnCollide

    Field position:Rectangle
    Field type:String

    Field animated_sprite:AnimatedSprite
    Field visible:Bool = True

    Field cannon:EnemyCannon

    Field ai:SimpleShotAI

    Field player_position:Rectangle

    Field explosion:AnimatedSprite


    ''' state machine
    Const STATE_ALIVE:Int = 0
    Const STATE_EXPLODE:Int = 1
    Const STATE_DIE:Int = 2

    Field state:Int = STATE_ALIVE

    Method New(position:Rectangle, type:String)
        Self.position = position
        Self.position.Y -= position.Height
        Self.type = type
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()

        ''' sprite
        Self.animated_sprite = New AnimatedSprite("enemies.png", new Vec2(0,0), 9, 9, 6)
        Self.animated_sprite.AddSequence("4097", [0])
        Self.animated_sprite.AddSequence("4098", [1])
        Self.animated_sprite.AddSequence("4099", [2])
        Self.animated_sprite.AddSequence("4100", [3])
        Self.animated_sprite.AddSequence("4101", [4])
        Self.animated_sprite.AddSequence("play", [5])

        Self.animated_sprite.PlaySequence(Self.type)

        ''' collisions
        CollisionEngine.Instance.AddStaticBody(Self)

        ''' cannon
        Self.cannon = New EnemyCannon

        Self.ai = New SimpleShotAI(Self)

        ''' explosion
        Self.explosion = New AnimatedSprite("explosion.png", new Vec2(0,0), 9,9,14)
        Self.explosion.AddSequence("explode", [0,1,2,3,4,5,6,7,8,9,10,11,12,13])
        '' Self.explosion.PlaySequence("explode", 70, False)
    End

    Method Update:Void()
        If (Not(visible)) Then Return

        If (Self.state = STATE_ALIVE)

            Self.animated_sprite.Update()
            Self.ai.Update()
            Self.cannon.Update()

        ElseIf(Self.state = STATE_EXPLODE)

            Self.explosion.Update()

            If (Self.explosion.IsLastFrame) Then Self.state = STATE_DIE

        ElseIf(Self.state = STATE_DIE)

            Self.visible = False

        EndIf
    End
    
    Method Render:Void()
        If (Not(Self.visible)) Then Return

        If (Self.state = STATE_ALIVE)

            PushMatrix()
            Translate Self.position.X, Self.position.Y
            Self.animated_sprite.Render()
            PopMatrix()

            Self.cannon.Render()

        ElseIf (Self.state = STATE_EXPLODE)
            Self.explosion.Render()
        End
    End

    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.position
    End

    Method OnCollide:Void(name:String)
        If (name = "player" Or name = "player_bullet")
            Time.Freeze(100)
            Self.explosion.PlaySequence("explode", 70)
            Self.explosion.Position.X = Self.position.X
            Self.explosion.Position.Y = Self.position.Y
            Self.state = STATE_EXPLODE
            '' Self.visible = False
            Self.cannon.Destroy()
            CollisionEngine.Instance.Destroy(Self)
        EndIf
    End

    Method GetName:String()
        Return "enemy"
    End

    Method AAShot:Void()
        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X-1, Self.position.Y)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X+1, Self.position.Y)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X, Self.position.Y-1)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X, Self.position.Y+1)
    End

    Method XShot:Void()
        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X-1, Self.position.Y-1)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X+1, Self.position.Y+1)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X+1, Self.position.Y-1)

        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.position.X-1, Self.position.Y+1)
    End

    Method Shot:Void()

        If (Self.type = 4097)
            Self.AAShot()
        ElseIf (Self.type = 4098)
            Self.AAShot()
            Self.XShot()
        ElseIf(Self.type = 4099)
            Self.XShot()
        EndIf

    End

End
