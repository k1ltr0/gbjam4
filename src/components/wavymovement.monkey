Import lp2

Class WavyMovement Implements iDrawable

    Field initial_y:Int = 0
    Field speed:Int = -25
    Field target:Rectangle

    Method New(target:Rectangle)
        Self.target = target
        Self.initial_y = Self.target.Y
    End

    ''' implementing iDrawable
    Method Create:Void()
    End
    
    Method Update:Void()
        Self.target.X += Self.speed * Time.DeltaSecs
        Self.target.Y = Self.initial_y  + (Sin((Self.target.X Mod 45) * 8) * 7)
    End

    Method Render:Void()
    End

End
