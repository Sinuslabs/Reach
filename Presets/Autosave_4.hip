Processor 
Type SynthChain ID Master Chain Bypassed Gain 	      �?Balance 	        VoiceLimit 	      P@KillFadeTime 	      4@IconColour 0 packageName  BuildVersion �  EditorStates BodyShown 0 Visible 1 Solo 0 Folded 1  ChildProcessors  Processor Type MidiProcessorChain ID Midi Processor Bypassed EditorStates BodyShown 1 Visible 1 Solo 0  ChildProcessors  Processor Type ScriptProcessor ID Interface Bypassed Script 0Content.makeFrontInterface(600, 600);

const up_folder = FileSystem.getFolder(FileSystem.UserPresets);
const files = FileSystem.findFiles(up_folder, '*', false);

Console.print('Files found: ' + files.length);

inline function checkFactoryFolder() {
	local files = FileSystem.findFiles(up_folder, '*', false);
	for (f in files) {
		
		local name = f.toString(3);
		local isDir = f.isDirectory();
		
		if (name == 'Factory' && isDir) {
			Console.print('Factory folder already exists');
			return;
		} else {
			Console.print('migrate presets');		
			migratePresets();
		}
		
	}
}

inline function migratePresets() {
	for (f in files) {
		local name = f.toString(3);
		local isDir = f.isDirectory();
		local newLoc = up_folder.toString(0) + '/' + name;
		
		local mvFile = FileSystem.fromAbsolutePath(newLoc);
		
		if (isDir) {
			f.move(mvFile);
			Console.print('move file: ' + name);
		}
	}
}

checkFactoryFolder();function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
  EditorStates BodyShown 1 Visible 1 Solo 0 contentShown 1 onInitOpen 1 Folded 1  ChildProcessors   Content   UIData  ContentProperties DeviceType 	Desktop  Processor Type ModulatorChain ID GainModulation Bypassed Intensity 	      �?EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   Processor Type ModulatorChain ID PitchModulation Bypassed Intensity 	        EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   Processor Type EffectChain ID FX Bypassed EditorStates BodyShown 1 Visible 0 Solo 0  ChildProcessors   RoutingMatrix NumSourceChannels    Channel0     Send0 ����Channel1    Send1 ���� macro_controls  macro name 	Macro 1 value 	        midi_cc ���� macro name 	Macro 2 value 	        midi_cc ���� macro name 	Macro 3 value 	        midi_cc ���� macro name 	Macro 4 value 	        midi_cc ���� macro name 	Macro 5 value 	        midi_cc ���� macro name 	Macro 6 value 	        midi_cc ���� macro name 	Macro 7 value 	        midi_cc ���� macro name 	Macro 8 value 	        midi_cc ���� MidiAutomation   MPEData Enabled  