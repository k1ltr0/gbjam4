Import lp2
Import enemy_cannon

Class BulletsEngine Implements iDrawable
    Global instance:BulletsEngine

    Field bullets:List<EnemyBullet>
    Field discard_list:List<EnemyBullet>

    Method New()
        BulletsEngine.instance = Self
        Self.Create()
    End

    ''' implementing iDrawable
    Method Create:Void()
        Self.bullets = New List<EnemyBullet>
        Self.discard_list = New List<EnemyBullet>
    End
    
    Method Update:Void()
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
        For Local b:=Eachin Self.bullets
            If (b.visible)
                b.Render()
            Else
                b.Destroy()
                Self.discard_list.AddLast(b)
            EndIf
        Next
    End


    Method AddBullet:void(bullet:EnemyBullet)
        Self.bullets.AddLast(bullet)
    End

    Function Instance:BulletsEngine()
        Return BulletsEngine.instance
    End
End
