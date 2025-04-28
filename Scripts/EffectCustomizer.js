
namespace EffectCustomizer {
	const var button_fx = Content.getComponent("button_fx")
 	button_fx.setControlCallback(onbutton_fxControl);
 	button_fx.setLocalLookAndFeel(LAF_displayButton);
	const var displayKnobs = Content.getAllComponents('displayKnob');
	
	Engine.addModuleStateToUserPreset('Effect Slot1');
	Engine.addModuleStateToUserPreset('Effect Slot2');
	Engine.addModuleStateToUserPreset('Effect Slot3');
	Engine.addModuleStateToUserPreset('Effect Slot4');
	Engine.addModuleStateToUserPreset('Effect Slot5');
	
	const var effectSlots = [Synth.getSlotFX("Effect Slot1"),
							 Synth.getSlotFX("Effect Slot2"),
							 Synth.getSlotFX("Effect Slot3"),
							 Synth.getSlotFX("Effect Slot4"),
							 Synth.getSlotFX("Effect Slot5")];
	
	const var slotAreas = [Content.getComponent("panel_slotArea1"),
	                       Content.getComponent("panel_slotArea2"),
	                       Content.getComponent("panel_slotArea3"),
	                       Content.getComponent("panel_slotArea4"),
	                       Content.getComponent("panel_slotArea5")];
	                        
	const var effectTabs = [Content.getComponent("panel_effectTab1"),
	                        Content.getComponent("panel_effectTab2"),
	                        Content.getComponent("panel_effectTab3"),
	                        Content.getComponent("panel_effectTab4"),
	                        Content.getComponent("panel_effectTab5")];
	                        
	const var effectDisplays = [Content.getComponent("effectDisplay-Reverb"),
	                            Content.getComponent("effectDisplay-Degrade"),
	                            Content.getComponent("effectDisplay-Flanger"),
	                            Content.getComponent("effectDisplay-Distort"),
	                            Content.getComponent("effectDisplay-Chorus")];
	                            
	const var bypassButtons = [Content.getComponent("displayButton_chorus_bypass"),
	                           Content.getComponent("displayButton_distort_bypass"),
	                           Content.getComponent("displayButton_flanger_bypass"),
	                           Content.getComponent("displayButton_degrade_bypass"),
	                           Content.getComponent("displayButton_reverb_bypass")];
	                           
	const var displayPanel_fx1 = Content.getComponent("displayPanel_fx1");
	const var displayPanel_fx2 = Content.getComponent("displayPanel_fx2");
	const var displayPanel_fx3 = Content.getComponent("displayPanel_fx3");
	const var displayPanel_fx4 = Content.getComponent("displayPanel_fx4");
	const var displayPanel_fx5 = Content.getComponent("displayPanel_fx5");
	
	const var effectIndicators = [displayPanel_fx1,
	                                displayPanel_fx2,
	                                displayPanel_fx3,
	                                displayPanel_fx4,
	                                displayPanel_fx5];
   
    const var panelBypassButtons = [Content.getComponent("button_degrade_bypass"),
                                    Content.getComponent("button_flanger_bypass"),
                                    Content.getComponent("button_chorus_bypass"),
                                    Content.getComponent("button_distort_bypass")];
    
    for (btn in bypassButtons) {
	    btn.setLocalLookAndFeel(LAF_displayButton);
    }
    
	const var displayPanel_distortIndicator = Content.getComponent("displayPanel_distortIndicator");
	const var displayPanel_flangerIndicator = Content.getComponent("displayPanel_flangerIndicator");
	const var displayPanel_degradeIndicator = Content.getComponent("displayPanel_degradeIndicator");
	const var displayPanel_reverbIndicator = Content.getComponent("displayPanel_reverbIndicator");
	const var displayPanel_chorusIndicator = Content.getComponent("displayPanel_chorusIndicator");
	
	const var fxCustomizerIndicators = [displayPanel_distortIndicator,
	                                    displayPanel_flangerIndicator,
	                                    displayPanel_degradeIndicator,
	                                    displayPanel_reverbIndicator,
	                                    displayPanel_chorusIndicator];
	                                    
	// setup effect customizer tabs
	inline function init() {
		setEffectNamesFromSlots();		
		snapToArea();
		setCurrentTab();
		repaintIndicators();
	}
	init();
	
	// Shortcut listener	
	const var indicatorShortcutWatcher = Engine.createBroadcaster({
		"id": "effectKnobsOnClickStatus",
		"args": ["component", "event"]
	});
	
