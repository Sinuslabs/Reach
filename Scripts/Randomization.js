namespace Randomization {
	
	// get all components starting with knob_
	const var panelKnobs = Content.getAllComponents('knob_');
	
	// get all components start with displayKnob_
	const var displayKnobs = Content.getAllComponents('displayKnob_');
	
	// build meta array
	const var allKnobsAndTabs = [];
	allKnobsAndTabs.concat(panelKnobs);
	allKnobsAndTabs.concat(displayKnobs);
	allKnobsAndTabs.concat(EffectCustomizer.effectTabs);
	
	// holds component id's that are locked
	const var banList = [
		'knob_io_in',
		'displayKnob_distort_highpass',
		'displayKnob_distort_lowPass',
		'displayKnob_distort_posthighcut',
		'displayKnob_distort_postlowcut',
		'displayKnob_degrade_highcut',
		'displayKnob_degrade_lowcut',
		'displayKnob_reverb_lowcrossover',
		'displayKnob_reverb_highcrossover',
		'displayKnob_reverb_midgain',
		'displayKnob_reverb_lowGain',
		'displayKnob_reverb_hfgain'
	];
	
	const var button_randomization = Content.getComponent("button_randomization");
	
	// modal floating button
	const var button_floatingLock = Content.getComponent("button_floatingLock");
	button_floatingLock.setControlCallback(onbutton_floatingLockControl);
	
	Content.getComponent("button_randomization").setControlCallback(onbutton_randomizationControl);
	
	inline function onbutton_randomizationControl(component, value) {
		if (!value) return;	
		randomizeParameters();
	};
	
	inline function randomizeParameters() {
		randomizeKnobs(panelKnobs);
		randomizeKnobs(displayKnobs);
		randomizeEffectsChain();
		randomizeButton();
		hideLockMenu();
	}
	
	inline function randomizePanelKnobs() {
		randomizeKnobs(panelKnobs);
		randomizeButton();
		hideLockMenu();
	}
	
	inline function randomizeDisplayKnobs() {
		randomizeKnobs(displayKnobs);
		randomizeButton();
		hideLockMenu();
	}
	
	inline function randomizeEffects() {
		randomizeEffectsChain();
		randomizeButton();
		hideLockMenu();
	}
	
	// randomize the graphics of the randomize button
	inline function randomizeButton() {
		local randomIconIndex = getRandomInt(7);
		local prevIndex = getPrevIndex(button_randomization.get('text'));
		
		// regenerate when idx is the same as before
		if (prevIndex == randomIconIndex) randomIconIndex = getRandomInt(7);
		
		if (randomIconIndex == 0) randomIconIndex = 1;
		
		button_randomization.set('text', 'icon-random' + randomIconIndex);
	}
	
	inline function getRandomInt(upperBound) {
  		return parseInt(Math.floor(Math.random() * upperBound));
	}
	
	inline function getPrevIndex(text) {
  		return parseInt(text.replace('icon-random', ''));
	}
	
	inline function randomizeKnobs(knobs) {
		for (knob in knobs) {
			if (banList.contains(knob.getId())) continue;
			local randomValue = Math.random();
			knob.setValueNormalized(randomValue);
			knob.changed();
		}
	}
	
	inline function randomizeEffectsChain() {
		local newOrder = shuffleArray([0, 1, 2, 3, 4]);
		for (i=0; i<newOrder.length; i++) {
			if ( i == newOrder.length - 1) break;
			EffectCustomizer.swapSlots(newOrder[i], newOrder[i + 1]);
		}
		EffectCustomizer.init();
	}
	
	inline function shuffleArray(array)  {
		local shuffledNumbers = [];
		while (array.length > 0) {
			local randomIndex = getRandomInt(array.length);
			
			// get value from array
			local randomValue = array[randomIndex];
			array.removeElement(randomIndex);
			
			shuffledNumbers.push(randomValue);
		}
		return shuffledNumbers;
	}
	
	// Floating Panel
	
	inline function onbutton_floatingLockControl(component, value) {
		if (value) {
			component.set('text', 'UNLOCK');
			banList.push(currentSelectedComponentId);
		} else {
			component.set('text', 'LOCK');
			banList.remove(currentSelectedComponentId);
		}
	};
	
	const var knobRightClickWatcher = Engine.createBroadcaster({
		"id": "knobsOnRightClick",
		"args": ["component", "event"]
	});
	
	
	knobRightClickWatcher.attachToComponentMouseEvents(allKnobsAndTabs, "Clicks Only", "Mouse Listener for knob click");
	
	var currentSelectedComponentId = '';
	    
    knobRightClickWatcher.addListener("RefreshFunction", "Show randomization menu", function(component, event) {
       	if (event.rightClick && !event.mouseUp) {
	       		var x = component.getGlobalPositionX();
       			var y = component.getGlobalPositionY();
       			
     			if (currentSelectedComponentId == component.getId()
					|| currentSelectedComponentId == '') {
					toggleLockMenu();	     			
     			}
      			currentSelectedComponentId = component.getId();
      			// check if current selected item is in banlist and set button state     			
				if (banList.contains(currentSelectedComponentId)) {
					button_floatingLock.setValue(true);
				} else {
					button_floatingLock.setValue(false);
				}
				button_floatingLock.changed();
				
				setLockMenuPosition(x, y);
         }
       }
    );
    
    inline function setLockMenuPosition(x, y) {
	    floatingLock_panel.set('x', x);
	    floatingLock_panel.set('y', y);
    }
	
	inline function showLockMenu() {
		floatingLock_panel.set('visible', true);
	}
	
	inline function hideLockMenu() {
		currentSelectedComponentId = '';
		floatingLock_panel.set('visible', false);
	}
	
	inline function toggleLockMenu() {
		local visible = isLockMenuVisible();
		floatingLock_panel.set('visible', !visible);
	}
	
	inline function isLockMenuVisible() {
		return floatingLock_panel.get('visible');
	}
	
	// Click listener for modal closing
	const var clickablePanels = [Content.getComponent("themeablePanel_reverb"),
	                             Content.getComponent("themeablePanel_cleanup"),
	                             Content.getComponent("themeablePanel_modulation"),
	                             Content.getComponent("themeablePanel_io"),
	                             Content.getComponent("themeablePanel_effects"),
	                             Content.getComponent("panelDisplay_display"),
	                             Content.getComponent("panel_backdrop"),
	                             Content.getComponent("panel_background"),
	                             ];

	
	const var panelClickWatcher = Engine.createBroadcaster({
		"id": "panelClickEvent",
		"args": ["component", "event"]
	});
	
	panelClickWatcher.attachToComponentMouseEvents(clickablePanels, "Clicks Only", "Mouse Listener for clicks outside of modal");
	
	panelClickWatcher.addListener("RefreshFunction", "Hide randomization menu", function(component, event) {
	   	if (!event.rightClick && event.clicked && !event.mouseUp) {
			
			hideLockMenu();
	     }
	   }
	);
	
	// LOOK AND FEEL / GRAPHICS
	const var floatingLock_panel = Content.getComponent("floatingLock_panel");
	floatingLock_panel.setPaintRoutine(function(g) {
		
		// Colors
		var BORDER_COLOUR = SliderTheme.arcColour;
		var BACKGROUND_COLOUR = SliderTheme.lowerGradientColour;
		
		var PADDING = 1;
		var a = [ 0, 0, this.getWidth(), this.getHeight()];
		var paddingA = [
			PADDING,
			PADDING,
			this.getWidth() - PADDING * 2,
			this.getHeight() - PADDING * 2
		];
		g.setColour(BORDER_COLOUR);
		g.fillRoundedRectangle(a, 3);
		g.setColour(BACKGROUND_COLOUR);
		g.fillRoundedRectangle(paddingA, 2);
	});
	
	const var floatButtonLAF = Content.createLocalLookAndFeel();
	floatButtonLAF.registerFunction('drawToggleButton', floatButtonGraphics);
	
	inline function floatButtonGraphics(g, obj) {
		
		local ICON_SIZE = 15;
		
		local a = obj.area; 
		local textArea = [
			this.getHeight / 2 + 20,
			this.getWidth / 2 + 3,
			100,
			15
		];
		local text = obj.text;
		local icon;
		
		local iconArea = [this.getHeight / 2 + 5, this.getWidth / 2 + 2, ICON_SIZE - 5, ICON_SIZE];
		local SELECTED_ICON_COLOUR = PanelTheme.selectedIconColour;
		
		if (obj.over == 1) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
		}
		
		obj.value ? text = 'UNLOCK' : text = 'LOCK';
		
		text == 'LOCK' ? icon = 'lockOpen' : icon = 'lockClosed';
		
		g.setColour(SELECTED_ICON_COLOUR);
		g.fillPath(Paths.icons[icon], iconArea);
		
		g.setFont(Fonts.secondaryFont, 14);
		g.drawAlignedText(text + ' KNOB', textArea, 'left');
	}
	button_floatingLock.setLocalLookAndFeel(floatButtonLAF);
	
}