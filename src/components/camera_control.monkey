Import lp2


Class CameraControl Implements iDrawable

    Field target:Rectangle
    Field x_speed:Float = 25
    Field y_speed:Float = 0
    Field player:Rectangle

    Method New(target:Rectangle)
        Self.target = target
    End

    Method Update:Void()
        Self.target.X += Self.x_speed * Time.DeltaSecs
        Self.target.Y += Self.y_speed * Time.DeltaSecs

        Self.player.X += Self.x_speed * Time.DeltaSecs
    End

    Method Create:Void()
        ''' nothing here
    End

    Method Render:Void()
        ''' nothing here
    End

End
