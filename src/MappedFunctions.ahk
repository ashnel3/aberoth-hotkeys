; Functions mapped into the window.ahk object

GetOption(Window, value)
{
	global App
	return App.Options[value]
}

SetOption(Window, value, data)
{
	global App
	App.Options[value] := data
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
	global App

	Window.Hide()

	if (route != "")
	{
		App.Router.SetRoute(Window, route)
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