	indicatorShortcutWatcher.attachToComponentMouseEvents([
	"displayPanel_fx1",
	"displayPanel_fx2",
	"displayPanel_fx3",
	"displayPanel_fx4",
	"displayPanel_fx5"
	], "Clicks Only", "Mouse Listener for Effect Controls");
	indicatorShortcutWatcher.addListener("RefreshFunction", "Mute and navigate to Effect", function(component, event) {
	
		if (event.cmdDown && event.clicked) {
			
			if (Globals.isBypassed) return;
				
			switch(component.get('text')) {
				case 'Reverb':
					Reverb.displayButton_reverb_bypass.setValue(!Reverb.displayButton_reverb_bypass.getValue());
					Reverb.displayButton_reverb_bypass.changed();
					return;
				case 'Degrade':
					Effects.displayButton_degrade_bypass.setValue(!Effects.displayButton_degrade_bypass.getValue());
					Effects.displayButton_degrade_bypass.changed();
					return;
				case 'Flanger':
					Effects.displayButton_flanger_bypass.setValue(!Effects.displayButton_flanger_bypass.getValue());
					Effects.displayButton_flanger_bypass.changed();
					return;
				case 'Chorus':
					Effects.displayButton_chorus_bypass.setValue(!Effects.displayButton_chorus_bypass.getValue());
					Effects.displayButton_chorus_bypass.changed();
					return;
				case 'Distort':
					Effects.displayButton_distort_bypass.setValue(!Effects.displayButton_distort_bypass.getValue());
					Effects.displayButton_distort_bypass.changed();
					return;
				case 'default':
					return;
			}
		}
		
		if (event.clicked) {
			var text = component.get('text');
			var effectIndex = getEffectIndex(text);
			displayShow('effects');
			Globals.effectsOpen = true;
			
			radioEffectBox(effectTabs[effectIndex]);
			showPanel(text);
		}
	});
	
	// gets the current id from the the effectName
	inline function getEffectIndex(effectName) {
		for ( i=0; i<effectSlots.length; i++ ) {
			local slotEffect = getIdFromSlot(effectSlots[i]);
			if (slotEffect == effectName) {
				return i;
			}
		}
	}

	const SWAP_SENSITIVITY = 80;
	
	for (tab in effectTabs) {
		tab.setDraggingBounds([0,0, 486, 40]);
		reg currentSlot;
		var wannaBeSlot;
		
		// assigning Graphics Routine
		tab.setPaintRoutine(tabRoutine);
		
	    tab.setMouseCallback(function(e) {	
	    	var positionX = this.getGlobalPositionX() + SWAP_SENSITIVITY;
	    	var width = this.getWidth() - SWAP_SENSITIVITY * 2;
	    	
	    	if (e.mouseUp) {
		    	snapToArea();
	    	}
	    	if (e.hover) {
		    	this.data.hover = 1;
	    	}

	  		
	  		if (e.cmdDown && e.clicked) {		
	  			switch(this.get('text')) {
	  				case 'Reverb':
	  					Reverb.displayButton_reverb_bypass.setValue(!Reverb.displayButton_reverb_bypass.getValue());
	  					Reverb.displayButton_reverb_bypass.changed();
	  					return;
	  				case 'Degrade':
	  					Effects.displayButton_degrade_bypass.setValue(!Effects.displayButton_degrade_bypass.getValue());
	  					Effects.displayButton_degrade_bypass.changed();
	  					return;
	  				case 'Flanger':
	  					Effects.displayButton_flanger_bypass.setValue(!Effects.displayButton_flanger_bypass.getValue());
	  					Effects.displayButton_flanger_bypass.changed();
	  					return;
	  				case 'Chorus':
	  					Effects.displayButton_chorus_bypass.setValue(!Effects.displayButton_chorus_bypass.getValue());
	  					Effects.displayButton_chorus_bypass.changed();
	  					return;
	  				case 'Distort':
	  					Effects.displayButton_distort_bypass.setValue(!Effects.displayButton_distort_bypass.getValue());
	  					Effects.displayButton_distort_bypass.changed();
	  					return;
	  				case 'default':
	  					return;
	  			}
	  			return;
	  		}
	  		
	  		if (e.clicked) {
 		        currentSlot = getIntersectingSlot(positionX, width);
 		        radioEffectBox(this);
 		        showPanel(this.get('text'));
	  		}
	    
	        if (e.drag) {        	
	        	wannaBeSlot = getIntersectingSlot(positionX, width);
	        	if (typeof wannaBeSlot == 'number' && typeof currentSlot == 'number') {
	        		if (currentSlot != wannaBeSlot) {
	        			swapSlots(currentSlot, wannaBeSlot);
	        			currentSlot = wannaBeSlot;
	        			snapToArea();
	        		}
	        	}
	        }    
	    });
	}
	
