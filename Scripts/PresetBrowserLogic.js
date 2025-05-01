namespace PresetBrowserLogic {
	
	const var InitPreset_btn = Content.getComponent("displayButton-initPreset");
	
	InitPreset_btn.setControlCallback(onPresetInitButton);
	
	inline function onPresetInitButton(component, value) {
		
		if (value) {
			Engine.loadUserPreset('Factory/Creative/Anfang.preset');
			showMain();
		}
		
	}
	const var FloatingTile2 = Content.getComponent("FloatingTile2");
	FloatingTile2.setLocalLookAndFeel(PresetBrowserLAF.laf);
	
	const PresetBrowserLaf = Content.createLocalLookAndFeel();
	PresetBrowserLaf.registerFunction('drawToggleButton', btnLaf);
	
	inline function btnLaf(g, obj) {
		local a = obj.area;
		a = StyleHelpers.addPadding(a, 1);

		g.setFont(Fonts.mainFontRegular, 20.0);
		
		g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.2));
		g.drawRoundedRectangle(a, 3, 1);
		g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.75));
		if (obj.over) {
			g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.1));
			g.fillRoundedRectangle(a, 3);
			g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.9));
		}	
		g.drawAlignedText(obj.text.toUpperCase(), a, 'centred');
	}
	
	InitPreset_btn.setLocalLookAndFeel(PresetBrowserLaf);
}


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

	up_folder.createDirectory('Factory');

	for (f in files) {
		local name = f.toString(3);
		local isDir = f.isDirectory();
		local newLoc = up_folder.toString(0) + '/Factory/' + name;
		
		local mvFile = FileSystem.fromAbsolutePath(newLoc);
		if (isDir) {
			f.move(mvFile);
		}
	}
}



