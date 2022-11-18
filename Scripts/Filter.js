namespace Filter {
	
	Engine.addModuleStateToUserPreset('preFilter');
	Engine.addModuleStateToUserPreset('postFilter');

	
	const var preFilter = Content.getComponent("preFilter");
	const var postFilter = Content.getComponent("postFilter");
	
	const var panel_effectCustomizer = Content.getComponent("panel_effectCustomizer");
	const var panel_filters = Content.getComponent("panel_filters");
	const var prePostButtons = [Content.getComponent("button_filters_pre"),
	                            Content.getComponent("button_filters_post")];
	                            
	const var filterAnalysers = [Content.getComponent("panel_preFilterAnalyser"),
	                             Content.getComponent("panel_postFilterAnalyser")];
	
	
	const var button_filter = Content.getComponent("button_filter");
	
	button_filter.setControlCallback(onbutton_filterControl);
	prePostButtons[0].setControlCallback(onPreButton);
	prePostButtons[1].setControlCallback(onPostButton);
	
	inline function onPreButton(component, value) {
		radioPrePost(0);
		show(0);
	}
	
	inline function onPostButton(component, value) {
		radioPrePost(1);
		show(1);
	}
	
	inline function show(index) {
		for (filterPanels in filterAnalysers) {
			filterPanels.set('visible', false);
		}
		filterAnalysers[index].set('visible', true);
	}

	// sets the provided button index value to 1 all other to 0
	inline function radioPrePost(index) {
		for (btn in prePostButtons) {
			btn.setValue(0);
		}
		prePostButtons[index].setValue(1);
	}	

	inline function onbutton_filterControl(component, value)
	{
		if (value) {
			panel_filters.set('visible', true);
			panel_effectCustomizer.set('visible', false);
			prePostButtons[0].set('visible', true);
			prePostButtons[1].set('visible', true);
		} else {
			panel_filters.set('visible', false);
			panel_effectCustomizer.set('visible', true);			
			prePostButtons[0].set('visible', false);
			prePostButtons[1].set('visible', false);
		}
	};
	
	
	const var preFilterLaf = Content.createLocalLookAndFeel();

	
	Filter.preFilterLaf.registerFunction("drawFilterDragHandle", function(g, obj) {	
		var SIZE = 20;
		var area = [obj.handle[0], obj.handle[1], SIZE, SIZE];
		
		g.setColour(0XFFFFFFFF);
		g.fillEllipse(area);
		
		g.setColour(0XFF000000);
		g.drawEllipse(area, 2);
		
		g.setFont(Fonts.secondaryFont, 17); 
		g.drawAlignedText(obj.index, area, "centred");
	});
	
	preFilterLaf.registerFunction("drawFilterPath", function(g, obj){
		var a = obj.area;
		
		g.setGradientFill([Colours.blue, 0.0, 0.0,
						   Colours.lightblue, 768.0, 280.0,
						   false]);
		g.drawPath(obj.path, obj.pathArea, 4);
		g.setOpacity(0.7);
		g.fillPath(obj.path, obj.pathArea);
	});
	
	preFilter.setLocalLookAndFeel(preFilterLaf);
	
	const var postFilterLaf = Content.createLocalLookAndFeel();
	
	
	postFilterLaf.registerFunction("drawFilterDragHandle", function(g, obj) {	
		var SIZE = 20;
		var area = [obj.handle[0], obj.handle[1], SIZE, SIZE];
		
		g.setColour(0XFFFFFFFF);
		g.fillEllipse(area);
		
		g.setColour(0XFF000000);
		g.drawEllipse(area, 2);
		
		g.setFont(Fonts.secondaryFont, 17); 
		g.drawAlignedText(obj.index, area, "centred");
	});
	
	postFilterLaf.registerFunction("drawFilterPath", function(g, obj){
		var a = obj.area;
		
		g.setGradientFill([Colours.red, 0.0, 0.0,
						   Colours.lightcoral, 768.0, 280.0,
						   false]);
		g.drawPath(obj.path, obj.pathArea, 4);
		g.setOpacity(0.7);
		g.fillPath(obj.path, obj.pathArea);
	});
	
	postFilter.setLocalLookAndFeel(postFilterLaf);

}

	
	
