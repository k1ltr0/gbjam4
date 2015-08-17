Import lp2
Import lp2.tilemap
Import src.components


Class World Implements iDrawable

    Field tile_map:TileMap

    Method New()
        Self.Create()
    End
    
    ''' implementing iDrawable
    Method Create:Void()
        ''' load current level
        Self.tile_map = new TileMap("level_1.json")
    End
    
    Method Update:Void()
        Self.tile_map.Update()
    End
    
    Method Render:Void()
        Self.tile_map.Render()
    End

    Method RemoveForeground:MidLayer()
        Return Self.tile_map.RemoveLayer("foreground")
    End

    Method RemoveElements:ObjectGroup()
        Return ObjectGroup(Self.tile_map.RemoveLayer("elements"))
    End
End
