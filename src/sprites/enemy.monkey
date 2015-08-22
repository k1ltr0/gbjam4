Import lp2
Import lp2.animatedsprite
Import src.components
Import consts

Class EnemyAI Implements iDrawable

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

Class EnemyAAI Extends EnemyAI
    Method New(parent:Enemy)
        Super.New(parent)
    End
End

Class EnemyBAI Extends EnemyAI
    Method New(parent:Enemy)
        Super.New(parent)
    End
End

Class EnemyCAI Extends EnemyAI
    Method New(parent:Enemy)
        Super.New(parent)
    End
End


Class Enemy Implements iDrawable, iOnCollide

    Field position:Rectangle
    Field type:String

    Field animated_sprite:AnimatedSprite
    Field visible:Bool = True

    Field cannon:EnemyCannon

    Field ai:EnemyAI

    Field player_position:Rectangle

    Method New(position:Rectangle, type:String)
        Self.position = position
        Self.position.Y -= position.Height
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

        ''' cannon
        Self.cannon = New EnemyCannon

        Self.InitAI()
    End

    Method InitAI:Void()
        Select Self.type
            Case ENEMY_A 
                Self.ai = New EnemyAAI(Self)
            Case ENEMY_B
                Self.ai = New EnemyBAI(Self)
            Case ENEMY_C
                Self.ai = New EnemyCAI(Self)
        End
    End

    Method Update:Void()
        If (Not(visible)) Then Return
        
        Self.animated_sprite.Update()
        Self.ai.Update()
        Self.cannon.Update()
    End
    
    Method Render:Void()
        If (Not(Self.visible)) Then Return
        
        PushMatrix()
        Translate Self.position.X, Self.position.Y
        Self.animated_sprite.Render()
        PopMatrix()

        Self.cannon.Render()
    End

    ''' iOnCollide
    Method GetBox:Rectangle()
        Return Self.position
    End

    Method OnCollide:Void(name:String)
        If (name = "player" Or name = "player_bullet")
            Self.visible = False
            Self.cannon.Destroy()
            CollisionEngine.Instance.Destroy(Self)
        EndIf
    End

    Method GetName:String()
        Return "enemy"
    End

    Method Shot:Void()
        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.player_position.CenterX, Self.player_position.CenterY)
    End

End
