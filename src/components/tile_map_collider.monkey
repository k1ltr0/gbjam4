Import lp2
Import lp2.tilemap
Import collision_engine


Class TileMapCollider Extends CollisionEngine

    Field tile_layer:TileLayer
    Field view_port:Rectangle

    Method New(tile_layer:TileLayer)
        Super.New()
        CollisionEngine.Instance.RegisterDelegate(Self)

        Self.tile_layer = tile_layer
        Self.view_port = Game.Instance.GetCurrentCamera().ViewPort
    End

    Method Update:Void()
        For Local o:=Eachin Self.objects
            Local cx:= o.GetBox.CenterX
            Local cy:= o.GetBox.CenterY
            Local tx:= Floor(cx / tile_layer.parent.tileWidth)
            Local ty:= Floor(cy / tile_layer.parent.tileHeight)
            Local index:= (tx) + tile_layer.width * ty
            Local tile:= 0

            If (index < Self.tile_layer.data.Length)
                tile = Self.tile_layer.data[index]
            EndIf

            If (tile <> 0)
                o.OnCollide("wall")
            EndIf
        Next

        ''' static objects not needed
    End

End
