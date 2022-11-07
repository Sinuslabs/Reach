namespace Filter {
	
	
	const var panel_effectCustomizer = Content.getComponent("panel_effectCustomizer");
	const var panel_filters = Content.getComponent("panel_filters");
	const var prePostButtons = [Content.getComponent("button_filters_pre"),
	                            Content.getComponent("button_filters_post")];
	                            
	const var filterAnalysers = [Content.getComponent("panel_preFilterAnalyser"),
	                             Content.getComponent("panel_postFilterAnalyser")];
	
	
	Content.getComponent("button_filter").setControlCallback(onbutton_filterControl);
	
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
	

}

	
	
