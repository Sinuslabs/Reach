namespace Filter {

	Engine.addModuleStateToUserPreset('preFilter');
	Engine.addModuleStateToUserPreset('postFilter');


	const var preFilter = Content.getComponent("preFilter");
	const var postFilter = Content.getComponent("postFilter");

	const var panel_effectCustomizer = Content.getComponent("panel_effectCustomizer");
	const var prePostButtons = [Content.getComponent("button_filters_pre"),
	Content.getComponent("button_filters_post")];

	const var button_filter = Content.getComponent("button_filter");

	button_filter.setControlCallback(onbutton_filterControl);
	prePostButtons[0].setControlCallback(onPreButton);
	prePostButtons[1].setControlCallback(onPostButton);
	
	prePostButtons[0].setLocalLookAndFeel(LAF_displayButton);
	prePostButtons[1].setLocalLookAndFeel(LAF_displayButton);
	button_filter.setLocalLookAndFeel(LAF_displayButton);
	
	inline function onPreButton(component, value) {
		radioPrePost(0);
		preFilter.set('visible', true);
		postFilter.set('visible', false);
	}
	
	inline function onPostButton(component, value) {
		radioPrePost(1);
		preFilter.set('visible', false);
		postFilter.set('visible', true);
	}

	// sets the provided button index value to 1 all other to 0
	inline function radioPrePost(index) {
		for (btn in prePostButtons) {
			btn.setValue(0);
		}
		prePostButtons[index].setValue(1);
	}	

	inline function onbutton_filterControl(component, value) {
		value ? displayShow('filter') : showMain();

		if (!prePostButtons[0].getValue() && !prePostButtons[1].getValue()) {
			prePostButtons[0].setValue(1);
			prePostButtons[0].changed();
		}
	};

	inline function bypass(bypassed) {
		preFilter.set('enabled', bypassed);
		postFilter.set('enabled', bypassed);
	}

	const var preFilterLaf = Content.createLocalLookAndFeel();


	Filter.preFilterLaf.registerFunction("drawFilterDragHandle", function (g, obj) {
		var SIZE = 25;
		var a = [obj.handle[0], obj.handle[1], SIZE, SIZE];
		
		var freqArea = [
			a[0] + SIZE + 5,
			a[1],
			a[2] + 40,
			a[3],
		];
		
		if (obj.frequency >= 6000) {
			freqArea = [
				a[0] -  40 - SIZE - 5,
				a[1],
				a[2] + 40,
				a[3],
			];
		}
		
		var labelArea = [
			freqArea[0] + 5,
			freqArea[1],
			freqArea[2],
			freqArea[3],
		];

		g.setColour(0XFFFFFFFF);
		g.fillRoundedRectangle(a, 2);

		if (obj.hover) {
			g.drawRoundedRectangle(freqArea, 1, 2);
		}

		g.setColour(0XFF000000);
		g.drawRoundedRectangle(a, 2, 1);
		
		if (obj.hover) {
			g.fillRoundedRectangle(freqArea, 1);
		}

		g.setFont(Fonts.secondaryFont, 17);
		g.drawAlignedText(obj.index, a, "centred");

		if (obj.hover) {
			g.setColour(0XFFFFFFFF);
			g.drawAlignedText(Math.round(obj.frequency) + 'Hz', labelArea, 'left');
		}
	});

	preFilterLaf.registerFunction("drawFilterPath", function (g, obj) {
		var a = obj.area;

		g.setGradientFill(['0x4E65FF', 0.0, 0.0,
			'0x92EFFD', 768.0, 280.0,
			false]);
			
		if (Globals.isBypassed) {
			g.setColour(DisplayTheme.iconColour);
		}
		
		g.drawPath(obj.path, obj.pathArea, 2);
		g.setOpacity(0.9);
		g.fillPath(obj.path, obj.pathArea);
	});

	preFilter.setLocalLookAndFeel(preFilterLaf);

	const var postFilterLaf = Content.createLocalLookAndFeel();

	const freqDisplayWidth = 200;

	postFilterLaf.registerFunction("drawFilterDragHandle", function (g, obj) {
		var SIZE = 25;
		var a = [obj.handle[0], obj.handle[1], SIZE, SIZE];
		
		var freqArea = [
			a[0] + SIZE + 5,
			a[1],
			a[2] + 40,
			a[3],
		];
		
		if (obj.frequency >= 6000) {
			freqArea = [
				a[0] -  40 - SIZE - 5,
				a[1],
				a[2] + 40,
				a[3],
			];
		}
		
		var labelArea = [
			freqArea[0] + 5,
			freqArea[1],
			freqArea[2],
			freqArea[3],
		];

		g.setColour(0XFFFFFFFF);
		g.fillRoundedRectangle(a, 2);

		if (obj.hover) {
			g.drawRoundedRectangle(freqArea, 1, 2);
		}

		g.setColour(0XFF000000);
		g.drawRoundedRectangle(a, 2, 1);
		
		if (obj.hover) {
			g.fillRoundedRectangle(freqArea, 1);
		}

		g.setFont(Fonts.secondaryFont, 17);
		g.drawAlignedText(obj.index, a, "centred");

		if (obj.hover) {
			g.setColour(0XFFFFFFFF);
			g.drawAlignedText(Math.round(obj.frequency) + 'Hz', labelArea, 'left');
		}

	});

	postFilterLaf.registerFunction("drawFilterPath", function (g, obj) {
		var a = obj.area;


		g.setGradientFill(['0xDB3445', 0.0, 0.0,
			'0xFF3752', 768.0, 280.0,
			false]);
		if (Globals.isBypassed) {
			g.setColour(DisplayTheme.iconColour);
		}
		g.drawPath(obj.path, obj.pathArea, 2);
		g.setOpacity(0.9);
		g.fillPath(obj.path, obj.pathArea);
	});

	postFilter.setLocalLookAndFeel(postFilterLaf);

}



