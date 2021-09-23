#Include lib\Neutron.ahk\Neutron.ahk
#Include lib\Yunit\Stdout.ahk
#Include Router.ahk
#Include Config.ahk
#Include Hotkeys.ahk
#Include FileInstall.ahk

; Main app class
class AberothHotkeys
{
	Window := new NeutronWindow()
	Config := new Config()
	Router := new Router(This.Window)
	Hotkeys := new Hotkeys()
	
	; Configuration
	Bindings := This.Config.ReadFile(".\config\bindings.ini")
	Options := This.Config.ReadFile(".\config\options.ini")
	Meta := This.Config.ReadFile(".\meta.ini")
	
	__New()
	{
		This.__SetupTray()
		This.__AddDynamicMeta()
	}
	
	__Delete()
	{
		This.Config.Save(".\config\options.ini", This.Options)
	}
		
	__SetupTray()
	{
		Menu, Tray, NoStandard
		Menu, Tray, Icon, favicon.ico
		Menu, Tray, Add, About, ViewAbout
		Menu, Tray, Add, Home, ViewHome
		Menu, Tray, Add, Settings, ViewSettings
		Menu, Tray, Add
		Menu, Tray, Add, Reload, ReloadScript
		Menu, Tray, Add, Quit, Quit
	}
		
	__AddDynamicMeta()
	{
		RegRead, IEVersion, HKLM, Software\Microsoft\Internet Explorer, Version
		
		This.Meta["ahk_version"] := A_AhkVersion
		This.Meta["os_version"] := A_OSVersion
		This.Meta["neutron_version"] := This.Window.VERSION
		This.Meta["ie_version"] := IEVersion
	}
	
	; Application entry-point
	Run()
	{
		This.Window.Load("index.html")
		This.Hotkeys.Bind("~f1", "ViewAbout")
		This.Hotkeys.Bind("~f2", "ViewSettings")
		This.Hotkeys.Bind("~f3", "ViewHome")
		
		; Static hotkeys
		This.Hotkeys.Bind("^q", "Quit", 0)
		This.Hotkeys.Bind("~esc", "ViewHide")
	}
}

; Run application
global App := new AberothHotkeys()
App.Run()

; Hotkeys handler
Handle:
	App.Hotkeys.Bindings[A_ThisHotkey].fun(App.Hotkeys.Bindings[A_ThisHotkey].args*)
return

#Include MappedFunctions.ahk