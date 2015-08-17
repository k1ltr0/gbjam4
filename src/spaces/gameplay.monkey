Import lp2
Import src.sprites


Class GamePlaySpace Extends Space

    Field player:Player
    Field world:World

    Field screen_clamp:ClampToScreen
    Field camera_control:CameraControl

    Method Create:Void()
        Self.world = New World()
        Self.AddChild(Self.world)

        Self.player = new Player()
        Self.AddChild(Self.player)

        ''' clamp to camera
        Self.screen_clamp = New ClampToScreen(Self.player.position)
        Self.screen_clamp.camera_viewport = Game.Instance().GetCurrentCamera().ViewPort
        Self.AddChild(Self.screen_clamp)

        ''' camera control
        Self.camera_control = New CameraControl(Game.Instance.GetCurrentCamera.ViewPort)
        Self.camera_control.player = Self.player.position
        Self.AddChild(Self.camera_control)
    End

End
