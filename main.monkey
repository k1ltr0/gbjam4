Import lp2
Import src.scenes
Import consts
Import src.enablepixelart

Class GBNova Extends Game

    Method Create:Void()
        SetUpdateRate( 0 )

        enablePixelArt()

        Self.SetScene( MENU_SCENE )
    End

    Method GetScene:Scene( scene:Int )
        Select scene
            Case MENU_SCENE
                Return New MenuScene()
            Case GAME_SCENE
                Return new GameScene()
        End
    End

End

Function Main:Int()
    new GBNova()
    Return 
End
