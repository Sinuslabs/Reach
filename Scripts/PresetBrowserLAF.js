namespace PresetBrowserLAF {
    
    laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
    {
    });
    
    
    //load directory images
	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Synth_dark.png", "Synth_dark");
	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Drums_dark.png", "Drums_dark");
	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Vocals_dark.png", "Vocals_dark");
	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/User_dark.png", "User_dark");
    laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Creative_dark.png", "Creative_dark");   
      
    //load directory images
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Synth_dark_selected.png", "Synth_dark_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Drums_dark_selected.png", "Drums_dark_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Vocals_dark_selected.png", "Vocals_dark_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/User_dark_selected.png", "User_dark_selected");
    laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Creative_dark_selected.png", "Creative_dark_selected"); 
    
    //load directory images
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Synth_light.png", "Synth_light");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Drums_light.png", "Drums_light");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Vocals_light.png", "Vocals_light");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/User_light.png", "User_light");
    laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Creative_light.png", "Creative_light");   
      
    //load directory images
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Synth_light_selected.png", "Synth_light_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Drums_light_selected.png", "Drums_light_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Vocals_light_selected.png", "Vocals_light_selected");
   	laf.loadImage("{PROJECT_FOLDER}PresetBrowser/User_light_selected.png", "User_light_selected");
    laf.loadImage("{PROJECT_FOLDER}PresetBrowser/Creative_light_selected.png", "Creative_light_selected");   
        
    laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
    {
	   	g.setFont(Fonts.mainFontRegular, 22);
	   	var a = [obj.area[0], obj.area[1], obj.area[2], obj.area[3]];
	   	var theme = '_dark';
	   	var opposite = '_light';
	   	var isFactory = ['Creative', 'Drums', 'Synth', 'Vocals'].contains(obj.text);
	   	
	   	if (Theme.theme.name == 'Super') {
  	    	theme = '_light';
  	    	opposite = '_dark';
	   	}
		
		if (obj.columnIndex == 1) {
			if (isFactory) {
				g.drawImage(obj.text + (obj.selected ? opposite + '_selected' : theme) , a, 0, 0);	
				
			} else {
				g.drawImage('User' + (obj.selected ? opposite + '_selected' : theme) , a, 0, 0);	
	 		}
			if (obj.hover && !obj.selected) {
				g.setColour(Colours.withAlpha(DisplayTheme.buttonSelectedBackgroundColour, 0.1));
				g.fillRoundedRectangle(obj.area, 2);
				g.setColour(Colours.withAlpha(DisplayTheme.buttonSelectedBackgroundColour, 0.5));
			}
			
			
	 		g.setColour(Colours.withAlpha(DisplayTheme.buttonSelectedBackgroundColour, 0.6));		
			obj.selected && g.setColour(DisplayTheme.buttonBackgroundColour);
	 		g.drawAlignedText(obj.text, [a[0] + 15, a[1], a[2] , a[3]], "left");
		}
		else
		{
			g.setColour(Colours.withAlpha('0xD3E4EC', obj.hover ? 0.1 : 0.03));		
			if(obj.selected) {
				g.setColour(DisplayTheme.selectedPreset);
				g.fillRoundedRectangle(obj.area, 3.0);
			}

			g.setColour(Colours.withAlpha(DisplayTheme.buttonSelectedBackgroundColour, obj.hover ? 0.8 : 0.5));	
			if(obj.selected) {
				g.setColour(DisplayTheme.backgroundColour);
			}
			g.drawAlignedText(obj.text, [a[0] + 15, a[1], a[2] , a[3]], "left");
		}
	});
	
	const SCROLLBAR_PADDING = 1;
	laf.registerFunction('drawScrollbar', function(g, obj) {
		var a = obj.handle;
		var pa = [
			a[0] + SCROLLBAR_PADDING + 7,
			a[1] + SCROLLBAR_PADDING + 1,
			a[2] - SCROLLBAR_PADDING * 13,
			a[3] - SCROLLBAR_PADDING * 2,
		];
	
		g.setColour(DisplayTheme.iconColour);
		g.fillRoundedRectangle(pa, 1);
	
		if (obj.over)
		{
			g.setColour(DisplayTheme.selectedIconColour);
			g.fillRoundedRectangle(pa, 3);
		}	
	});
	
	
		
	laf.registerFunction("drawDialogButton", function(g, obj)
	{
		var a = obj.area;
		a = StyleHelpers.addPadding(a, 1);
		g.setFontWithSpacing(Fonts.mainFontRegular, 20, 0);
		
		switch (obj.text) {
			case 'Add':
				break;
			case 'Delete':
				break;
			case 'Save Preset':
				obj.text = 'Save';
				break;
		}
		g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.2));
		g.drawRoundedRectangle(a, 3, 1);
		g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.75));
		if (obj.over) {
			g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.1));
			g.fillRoundedRectangle(a, 3);
			g.setColour(Colours.withAlpha(DisplayTheme.selectedIconColour, 0.9));
		}
		
		g.drawAlignedText(obj.text.toUpperCase(), a, 'centred');
		
	});
	
	laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
	{
		
		g.setFontWithSpacing(Fonts.mainFontRegular, 22, 0);
		g.fillAll(DisplayTheme.backgroundColour);
		g.setColour(DisplayTheme.defaultText);
		g.drawAlignedText(obj.text, StyleHelpers.removeFromTop(obj.area, 50), "centred");
	});
	
	laf.registerFunction('drawPresetBrowserBackground', function(g, obj) {
		g.fillAll(DisplayTheme.backgroundColour);
	});
	
	laf.registerFunction("drawAlertWindow", function(g, obj)
	{
	    var a = [0, 0, obj.area[2], 40];
	    g.setColour(0x0CDFE8F2);
	    g.fillRect(a);
	    g.setColour(0x10DFE8F2);
	    g.drawRect(obj.area, 1.0);
		g.setFontWithSpacing(Fonts.mainFontRegular, 18, 0);
	    g.setColour(0xFFDFE8F2);
	    g.drawAlignedText(obj.title, a, "centred");
	});
}