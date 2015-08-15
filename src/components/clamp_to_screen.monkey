Import lp2


Class ClampToScreen

    Field target:Rectangle
    Field camera_viewport:Rectangle

    Method New(target:Rectangle)
        Self.target = target
    End

    Method Update:Void()
        If (Self.target.X < Self.camera_viewport.X)
            Self.target.X = Self.camera_viewport.X
        End

        If (Self.target.Y < Self.camera_viewport.Y)
            Self.target.Y = Self.camera_viewport.Y
        End

        If (Self.target.X + Self.target.Width > Self.camera_viewport.X + Self.camera_viewport.Width)
            Self.target.X = Self.camera_viewport.X + Self.camera_viewport.Width - Self.target.Width
        EndIf

        If (Self.target.Y + Self.target.Height > Self.camera_viewport.Y + Self.camera_viewport.Height)
            Self.target.Y Self.camera_viewport.Y + Self.camera_viewport.Height - Self.target.Height
        EndIf
        
    End

End
