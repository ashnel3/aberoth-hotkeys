#NoTrayIcon
#SingleInstance, Force
for process in ComObjGet("winmgmts:").ExecQuery("Select * from Win32_Process  where name = 'Autohotkey.exe' ")
	process, close, % process.ProcessId
