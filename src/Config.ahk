; Config manager
class Config
{
	__ReadFileWithSections(path)
	{
		Data := {}
		
		; Read ini sections
		IniRead, Sections, % path
		Loop, Parse, Sections, `n`r
		{
			SectionName := A_LoopField
			Data[SectionName] := {}
			
			; Read section values
			IniRead, Values, % path, % SectionName
			Loop, Parse, Values, `n`r
			{
				StringSplit, Field, A_LoopField, =
				Data[SectionName][Field1] := Field2
			}
		}
		return Data
	}

	__ReadFileWithoutSections(content, path)
	{
		Data := {}
		
		Loop, Parse, content, `n`r
		{
			StringSplit, Field, A_LoopField, =
			StringReplace, TrimedField, Field2, `",, All
			Data[Field1] := TrimedField
		}
		return Data
	}

	; Read & parse ini into object
	ReadFile(path)
	{
		FileRead, content, % path
		
		if (InStr(content, "["))
		{
			return This.__ReadFileWithSections(path)
		} 
		else 
		{
			return This.__ReadFileWithoutSections(content, path)
		}
	}
	
	; Serialize object into ini file
	SaveFile(path, data)
	{
		; TODO: Write ini files
	}
}
