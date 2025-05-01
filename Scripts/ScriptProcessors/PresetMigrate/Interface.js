Content.makeFrontInterface(600, 600);

const up_folder = FileSystem.getFolder(FileSystem.UserPresets);
const files = FileSystem.findFiles(up_folder, '*', false);

checkFactoryFolder();

inline function checkFactoryFolder() {
	local files = FileSystem.findFiles(up_folder, '*', false);
	local hasFactory = false;
	for (f in files) {
		local name = f.toString(3);
		if (name == 'Factory') {
			hasFactory = true;
			break;
		}
	}

	if (hasFactory) {
		return;
	} else {
		migratePresets();
	}
}

inline function migratePresets() {

	Console.print('make folder factory');
	up_folder.createDirectory('Factory');

	for (f in files) {
		local name = f.toString(3);
		local isDir = f.isDirectory();
		local newLoc = up_folder.toString(0) + '/Factory/' + name;
		
		local mvFile = FileSystem.fromAbsolutePath(newLoc);
		if (isDir) {

			Console.print(mvFile.toString(0));

			f.move(mvFile);
			Console.print('move file: ' + name);
		}
	}
}

function onNoteOn()
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
 