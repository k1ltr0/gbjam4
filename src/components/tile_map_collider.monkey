Import lp2
Import lp2.tilemap
Import lp2.collision
Import collision_engine


Class TileMapCollider Extends CollisionEngine

    Field tile_layer:TileLayer
    Field view_port:Rectangle

    Field tile_position:Rectangle
    Field tile_grid_position:Int[] = [0,0]
    Field aux_sat:Vec2

    Method New(tile_layer:TileLayer)
        Super.New()
        CollisionEngine.Instance.RegisterDelegate(Self)

        Self.tile_layer = tile_layer
        Self.view_port = Game.Instance.GetCurrentCamera().ViewPort

        ''' aux vars
        Self.tile_position = New Rectangle()
        Self.aux_sat = New Vec2()
    End

    Method GetTileDataPosition:Rectangle(cx:Int, cy:Int)
        #Rem
        return a list with positions of a tile for a given pixel
        #End
        
        Self.tile_position.Width = Self.tile_layer.parent.tileWidth
        Self.tile_position.Height = Self.tile_layer.parent.tileHeight

        Self.tile_position.X = Floor(cx / Self.tile_position.Width) * Self.tile_layer.parent.tileWidth
        Self.tile_position.Y = Floor(cy / Self.tile_position.Height) * Self.tile_layer.parent.tileHeight

        Return Self.tile_position
    End

    Method GetTileGridPosition:Int[](cx:Int, cy:Int)
        Self.tile_grid_position[0] = Floor(cx / Self.tile_layer.parent.tileWidth)
        Self.tile_grid_position[1] = Floor(cy / Self.tile_layer.parent.tileHeight)

        Return Self.tile_grid_position
    End

    Method GetTileID(cx:Int, cy:Int)
        Local tile_position := Self.GetTileGridPosition(cx, cy)
        Local index:= (tile_position[0]) + Self.tile_layer.width * tile_position[1]

        If (index < Self.tile_layer.data.Length-1)
            Return Self.tile_layer.data[index]
        EndIf

        Return 0
    End

    Method Update:Void()
        For Local o:=Eachin Self.objects
            '' collisions for min
            For Local x:=Floor(o.GetBox.X / Self.tile_layer.parent.tileWidth) TO Floor((o.GetBox.X + o.GetBox.Width) / Self.tile_layer.parent.tileWidth)
                For Local y:=Floor(o.GetBox.Y / Self.tile_layer.parent.tileHeight) TO Floor((o.GetBox.Y + o.GetBox.Height) / Self.tile_layer.parent.tileHeight)

                    Local tile:= Self.GetTileID(Self.tile_layer.parent.tileWidth * x, 
                                                Self.tile_layer.parent.tileHeight * y)
                    If (tile <> 0)
                        o.OnCollide("wall")  ''' inform collision

                        ''' calculate collision correction
                        Local tile_position:= Self.GetTileDataPosition(
                            Self.tile_layer.parent.tileWidth * x, 
                            Self.tile_layer.parent.tileHeight * y)

                        SAT.Collide(o.GetBox, tile_position, aux_sat)

                        If ((tile = 4103 Or tile = 4102 Or tile = 4104 Or tile = 4108 ) And aux_sat.Y > 0)  '' top
                            o.GetBox.Y -= aux_sat.Y
                        End

                        If ((tile = 4105 Or tile = 4106 Or tile = 4107 Or tile = 4108 ) And aux_sat.Y < 0) ''' bottom
                            o.GetBox.Y -= aux_sat.Y
                        EndIf

                        If ((tile = 4102 Or tile = 4105 Or tile = 4109 Or tile = 4108) And aux_sat.X > 0)  ''' left
                            o.GetBox.X -= aux_sat.X
                        EndIf

                        If ((tile = 4104 Or tile = 4110 Or tile = 4111 Or tile = 4108) And aux_sat.X < 0)  ''' right
                            o.GetBox.X -= aux_sat.X
                        End
                    EndIf
                    
                Next
            Next

        Next


        ''' static objects not needed
    End

    Method Render:Void()
    End

End
