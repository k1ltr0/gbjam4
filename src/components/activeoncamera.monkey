Import lp2
Import lp2.collision


Class ActiveOnCamera Implements iDrawable

    Field active:Bool
    Field target:Rectangle
    Field viewport:Rectangle

    Method New(target:Rectangle)
        Self.target = target

        Self.viewport = Game.Instance.GetCurrentCamera().ViewPort
    End

    ''' implementing iDrawable
    Method Create:Void()
    End
    
    Method Update:Void()
        If (Collision.AABBIntersects(Self.target, Self.viewport))
            Self.active = True
        Else
            Self.active = False
        EndIf
    End
    
    Method Render:Void()
    End

    Method IsActive:Bool()
        Return Self.active
    End

End

