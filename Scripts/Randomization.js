namespace Randomization {
	
	// get all components starting with knob_
	const var panelKnobs = Content.getAllComponents('knob_');
	
	// get all components start with displayKnob_
	const var displayKnobs = Content.getAllComponents('displayKnob_');
	
	// holds component id's that are locked
	const var banList = ['knob_io_in'];
	
	const var button_randomization = Content.getComponent("button_randomization");
	
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
	}
	
	inline function randomizePanelKnobs() {
		randomizeKnobs(panelKnobs);
		
		randomizeButton();
	}
	
	inline function randomizeDisplayKnobs() {
		randomizeKnobs(displayKnobs);
		
		randomizeButton();
	}
	
	inline function randomizeEffects() {
		randomizeEffectsChain();
		
		randomizeButton();
	}
	
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
	
}