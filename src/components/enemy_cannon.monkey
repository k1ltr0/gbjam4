Import lp2
Import src.components


Class EnemyBullet Extends lpImage Implements iOnCollide

    Field max_live_time:Float = 5
    Field current_live_time:Float = 0
    Field visible:Bool = True
    Field speed:Int = 25

    Field direction:Vec2

    Method New(position:Vec2, direction:Vec2)
        Super.New("bullet_enemy.png", position)

        Self.direction = direction
        CollisionEngine.Instance.AddBody(Self)
        BulletsEngine.Instance.AddBullet(Self)
    End

    Method GetBox:Rectangle()
        Return Self.Position
    End
    Method OnCollide:Void(name:String)
        If name = "wall" Or name = "player"
            Self.Destroy()
        End
    End
    Method GetName:String()
        Return "enemy_bullet"
    End

    Method Destroy:Void()
        CollisionEngine.Instance.Destroy(Self)
        Self.visible = False
    End
End


Class EnemyCannon Implements iDrawable

    Field visible:Bool = True

    Method New()
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
    End
    
    Method Update:Void()
    End
    
    Method Render:Void()
    End

    Method Shot:Void(ox:Int, oy:Int, dx:Int, dy:Int)

        Local v:= New Vec2(dx-ox, dy-oy)
        New EnemyBullet(New Vec2(ox, oy), v.UnitVector()) ''' auto add to bullets_engine

    End

    Method Destroy:Void()
        Self.visible = False
    End


End