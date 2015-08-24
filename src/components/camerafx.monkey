Import lp2
Import lp2.math


Class CameraFX

Private 

    Field camera_view:Rectangle

    ' state machine

    Const STATE_IDLE:Int = 0
    Const STATE_SHAKING:Int = 1
    Field state:Int = STATE_IDLE

    Field timer:Int = 0
    Field time:Int = 100
    Field force_x:Float = 100
    Field force_y:Float = 100

    Field correction_x:Float = 0
    Field correction_y:Float = 0

Public

    Method New(camera_view:Rectangle=Null)

        If (camera_view <> Null)
            Self.CameraView = camera_view
        EndIf
        
    End

    Method CameraView:Void(value:Rectangle)
        Self.camera_view = value
    End

    Method CameraView:Rectangle()
        Return Self.camera_view
    End

    Method Update:Void()
        If (Self.state = Self.STATE_SHAKING)
            If (Self.timer < Self.time)
                Self.timer += Time.Delta

                Local v_x:= Math.Round(Rnd( -Self.force_x, Self.force_x ))
                Local v_y:= Math.Round(Rnd( -Self.force_y, Self.force_y ))
                correction_x += v_x
                correction_y += v_y
                Self.camera_view.X += v_x
                Self.camera_view.Y += v_y

            Else
                Self.camera_view.X -= correction_x
                Self.camera_view.Y -= correction_y

                correction_x = 0
                correction_y = 0
                Self.state = Self.STATE_IDLE
            EndIf
        End
    End

    Method Render:Void()
        '' don't render
    End

    #Rem
    /**
     * moves randomly an object from a side to other
     * @param Int time time shake will be active
     * @param Int force pixels for the range of movement
     */
    #End
    Method Shake(time:Int=300, force_x:Float=10, force_y:Float=10)

        Self.timer = 0
        Self.time = time
        Self.force_x = force_x
        Self.force_y = force_y
        Self.state = Self.STATE_SHAKING
    End

End
