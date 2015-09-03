Import lp2

Class SpaceShooterControl

    Field target:Point
    Field shot:Bool
    Field speed:Int = 50

    Method New(target:Point)
        Self.target = target
    End

    Method Update:Void()
        Self.shot = False

        If (KeyDown(KEY_UP) Or KeyDown(KEY_W))
            Self.target.Y -= Self.speed * Time.DeltaSecs
        EndIf

        If (KeyDown(KEY_DOWN) Or KeyDown(KEY_S))
            Self.target.Y += Self.speed * Time.DeltaSecs
        End

        If (KeyDown(KEY_LEFT) Or KeyDown(KEY_A))
            Self.target.X -= Self.speed * Time.DeltaSecs
        End

        If (KeyDown(KEY_RIGHT) Or KeyDown(KEY_D))
            Self.target.X += Self.speed * Time.DeltaSecs
        End

        If (KeyHit(KEY_SPACE) Or KeyHit(KEY_X))
            Self.shot = True
        EndIf

    End

    Method Shot:Bool()
        Return Self.shot
    End

End
