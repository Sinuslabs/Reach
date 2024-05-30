namespace VuMeter{
	
	var vuMeterTimer = Engine.createTimerObject();
	
	const locl_vu_laf = Content.createLocalLookAndFeel();
	const gain_knob_laf = Content.createLocalLookAndFeel();
	
	const var knob_gain_knb = Content.getComponent("knob_gain_knb");
	const header_vumeter_ch1 = Content.getComponent("header_vumeter_ch1");
	const header_vumeter_ch2 = Content.getComponent("header_vumeter_ch2");
	const Analyser1 = Synth.getEffect("Analyser1");
	
	header_vumeter_ch1.setLocalLookAndFeel(locl_vu_laf);
	header_vumeter_ch2.setLocalLookAndFeel(locl_vu_laf);
	
	knob_gain_knb.setLocalLookAndFeel(gain_knob_laf);
	
	var previousCh1 = 0;
	var previousCh2 = 0;
	const attackRate = 0.5; // Faster response when level increases
	const decayRate = 0.8; // Slower response when level decreases
	
	// Define decay and attack rates
	const var DECAY_RATE_Fill = 0.82; // Adjust these values as needed
	const var ATTACK_RATE_Fill = 0.2; // Adjust these values as needed
	const var DECAY_RATE_Pointer = 0.9; // Adjust these values as needed
	const var ATTACK_RATE_Pointer = 0.4; // Adjust these values as needed
	
	//Current Values
	reg cur_ch1 = 0.0;
	reg cur_ch2 = 0.0;
	
	vuMeterTimer.setTimerCallback(function() {
		
	    var ch1 = Analyser1.getCurrentLevel(0);
	    var ch2 = Analyser1.getCurrentLevel(1);
	    
	    if (Globals.isBypassed) {
	    	    	ch1 = 0;
	    	    	ch2 = 0;
	    }
	    
		// Apply different smoothing based on whether the level is rising or falling
		cur_ch1 = cur_ch1 > ch1 ?
			Math.max(ch1, cur_ch1 * DECAY_RATE_Fill) :
			(cur_ch1 * (1 - ATTACK_RATE_Fill) + ch1 * ATTACK_RATE_Fill);
			
		cur_ch2 = cur_ch2 > ch2 ?
			Math.max(ch2, cur_ch2 * DECAY_RATE_Fill) :
			(cur_ch2 * (1 - ATTACK_RATE_Fill) + ch2 * ATTACK_RATE_Fill);
		
		
		ch1 = Engine.getDecibelsForGainFactor(cur_ch1);
		ch2 = Engine.getDecibelsForGainFactor(cur_ch2);
		
	    header_vumeter_ch1.setValue(ch1);
	    header_vumeter_ch2.setValue(ch2);
	
	    previousCh1 = ch1;
	    previousCh2 = ch2;
	});
	
	vuMeterTimer.startTimer(50);
	
	gain_knob_laf.registerFunction("drawRotarySlider", function (g, obj) {
		
		var a = obj.area;
		
		var textA = [
			a[0],
			a[1],
			75,
			a[3]
		];
		
		var text = 'OUT';
		
		var TEXT_COLOUR = HeaderTheme.textColour;
		
		if (obj.hover || obj.clicked) {
			TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
			text = obj.valueAsText;
		}
		
		g.setColour(TEXT_COLOUR);
		g.setFont(Fonts.mainFont, 16);
		g.drawAlignedText(text, textA, 'centred');
		
	});
	
	locl_vu_laf.registerFunction("drawRotarySlider", function (g, obj) {
	
		var a = obj.area;
		var bottomTextmargin = 0;
		var thickness = 1;
		var hor_pos = obj.valueNormalized;
		
		g.setColour(Colours.withAlpha(HeaderTheme.textColour, 0.4));
		g.fillRoundedRectangle(a, thickness);
	
		g.setColour(HeaderTheme.textColour);
		g.fillRoundedRectangle([a[0]  * (1 - obj.valueNormalized), a[1], a[2] - a[2] * (1 - obj.valueNormalized), a[3]], thickness);
		

	});

}
