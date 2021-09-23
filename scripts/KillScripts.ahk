; TODO: Don't open a new tray for every process killed
for process in ComObjGet("winmgmts:").ExecQuery("Select * from Win32_Process  where name = 'Autohotkey.exe' ")
	process, close, % process.ProcessId