	inline function repaintTabs() {
		for (tab in EffectCustomizer.effectTabs) {
			tab.repaint();
		}
	}
	
	inline function showPanel(route) {
		for (i=0; i < effectDisplays.length; i++) {
			local displayRoute = effectDisplays[i].get('text').replace('effectDisplay-');
			local bypassButton = bypassButtons[i].getId().replace('displayButton_');
			bypassButton = bypassButton.replace('_bypass');
			if (bypassButton == route.toLowerCase()) {
				bypassButtons[i].set('visible', true);
			} else {
				bypassButtons[i].set('visible', false);
			}
			if (displayRoute == route) {
				effectDisplays[i].set('visible', true);
				continue;
			}
			effectDisplays[i].set('visible', false);
		}
	}	
	
	// sets the provided panel value to 1 all other to 0
	inline function radioEffectBox(enabledEffect) {
		for (tab in effectTabs) {
			tab.setValue(0);
			tab.repaint();
		}
		enabledEffect.setValue(1);
		enabledEffect.repaint();
	}
	
	// returns the id of the slot the currentPanel completely intersects with
	function getIntersectingSlot(panelX, panelWidth) {
	
		var panelLowerBound = panelX;
		var panelUpperBound = panelX + panelWidth;
		
		for (var i = 0; i < slotAreas.length ; i++) {
			// get lower and upper bounds for each slot
			var lowerBound = slotAreas[i].getGlobalPositionX() - 1;
			var upperBound = slotAreas[i].getGlobalPositionX() + slotAreas[i].getWidth() + 1;
			if (panelLowerBound > lowerBound && panelUpperBound < upperBound) {
				return i;
			}
		}
	}
	
	/** Snaps to the center of the slot **/
	inline function snapToArea() {
		for ( i=0; i < effectTabs.length; i++ ) {
			local effectAreaWidth = effectTabs[i].getWidth();
			local slotHalfX = slotAreas[i].getWidth() / 2 + slotAreas[i].get('x');
			effectTabs[i].set('x', slotHalfX - effectAreaWidth / 2);
		}
	}
	
	// swaps the effect slots and the effectTabs
	inline function swapSlots(slot1, slot2) {
		local effect1 = effectTabs[slot1];
		local effect2 = effectTabs[slot2];
		
		effectTabs[slot1] = effect2;
		effectTabs[slot2] = effect1;
	
		effectSlots[slot1].swap(effectSlots[slot2]);
	}
	
	
	//  -- GRAPHICS --
	
	const TAB_PADDING = 3;
	const TEXT_PADDING = 6;
	const DOT_PADDING = 5;
	// size for all 6 dots not individual one
	const DOTS_WIDTH = 6;
	const DOTS_HEIGHT = 11;	
	inline function tabRoutine(g) {
		local a = [
			0 + TAB_PADDING,
			0 + TAB_PADDING,
			this.getWidth() - TAB_PADDING * 2,
			this.getHeight()  - TAB_PADDING * 2
		];
		
		local textArea = [
			a[0] + TEXT_PADDING,
			a[1],
			a[2],
			a[3],
		];
		
		local text = this.get('text');
		local bypassed = getEffectBypass(text);
		
		local value = this.getValue();		
		local SELECTED_TAB_COLOUR = getEffectColour(text);
		local SELECTED_TAB_TEXT_COLOUR = DisplayTheme.selectedTabTextColour;
		local TAB_TEXT_COLOUR = DisplayTheme.tabTextColour;
		local TAB_COLOUR = DisplayTheme.tabColour;
		
		value ? g.setColour(SELECTED_TAB_COLOUR) : g.setColour(TAB_COLOUR);
		
		if (!value) {
			if (bypassed) g.setColour('0x7f7f7f');			
		}
		
		g.fillRoundedRectangle(a, 2);
		value || bypassed ? g.setColour(SELECTED_TAB_TEXT_COLOUR) : g.setColour(TAB_TEXT_COLOUR);
		
		if (value && text == 'Reverb') {
			g.setColour(Colours.white);
		}
		
		g.setFont(Fonts.secondaryFont, 18.0);	
		g.drawAlignedText(text.toUpperCase(), textArea, 'left');
		
		local dragDotArea = [
			a[2] - DOT_PADDING * 3,
			a[3] / 2 - DOTS_HEIGHT / 4,
			DOTS_WIDTH,
			DOTS_HEIGHT
		];
		g.fillPath(Paths.icons['dots'], dragDotArea);
	}
	
