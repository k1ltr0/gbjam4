Import lp2

Interface iOnCollide
    Method GetBox:Rectangle()
    Method OnCollide:Void(name:String)
    Method GetName:String()
End


Class CollisionEngine Implements iDrawable

Private 
    Global instance:CollisionEngine

    Field objects:Stack<iOnCollide>
    Field static_objects:Stack<iOnCollide>

    Method New()
        Self.Create()
    End

Public

    ''' implementing iDrawable
    Method Create:Void()
        Self.objects = New Stack<iOnCollide>
        Self.static_objects = New Stack<iOnCollide>
    End
    
    Method Update:Void()

        ''' test collisions
        For Local o:=Eachin Self.objects
            For Local other:=Eachin Self.objects
                If (o <> other)
                    If (Collision.AABBIntersects(o.GetBox(), other.GetBox()))
                        o.OnCollide(other.GetName())
                    EndIf
                EndIf
            Next
        Next

        For Local o:=Eachin Self.objects
            For Local other:=Eachin Self.static_objects
                If (Collision.AABBIntersects(o.GetBox(), other.GetBox()))
                    o.OnCollide(other.GetName())
                    other.OnCollide(o.GetName())
                End
            Next
        Next

    End
    
    Method Render:Void()
    End

    Method AddBody:Void(body:iOnCollide)
        Self.objects.Push(body)
    End

    Method AddStaticBody(body:iOnCollide)
        Self.static_objects.Push(body)
    End

    Method Destroy:Void(element:iOnCollide)
        Self.objects.RemoveEach(element)
        Self.static_objects.RemoveEach(element)
    End

    Function Instance:CollisionEngine()
        If (CollisionEngine.instance = Null)
            CollisionEngine.instance = New CollisionEngine()
        EndIf

        Return CollisionEngine.instance
    End


End
