import lp2
Import lp2.animatedsprite
Import enemy

Class EnemyTurretAI Extends EnemyAI
    Method New(parent:Enemy)
        Super.New(parent)
    End
End


Class EnemyTurret Extends Enemy

    Method New(position:Rectangle, gid:String)
        Super.New(position, gid)
    End

    Method Create:Void()

        ''' sprite
        Self.animated_sprite = New AnimatedSprite("enemies.png", new Vec2(0,0), 9, 9, 5)
        Self.animated_sprite.AddSequence("4097", [0])
        Self.animated_sprite.AddSequence("4098", [1])
        Self.animated_sprite.AddSequence("4099", [2])
        Self.animated_sprite.AddSequence("4100", [3])
        Self.animated_sprite.AddSequence("4101", [4])

        Self.animated_sprite.PlaySequence(self.type)

        ''' collisions
        CollisionEngine.Instance.AddStaticBody(Self)

        ''' cannon
        Self.cannon = New EnemyCannon

        Self.InitAI()
    End

    Method InitAI:Void()
        Self.ai = New EnemyTurretAI(Self)
    End
End
