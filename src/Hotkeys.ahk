; View Hotkeys ---

ViewAbout()
{
	global App
	Show(App.Window, "/about", "Center")
}

ViewHome()
{
	global App
	Show(App.Window, "/", "Center")
}

ViewSettings()
{
	global App
	Show(App.Window, "/settings", "Center")
}

ViewHide()
{
	global App
	Hide(App.Window)
}

; Script functions hotkeys ---

ReloadScript()
{
	global App
	App.__Delete()
	Reload
}

Quit(code=0)
{
	global App
	App.__Delete()
	ExitApp, code
}

; Hotkeys manager
class Hotkeys
{
	Bindings := {}
	
	; Bind key to function
	Bind(key, fun, args*)
	{
		This.Bindings[key] := {}
		This.Bindings[key].fun := fun
		This.Bindings[key].key := key
		This.Bindings[key].args := args
		Hotkey, % key, Handle
	}
	
	; Unbind key
	UnBind()
	{
		; TODO: Unbind hotkeys
	}
}