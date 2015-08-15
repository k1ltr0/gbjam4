Import lp2
Import consts
Import src.spaces

Class GameScene Extends Scene

    Field loading_step:Int = 10

    Field game_play_space:GamePlaySpace

    Method Loading:Int()
        Self.loading_step -= 1

        Select Self.loading_step
            Case 9
                Self.Cameras.Get( 0 ).ViewPort.Width = SCREEN_WIDTH
                Self.Cameras.Get( 0 ).ViewPort.Height = SCREEN_HEIGHT

            Case 8
                Self.game_play_space = new GamePlaySpace()
                Self.AddChild(Self.game_play_space)
        End

        Return Self.loading_step
    End

    Method LoadingRender:Void()
        SetColor (COLOR_4[0], COLOR_4[1], COLOR_4[2])
        DrawRect( 0,0,SCREEN_WIDTH * 4, SCREEN_HEIGHT * 4 )
        SetColor (255,255,255)
    End

End