	// gets the name from the first parameter and displays it as effect name
	inline function setEffectNamesFromSlots() {
		for ( i=0; i<effectSlots.length; i++ ) {
			reg effectName = getIdFromSlot(effectSlots[i]);
			effectTabs[i].set('text', effectName);
			effectIndicators[i].set('text', effectName);
		}
	}
	
	/** Returns the ID of the effect in the given slot. */
	inline function getIdFromSlot(slot)
	{
	    local fx = slot.getCurrentEffect();
	    
	    if(isDefined(fx)) {
		    if (fx.getAttributeId(0) === 'Damping') {
   	  		    return 'Reverb';
		    }
	    
	        return fx.getAttributeId(0);
  	    }
	}
	
	// Main Screen
	inline function showTabOnInit() {
		radioEffectBox(currenTab);
	}
	
	
	inline function onbutton_fxControl(component, value) {
		if (value) {
			displayShow('effects');
			Globals.effectsOpen = true;
			setCurrentTab();
		} else {
			showMain();	
		}
	};
	
	
	
	inline function setCurrentTab() {
		for (tab in effectTabs) {
			if (tab.getValue() == 1) {
				local text = tab.get('text');						
				local effectIndex = getEffectIndex(text);
				radioEffectBox(effectTabs[effectIndex]);
				showPanel(text);
				return;
			}
		}
		local effectIndex = getEffectIndex('Reverb');
		radioEffectBox(effectTabs[effectIndex]);
		showPanel('Reverb');
	}
	
	for (indicator in fxCustomizerIndicators) {
		indicator.setPaintRoutine(customizerIndicatorRoutine);
	}
	
	inline function customizerIndicatorRoutine(g) {
		
		local enabled = this.get('enabled');
		local text = this.get('text');
		
		local a = [
			0,
			0,
			this.getWidth(),
			this.getHeight()
		];
		
		g.setColour(getEffectColour(text));
		
		if (!enabled) g.setColour('0x7f7f7f');
		
		g.fillRoundedRectangle(a, 2);
	}
	
	for (indicator in effectIndicators) {
		indicator.setPaintRoutine(indicatorRoutine);
	}
	
	inline function repaintIndicators() {
		for (indicator in effectIndicators) {
			setEffectNamesFromSlots();
			indicator.repaint();
		}
	}
	
	// PAINT ROUTINE
	inline function indicatorRoutine(g) {
		
		local GAP = 5;
		
		local upperA = [0, 0, this.getWidth(), this.getHeight() / 2];
		local lowerA = [0, this.getHeight()/2 + GAP, this.getWidth(), this.getHeight() / 2 - GAP];
		local text = this.get('text');
		local value = getEffectValue(text);
		local bypassed = getEffectBypass(text);
	
		
		local statusBarArea = [lowerA[0], lowerA[1], lowerA[2] * value, lowerA[3]];
		
		g.setColour(getEffectColour(text));
		
		if (bypassed) g.setColour('0x0x7f7f7f');
		
		g.drawRect(lowerA, 2);
		
		g.fillRect(statusBarArea);
		
		g.setFont(Fonts.secondaryFont, 14);
		g.drawAlignedText(text.toUpperCase(), upperA, 'left');
	}
	
	var fxColours = {
		'Reverb':'0x1E7DFF',
		'Degrade':'0xF4F4F4',
		'Flanger':'0x60ABE5',
		'Chorus':'0x7AE7C7',
		'Distort':'0xEB3B4B',
		'Reverb MIX':'0x1E7DFF',
		'IO MIX':'0xD22B2B'
		
	};
	
	inline function getEffectColour(effectName) {
		local c = fxColours[effectName];
		if (isDefined(c)) {
			
			return c;
		} else {
			return undefined;
		}
	
	}
	
	inline function getEffectBypass(effectName) {
		switch(effectName) {
			case 'Reverb':
				return Reverb.JPVerb.isBypassed();
			case 'Degrade': 
				return Effects.Degrade.isBypassed();
			case 'Flanger':
				return Effects.Flanger.isBypassed();
			case 'Chorus':
				return Effects.Chorus.isBypassed();
			case 'Distort':
				return Effects.Distortion.isBypassed();
			default:
				return 0
				break;		
		}
	}
	
