namespace PresetBrowserLogic {
	
	const var InitPreset_btn = Content.getComponent("displayButton-initPreset");
	
	InitPreset_btn.setControlCallback(onPresetInitButton);
	
	inline function onPresetInitButton(component, value) {
		
		if (value) {
			Engine.loadUserPreset('Creative/Anfang.preset');
			showMain();
		}
		
	}
	const var FloatingTile2 = Content.getComponent("FloatingTile2");
	
	
	//FloatingTile2.setLocalLookAndFeel(presetBrowserLaf);
	
	const PresetBrowserLaf = Content.createLocalLookAndFeel();
	PresetBrowserLaf.registerFunction('drawToggleButton', btnLaf);
	
	inline function btnLaf(g, obj) {
		local a = obj.area;
		local PADDING = 1;
		
		local pa = [
			a[0] + PADDING,
			a[1] + PADDING,
			a[2] - PADDING * 2,
			a[3] - PADDING * 2,
		];
		
		obj.text = obj.text.replace('');
		
		local ICON_COLOUR = DisplayTheme.iconColour;	
		
		if (obj.over) {
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		g.setColour(ICON_COLOUR);
		
		g.drawRoundedRectangle(pa, 2, 1);
		g.setFont(Fonts.secondaryFont, 20.0);
		g.drawAlignedText(obj.text, pa, 'centred');
	}
	
	InitPreset_btn.setLocalLookAndFeel(PresetBrowserLaf);
}