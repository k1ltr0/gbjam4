Import lp2


Class CameraControl Implements iDrawable

    Field target:Rectangle
    Field x_speed:Float = 25
    Field y_speed:Float = 0
    Field player:Rectangle

    Field max_x:Int = 320 * 8

    Method New(target:Rectangle)
        Self.target = target
    End

    Method Update:Void()
        If (Self.target.X + Self.target.Width >= Self.max_x)
            Self.target.X = Self.max_x - Self.target.Width
        Else
            Self.target.X += Self.x_speed * Time.DeltaSecs
            Self.target.Y += Self.y_speed * Time.DeltaSecs

            Self.player.X += Self.x_speed * Time.DeltaSecs

        EndIf

    End

    Method Create:Void()
        ''' nothing here
    End

    Method Render:Void()
        ''' nothing here
    End

End
