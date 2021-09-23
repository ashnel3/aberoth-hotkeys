; Functions mapped into the window.ahk object

GetOption(Window, section, value)
{
	global App
	return App.Options[section][value]
}

SetOption(Window, section, value, data)
{
	global App
	App.Options[section][value] := data
}

GetMeta(Window, value)
{
	global App
	return App.Meta[value]
}

Hide(Window)
{
	Window.wnd.Hidden()
	Window.Hide()
}

OpenURL(Window, url, hide = 0)
{
	Run, % url
	if (hide == -1)
		Hide(Window)
}

Gui(Window, styles)
{
	Window.Gui(styles)
}

Show(Window, route, styles)
{
	if (Window.wnd.GetRoute() != route)
	{
		Window.Hide()
		Window.wnd.SetRoute(route)

		; Wait for redirect
		while Window.wnd.Properties.Ready != -1
			Sleep, 30
	}
	
	Dimensions := Window.wnd.Properties.Dimensions
	Window.Show("w" Dimensions.w " h" Dimensions.h styles)
}

Minimize(Window)
{
	Window.Minimize()
}

Maximize(Window)
{
	Window.Maximize()
}
