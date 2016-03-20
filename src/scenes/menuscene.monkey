
Import lp2
Import consts


Class MenuScene Extends Scene

Private
    Field loading_step:Int = 10

Public
    Method Loading:Int()
        Self.loading_step -= 1

        Select Self.loading_step
            Case 9
                Self.Cameras.Get( 0 ).ViewPort.Width = SCREEN_WIDTH
                Self.Cameras.Get( 0 ).ViewPort.Height = SCREEN_HEIGHT
        End

        Return Self.loading_step
    End

    Method LoadingRender:Void()
        SetColor(COLOR_4[0], COLOR_4[1], COLOR_4[2])
        DrawRect( 0,0,SCREEN_WIDTH * 4, SCREEN_HEIGHT * 4 )
        SetColor(255,255,255)
    End


    Method Render:Void()
        Cls COLOR_1[0],COLOR_1[1],COLOR_1[2]
        Super.Render()
    End

End
