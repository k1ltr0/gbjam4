Import sprites
Import lp2
Import lp2.animatedsprite


Class EnemyWave Extends Enemy

    Field speed:Int = -25
    Field initial_y:Int = 0
    Field active:ActiveOnCamera

    Method New(position:Rectangle)

        Super.New(position, "play")
        Self.position = position
        Self.initial_y = Self.position.Y

        Self.active = New ActiveOnCamera(Self.position)

        Self.Create()
    End

    Method Update:Void()
        Super.Update()
        Self.active.Update()
        If (Not(Self.active.IsActive())) Then Return

        Self.animated_sprite.Update()

        Self.position.X += Self.speed * Time.DeltaSecs
        Self.position.Y = Self.initial_y  + (Sin((Self.position.X Mod 45) * 8) * 7)
    End

    Method Shot:Void() ''' do noting
    End

End
