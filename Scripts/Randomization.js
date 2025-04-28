namespace Randomization {
	
	// get all components starting with knob_
	const var panelKnobs = Content.getAllComponents('knob_');
	
	// get all components start with displayKnob_
	const var displayKnobs = Content.getAllComponents('displayKnob_');
	
	const var randomPanelButton = Content.getComponent("randomPanelButton");
	
	randomPanelButton.setPaintRoutine(randomPanelRoutine);
	randomPanelButton.setMouseCallback(onRandomPanel);
	
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
	

	
	// modal floating button
	const var button_floatingLock = Content.getComponent("button_floatingLock");
	button_floatingLock.setControlCallback(onbutton_floatingLockControl);
	
	inline function randomizeParameters() {
		randomizeKnobs(panelKnobs);
		randomizeKnobs(displayKnobs);
		randomizeEffectsChain();
		hideLockMenu();
	}
	
	inline function randomizePanelKnobs() {
		randomizeKnobs(panelKnobs);
		hideLockMenu();
	}
	
	inline function randomizeDisplayKnobs() {
		randomizeKnobs(displayKnobs);
		hideLockMenu();
	}
	
	inline function randomizeEffects() {
		randomizeEffectsChain();
		hideLockMenu();
	}
	
	inline function randomPanelRoutine(g) {
		
		 local a = this.getLocalBounds(0);
		 
		 local width = a[2];
		 local height = a[3];
		
		 local cellWidth = width / 3;
		 local cellHeight = height / 3;
		
		 local smallSize = Math.min(cellWidth, cellHeight) * 0.5; // 50% of the smallest dimension of the cell
		 local bigSize = Math.min(cellWidth, cellHeight) * 0.8; // 80% of the smallest dimension of the cell
		
		 
		 local COLOUR = PanelTheme.selectedIconColour;
		 
		 if (this.data.mouseDown) {
		 	COLOUR = COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
		 }
		 
		 
 		 g.setColour(COLOUR);
		 
		 for(i = 0; i < 3; i++) {
		     for(j = 0; j < 3; j++) {
		         local centerX = (j + 0.5) * cellWidth;
		         local centerY = (i + 0.5) * cellHeight;
		
		         local ellipseSize = Math.randInt(0, 2) == 0 ? smallSize : bigSize;
		
		         g.fillEllipse([
		             centerX - ellipseSize / 2, 
		             centerY - ellipseSize / 2, 
		             ellipseSize, 
		             ellipseSize
		         ]);
		     }
		 }
		
	}
	
	inline function onRandomPanel(event) {

		if (event.clicked && !event.mouseUp) {
			
			if (event.rightClick) {
				RandomizerPopup.showControl(true);
				return;
			}
		
		randomizePanelKnobs();
			
		randomPanelButton.repaint();
		randomPanelButton.repaint();
		randomPanelButton.repaint();
		randomPanelButton.changed();		
			
		}
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
	                             Content.getComponent("panel_background"),
	                             Content.getComponent("themeablePanel_panel_backdrop"),
	                             ];

	
	const var panelClickWatcher = Engine.createBroadcaster({
		"id": "panelClickEvent",
		"args": ["component", "event"]
	});
	
	panelClickWatcher.attachToComponentMouseEvents(clickablePanels, "Clicks Only", "Mouse Listener for clicks outside of modal");
	
	panelClickWatcher.addListener("RefreshFunction", "Hide randomization menu", function(component, event) {
	   	if (!event.rightClick && event.clicked && !event.mouseUp) {
			hideLockMenu();
			RandomizerPopup.showControl(false);
	     }
	   }
	);
	
	const var RandomizerPopup = Content.getComponent("RandomizerPopup");
	const var random_all = Content.getComponent("random_all");
	const var random_display = Content.getComponent("random_display");
	const var random_chain = Content.getComponent("random_chain");
	const var random_panel = Content.getComponent("random_panel");
	
	random_all.setLocalLookAndFeel(randomLAF);
	random_display.setLocalLookAndFeel(randomLAF);
	random_chain.setLocalLookAndFeel(randomLAF);
	random_panel.setLocalLookAndFeel(randomLAF);
	
	random_all.setControlCallback(onRandom_all);
	random_display.setControlCallback(onRandom_display);
	random_chain.setControlCallback(onRandom_chain);
	random_panel.setControlCallback(onRandom_panel);
	
	inline function onRandom_all(component, value) {
		
		if (!value) return;
	
		randomizeParameters();
	}
	
	inline function onRandom_display(component, value) {
		
		
		if (!value) return;
	
		randomizeDisplayKnobs();
	}
	
	inline function onRandom_chain(component, value) {
		
		
		if (!value) return;
	
		randomizeEffectsChain();
	}
	
	inline function onRandom_panel(component, value) {
		
		
		if (!value) return;
	
		randomizePanelKnobs();
	}
	
	// LOOK AND FEEL / GRAPHICS
	const var floatingLock_panel = Content.getComponent("floatingLock_panel");
	
	RandomizerPopup.setPaintRoutine(floatingPanel);
	floatingLock_panel.setPaintRoutine(floatingPanel);
	
	inline function floatingPanel(g) {
		
		// Colors
		local BORDER_COLOUR = SliderTheme.arcColour;
		local BACKGROUND_COLOUR = SliderTheme.lowerGradientColour;
		
		local PADDING = 1;
		local a = [ 0, 0, this.getWidth(), this.getHeight()];
		local paddingA = [
			PADDING,
			PADDING,
			this.getWidth() - PADDING * 2,
			this.getHeight() - PADDING * 2
		];
		g.setColour(BORDER_COLOUR);
		g.fillRoundedRectangle(a, 3);
		g.setColour(BACKGROUND_COLOUR);
		g.fillRoundedRectangle(paddingA, 2);
	};
	
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