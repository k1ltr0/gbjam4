Import lp2
Import src.components


Class EnemyBullet Extends lpImage Implements iOnCollide

    Field max_live_time:Float = 5
    Field current_live_time:Float = 0
    Field visible:Bool = True
    Field speed:Int = 25

    Field direction:Vec2

    Method New(position:Vec2, direction:Vec2)
        Super.New("bullet_level_0.png", position)

        Self.direction = direction
        CollisionEngine.Instance.AddBody(Self)
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

    Field bullets:List<EnemyBullet>
    Field discard_list:List<EnemyBullet>
    Field visible:Bool = True

    Method New()
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.bullets = New List<EnemyBullet>
        Self.discard_list = New List<EnemyBullet>
    End
    
    Method Update:Void()
        If Not(Self.visible) Then Return
        For Local b:=Eachin Self.bullets
            b.Position.X += (b.speed * Time.DeltaSecs) * b.direction.X
            b.Position.Y += (b.speed * Time.DeltaSecs) * b.direction.Y

            b.current_live_time += Time.DeltaSecs

            If (b.max_live_time <= b.current_live_time)
                b.Destroy()
                Self.discard_list.AddLast(b)
            EndIf
            
        Next


        ''' discard bullets
        For Local db:=Eachin Self.discard_list
            Self.bullets.RemoveEach( db )
        Next

        Self.discard_list.Clear()
    End
    
    Method Render:Void()
        If Not(Self.visible) Then Return
        For Local b:=Eachin Self.bullets
            If (b.visible)
                b.Render()
            EndIf
        Next
    End

    Method Shot:Void(ox:Int, oy:Int, dx:Int, dy:Int)

        Local v:= New Vec2(dx-ox, dy-oy)
        Local bullet:= New EnemyBullet(New Vec2(ox, oy), v.UnitVector())

        Self.bullets.AddLast(bullet)
    End

    Method Destroy:Void()
        Self.visible = False
        For Local b:=Eachin Self.bullets
            b.Destroy()
        Next
    End


End