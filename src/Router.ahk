; Router class
class Router
{
	Window := ""
	route := ""
	
	__New(Window)
	{
		This.Window := Window
	}
	
	__Delete()
	{
		This.Window.Close()
	}

	GetRoute(Window)
	{
		return Window.wnd.GetRoute()
	}

	SetRoute(Window, path)
	{
		This.route := This.GetRoute(Window)
		if (This.route != path)
		{
			Window.Hide()
			Window.wnd.SetRoute(path)

			; Wait for redirect
			while Window.wnd.Properties.Ready != -1
				Sleep, 30
		}
	}
}
