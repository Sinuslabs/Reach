
namespace EffectCustomizer {
	const var button_fx = Content.getComponent("button_fx")
	
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
	                            
	// Callbacks
	button_fx.setControlCallback(onbutton_fxControl);
                       
	// INIT
	inline function init() {
		radioEffectBox(effectTabs[0]);
		setEffectNamesFromSlots();		
		snapToArea();
	}
	
	init();
	
	for (tab in effectTabs) {
		tab.setPaintRoutine(tabRoutine);
	}
	                        
	const SWAP_SENSITIVITY = 80;
	
	for (tab in effectTabs) {
		tab.setDraggingBounds([0,0, 810, 50]);
		reg currentSlot;
		var wannaBeSlot;
	    tab.setMouseCallback(function(e) {	
	    	var positionX = this.getGlobalPositionX() + SWAP_SENSITIVITY;
	    	var width = this.getWidth() - SWAP_SENSITIVITY * 2;
	    	
	    	if (e.mouseUp) {
		    	snapToArea();
	    	}
	    	if (e.hover) {
		    	this.data.hover = 1;
	    	}
	    	if (e.clicked) {
 		        currentSlot = getIntersectingSlot(positionX, width);
 		        radioEffectBox(this);
 		        showPanel(this.get('text'));
	  		}
	    
	        if (e.drag) {        	
	        	wannaBeSlot = getIntersectingSlot(positionX, width);
	        	if (typeof wannaBeSlot == 'number' && typeof currentSlot == 'number') {
	        		var name = this.get('text');
	        		if (currentSlot != wannaBeSlot) {
	        			swapSlots(currentSlot, wannaBeSlot);
	        			currentSlot = wannaBeSlot;
	        			snapToArea();
	        		}
	        	}
	        }    
	    });
	}
	
	inline function showPanel(route) {
		for (display in effectDisplays) {
			local displayRoute = display.get('text').replace('effectDisplay-');
			if (displayRoute == route) {
				display.set('visible', true);
				continue;
			} 
			display.set('visible', false);
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
	
	const TAB_PADDING = 5;
	const TEXT_PADDING = 10;
	const DOT_PADDING = 8;
	// size for all 6 dots not individual one
	const DOTS_WIDTH = 10;
	const DOTS_HEIGHT = 18;	
	inline function tabRoutine(g) {
		local a = [
			0 + TAB_PADDING,
			0 + TAB_PADDING,
			this.getWidth() - TAB_PADDING * 2,
			this.getHeight()  - TAB_PADDING * 2
		];
		
		local value = this.getValue();		
		local SELECTED_TAB_COLOUR = DisplayTheme.selectedTabColour;
		local TAB_COLOUR = DisplayTheme.tabColour;
		local SELECTED_TAB_TEXT_COLOUR = DisplayTheme.selectedTabTextColour;
		local TAB_TEXT_COLOUR = DisplayTheme.tabTextColour;
		g.setColour(TAB_COLOUR);
		if (value) {
			g.setColour(SELECTED_TAB_COLOUR);
		}
		g.fillRoundedRectangle(a, 5);
		value ? g.setColour(SELECTED_TAB_TEXT_COLOUR) : g.setColour(TAB_TEXT_COLOUR);
		
		local textArea = [
			a[0] + TEXT_PADDING,
			a[1],
			a[2],
			a[3],
		];
		g.setFont(Fonts.secondaryFont, 30.0);	
		g.drawAlignedText(this.get('text'), textArea, 'left');
		
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
		}
	}
	
	/** Returns the ID of the effect in the given slot. */
	inline function getIdFromSlot(slot)
	{
	    local fx = slot.getCurrentEffect();
	    
	    if(isDefined(fx))
	        return fx.getAttributeId(0);
	        
	    return undefined;
	}
	
	
	inline function onbutton_fxControl(component, value) {
		if (value) {
			displayShow('effects');
			
			// reset filter panels
			Filter.panel_filters.set('visible', false);
			Filter.panel_effectCustomizer.set('visible', true);			
			Filter.prePostButtons[0].set('visible', false);
			Filter.prePostButtons[1].set('visible', false);
			Filter.button_filter.setValue(0);
			
			Globals.effectsOpen = true;
			for (tab in effectTabs) {
				if (tab.getValue() == 1) {
					radioEffectBox(tab);
				}
			}
						
		} else {
			showMain();	
		}
	};
	
	
	const var displayKnobLaf = Content.createLocalLookAndFeel();	
	displayKnobLaf.registerFunction("drawRotarySlider", function(g, obj){
		
		// Padding
		var PADDING = 10;
		// Colours
		var ARC_COLOUR = DisplayTheme.textColour;
		var INDICATOR_COLOUR = DisplayTheme.textColour;
		var BORDER_COLOUR = DisplayTheme.textColour;
		var text = obj.text;
		var decimalPosition = 1;
		
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
				text = Engine.doubleToString(obj.value / 1000, 2) + ' s';
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
	
		
		g.drawEllipse(ka, 5);
		
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
		
		g.setFont(Fonts.secondaryFont, 22);
		g.drawAlignedText(text, [ka[0], ka[1] + ka[3] * 0.9, ka[2], ka[3]], 'centred');
		
		g.rotate(end, [a[2] / 2 , a[2] / 2 ]);
		g.setColour(INDICATOR_COLOUR);
		
		g.fillRoundedRectangle([
			a[2] / 2 - INDICATOR_THICKNESS / 2,
			PADDING + INDICATOR_GAP,
			(a[2] / 100) * INDICATOR_THICKNESS,
		 	(a[2] / 100) * INDICATOR_LENGTH],
		 	0.5
		);
		
	});

	for (knob in displayKnobs) {
		knob.setLocalLookAndFeel(displayKnobLaf);
	}
	
}

