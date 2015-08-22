Import lp2
Import src.sprites
Import src.components
Import consts


Class GamePlaySpace Extends Space

    Field player:Player
    Field world:World

    Field screen_clamp:ClampToScreen
    Field camera_control:CameraControl
    Field collision_engine:CollisionEngine
    Field tile_map_collider:TileMapCollider

    Method Create:Void()
        Self.world = New World()
        Self.AddChild(Self.world)

        Self.player = new Player()
        Self.AddChild(Self.player)

        Self.AddElements(Self.world.RemoveElements().objects)

        ''' add foreground
        Self.AddChild(Self.world.RemoveForeground())

        ''' clamp to camera
        Self.screen_clamp = New ClampToScreen(Self.player.position)
        Self.screen_clamp.camera_viewport = Game.Instance().GetCurrentCamera().ViewPort
        Self.AddChild(Self.screen_clamp)

        ''' camera control
        Self.camera_control = New CameraControl(Game.Instance.GetCurrentCamera.ViewPort)
        Self.camera_control.player = Self.player.position
        Self.AddChild(Self.camera_control)

        ''' collision engine
        Self.collision_engine = CollisionEngine.Instance()
        Self.AddChild(Self.collision_engine)

        Self.tile_map_collider = New TileMapCollider(Self.world.GetCollisionsLayer())
        Self.AddChild(Self.tile_map_collider)
    End

    Method AddElements:Void(objects:Stack<TileObject>)
        For Local o:=Eachin objects
            If (o.gid = "200")  ''' powerup

                Self.AddChild(New PowerUp(o))

            ElseIf (o.gid = ENEMY_A Or o.gid = ENEMY_B Or o.gid = ENEMY_C)  ''' enemies

                Local enemy:Enemy = New Enemy(o, o.gid)
                enemy.player_position = Self.player.position

                Self.AddChild(enemy)
            ElseIf (o.gid = ENEMY_TURRET Or o.gid = ENEMY_TURRET_INVERTED)
                Local enemy:EnemyTurret = New EnemyTurret(o, o.gid)
                enemy.player_position = Self.player.position

                Self.AddChild(enemy)
            EndIf
        Next
    End

End
