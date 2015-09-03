import lp2
Import lp2.animatedsprite
Import enemy

Class EnemyRectLine Extends Enemy

    Field wait_timer:Int = 0
    Field wait_time:Int = 1000

    Const STATE_WAIT:Int = 0
    Const STATE_SHOT:Int = 1

    Field shot_state:Int = STATE_WAIT

    Method New(position:Rectangle, gid:String)
        Super.New(position, gid)
    End

    Method CreateSprite:Void()
        Self.animated_sprite = New AnimatedSprite("rectline_enemy.png", new Vec2(0,0), 25, 10, 1)
        Self.animated_sprite.AddSequence(Self.type, [0])

        Self.animated_sprite.PlaySequence(Self.type)
    End

    Method Update:Void()

        Super.Update()

        If Collision.AABBIntersects(Game.Instance.GetCurrentCamera().ViewPort, Self.position)

            If Self.shot_state = STATE_WAIT
                Self.position.X = Game.Instance.GetCurrentCamera().ViewPort.X + Game.Instance.GetCurrentCamera().ViewPort.Width - 10

                If (Self.wait_timer >= Self.wait_time)
                    Self.shot_state = STATE_SHOT
                    Self.wait_timer = 0
                EndIf

                Self.wait_timer += Time.Delta
            ElseIf Self.shot_state = STATE_SHOT
                Self.position.X -= 100 * Time.DeltaSecs
            End
        End
    End

    Method Shot:Void()
    End

End