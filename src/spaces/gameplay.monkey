Import lp2
Import src.sprites


Class GamePlaySpace Extends Space

    Field player:Player

    Method Create:Void()
        Self.player = new Player()
        Self.AddChild(Self.player)
    End
End
