import lp2
Import lp2.animatedsprite
Import enemy


Class EnemyTurret Extends Enemy

    Method New(position:Rectangle, gid:String)
        Super.New(position, gid)
    End

    Method Create:Void()
        Super.Create()

        ''' collisions
        CollisionEngine.Instance.AddStaticBody(Self)

        ''' cannon
        Self.cannon = New EnemyCannon
    End

    Method Shot:Void()
        Self.cannon.Shot(
            Self.position.X, Self.position.Y,
            Self.player_position.CenterX, Self.player_position.CenterY)
    End
End
