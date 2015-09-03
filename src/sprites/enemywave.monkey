Import sprites
Import lp2
Import lp2.animatedsprite


Class EnemyWave Extends Enemy

    Field active:ActiveOnCamera
    Field wavymovement:WavyMovement

    Method New(position:Rectangle)

        Super.New(position, "play")
        Self.position = position

        Self.active = New ActiveOnCamera(Self.position)
        Self.wavymovement = New WavyMovement(Self.position)

        Self.Create()
    End

    Method Update:Void()
        Super.Update()
        Self.active.Update()

        If (Not(Self.active.IsActive())) Then Return

        Self.animated_sprite.Update()
        Self.wavymovement.Update()
    End

    Method Shot:Void() ''' do noting
    End

End