	inline function getEffectValue(effectName) {
		switch(effectName) {
			case 'Reverb':
				return Reverb.knob_reverb_mix.getValue();
			case 'Degrade': 
				return Effects.knob_effects_degrade.getValue();
			case 'Flanger':
				return Effects.knob_effects_flair.getValue();
			case 'Chorus':
				return Effects.knob_effects_chorus.getValue();
			case 'Distort':
				return Effects.knob_effects_distortion.getValue();
			default:
				return 0
				break;		
		}
	
	}
	
	
	const var displayKnobLaf = Content.createLocalLookAndFeel();	
	displayKnobLaf.registerFunction("drawRotarySlider", function(g, obj){
		
		// Padding
		var PADDING = 6;
		// Colours
		var ARC_COLOUR = DisplayTheme.textColour;
		var INDICATOR_COLOUR = DisplayTheme.textColour;
		var BORDER_COLOUR = DisplayTheme.textColour;
		var text = obj.text;
		
		// Make transparent on disabled
		var disabled = !obj.enabled;
		if (disabled) {
			ARC_COLOUR = ARC_COLOUR.replace('0x', '0x66');
			INDICATOR_COLOUR = INDICATOR_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
			BORDER_COLOUR = BORDER_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		}
		if (obj.clicked || obj.hover) {
			
			text = obj.valueAsText;		
			if (obj.suffix == ' ms') {
				reg label;
				if (obj.value <= 1.0) {
					label = ' ms';
					obj.value *= 100;
					obj.value = Engine.doubleToString(obj.value * 10, 0);
				} else {
					label = ' s';
					obj.value = Engine.doubleToString(obj.value, 2);
				}		
				text = obj.value + label;
			}
		}
		
		var a = obj.area;
		var ka = [
			PADDING,
			PADDING,
			a[2] - PADDING * 2,
			a[2] - PADDING * 2
		];
	
		g.setColour(BORDER_COLOUR);
		g.drawEllipse(ka, 3);
		
		var arcPath = Content.createPath();
		
		var start = 2.5;
		var end = start * 2 * obj.valueNormalized - start;
		
		var arcThickness = ARC_THICKNESS / 100;
		var arcWidth = (1.0 - 2.0 * arcThickness) + arcThickness;
		var stableSize = a[2];
		
		arcPath.addArc(
			[arcThickness / 2, arcThickness / 2,arcWidth , arcWidth],
			-start,
			end
		 );
		
		var pathArea = arcPath.getBounds(a[2]);
		pathArea = [
			pathArea[0] ,
			pathArea[1] ,
			pathArea[2],
			pathArea[3]
		];
		
		g.setColour(ARC_COLOUR);	
		g.drawPath(arcPath, pathArea, stableSize * arcThickness );
		
		g.setFont(Fonts.secondaryFont, 18);
		g.drawAlignedText(text, [a[0], ka[1] + ka[3] * 0.9, a[2], ka[3]], 'centred');
		
		g.rotate(end, [a[2] / 2 , a[2] / 2 ]);
		g.setColour(INDICATOR_COLOUR);
		
		g.fillRoundedRectangle([
			a[2] / 2 - INDICATOR_THICKNESS / 2,
			PADDING + 0,
			(a[2] / 100) * INDICATOR_THICKNESS,
		 	(a[2] / 100) * 30],
		 	0.5
		);
		
	});

	for (knob in displayKnobs) {
		knob.setLocalLookAndFeel(displayKnobLaf);
	}
	
	const var bypassButtonLAF = Content.createLocalLookAndFeel();	
	bypassButtonLAF.registerFunction("drawToggleButton", circleButtonLAF);
	
	inline function circleButtonLAF(g, obj) {
		local PADDING = 2;

		local BUTTON_COLOUR = SliderTheme.indicatorColour;

		local a = obj.area;
		local pa = [
			a[0] + PADDING,
			a[1] + PADDING,
			a[2] - PADDING * 2,
			a[3] - PADDING * 2
		];

		g.setColour(BUTTON_COLOUR);		
		obj.value ? g.fillEllipse(pa) : g.drawEllipse(pa, 1);
	}
	
	for (button in panelBypassButtons) {
		button.setLocalLookAndFeel(bypassButtonLAF);
	}
	
}

