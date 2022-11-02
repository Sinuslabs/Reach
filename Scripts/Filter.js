namespace Filter {
	// FILTER
	const var EQ = Synth.getEffect("Parametriq EQ1");
	
	const var EQPanel = Content.getComponent("tile_eq");
	EQPanel.setLocalLookAndFeel(localLaf);
	
	const var panel_filter = Content.getComponent("themeablePanel_filter");
	
	const var label_bandDisplay = Content.getComponent("label_bandDisplay");
	
	const var button_toggle_filter = Content.getComponent("button_toggle_filter")
	button_toggle_filter.setControlCallback(onbutton_toggle_filterControl);
		
	const var knob_filter_freq = Content.getComponent("knob_filter_freq");
	knob_filter_freq.setControlCallback(onknob_filter_freqControl);
	
	const var knob_filter_q = Content.getComponent("knob_filter_q");
	knob_filter_q.setControlCallback(onknob_filter_qControl);
	
	const var knob_filter_gain = Content.getComponent("knob_filter_gain");
	knob_filter_gain.setControlCallback(onknob_filter_gainControl);
	
	const var button_showFilter = Content.getComponent("button_showFilter");
	button_showFilter.setControlCallback(onbutton_showFilterControl);
	
	
	const var button_disableBand = Content.getComponent("button_disableBand")
	button_disableBand.setControlCallback(onbutton_disableBandControl);
	
	const var panel_filterButtons = Content.getComponent("panel_filterButtons");
	const filterButtons = [
		Content.getComponent("button_lowPass"),
		Content.getComponent("button_HighPass"),
		Content.getComponent("button_lowShelf"),
		Content.getComponent("button_highShelf"),
		Content.getComponent("button_bandPass")
	];
	
	filterButtons[0].setControlCallback(onbutton_lowPassControl);
	filterButtons[1].setControlCallback(onbutton_HighPassControl);
	filterButtons[2].setControlCallback(onbutton_lowShelfControl);
	filterButtons[3].setControlCallback(onbutton_highShelfControl);
	filterButtons[4].setControlCallback(onbutton_bandPassControl);
	
	// UI
	
	// EQ
	const localLaf = Content.createLocalLookAndFeel();
	localLaf.registerFunction("drawFilterDragHandle", function(g, obj)
	{	
		var SIZE = 26;
		var area = [obj.handle[0], obj.handle[1], SIZE, SIZE];
		
		g.setColour(0XFFFFFFFF);
		g.fillEllipse(area);
		
		g.setColour(0XFF000000);
		g.drawEllipse(area, 2);
		
		g.setFont(Fonts.secondaryFont, 24); 
		g.drawAlignedText(obj.index, area, "centred");
	});
	
	
	// FILTER OUTLINE ICONS
	const FILTER_BUTTON_PADDING = 5;
	const FILTER_BUTTON_STROKE_WIDTH = 5;
	
	const filterButtonLAF = Content.createLocalLookAndFeel();
	filterButtonLAF.registerFunction('drawToggleButton', function(g, obj){
		
		var a = obj.area;
		var SELECTED_ICON_COLOUR = DisplayTheme.selectedIconColour;
		var ICON_COLOUR = DisplayTheme.iconColour;
		
		if (obj.over) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		a = [
			FILTER_BUTTON_PADDING,
			FILTER_BUTTON_PADDING,
			a[2] - FILTER_BUTTON_PADDING * 2,
			a[3] - FILTER_BUTTON_PADDING * 2
		];
		
		obj.value ?
			g.setColour(SELECTED_ICON_COLOUR) :
			g.setColour(ICON_COLOUR);
		
		g.drawPath(Paths.icons[obj.text], a, FILTER_BUTTON_STROKE_WIDTH);
	});
	
	for (filterButton in filterButtons) {
		filterButton.setLocalLookAndFeel(filterButtonLAF);
	}
	
	// LOGIC
	
	// Broadcast
	const var eqWatcher = Engine.createBroadcaster({
		"id": "EQ Watcher",
		"args": ["component", "event"]
	});
	
	eqWatcher.attachToComponentMouseEvents("tile_eq", "All Callbacks", "Mouse Listener for EQ");
	
	eqWatcher.addListener("RefreshFunction", "updates each EQ band on Drag and sets the filter label", updateFilterModule);
	
	inline function updateFilterModule(component, event) {
		if(event.drag || event.clicked) {
		
			local movingBand = getMovingBand();
			if (movingBand) {
				
				updateFilterLabel();
				
				local frequency = movingBand.frequency;
				local gain = movingBand.gain;
				local q = movingBand.q;
				
				local parameter = getParameterFromBand(frequency, gain, q);
				
				customParameter(parameter);
				
				Filter.knob_filter_freq.setValue(frequency);
				Filter.knob_filter_gain.setValue(gain);
				Filter.knob_filter_q.setValue(q);
			}
		}
	}
	
	
	inline function getMovingBand() {
	
		for (i = 0; i < 6; i++) {
		
			local lastGain = Bands.lastGains[i];
			local lastFrequency = Bands.lastFrequencies[i];
			local lastQ = Bands.lastQs[i];
			
			// get the index for each handle and extract data
			local currentBand = getCurrentBand(i);
			// if one of the parameters has changed compared to the last time update that Band
			if (lastGain != currentBand.gain || lastFrequency != currentBand.frequency || lastQ != currentBand.q){
				// add to the lastBands buffer for next comparison
				
				Bands.lastGains[i] = currentBand.gain;
				Bands.lastFrequencies[i] = currentBand.frequency;
				Bands.lastQs[i] = currentBand.q;
				
				STATE.currentBandIndex = currentBand.index;
				// Get the filter type for the currently used band
				STATE.currentBandFilterType = bandTypeToLabel(parseInt(Filter.EQ.getAttribute(currentBand.index + 4)));
				
				return {
					name: 'Band ' + i,
					frequency: currentBand.frequency,
					gain: currentBand.gain,
					q: currentBand.q,
					type: bandTypeToLabel(parseInt(currentBand.type))
				}
			}
		}
	}
	
	inline function getCurrentBand(bandIndex) {
		local eqIndex = bandIndex * Filter.EQ.BandOffset + Filter.EQ.BandGain;
		return {
			gain: Math.floor(Filter.EQ.getAttribute(eqIndex) * 100 ) / 100,
			frequency: Math.floor(Filter.EQ.getAttribute(eqIndex + 1) * 100) / 100,
			q: Math.floor(Filter.EQ.getAttribute(eqIndex + 2) * 100 ) / 100,
			index: eqIndex
		};
	}
	
	inline function getParameterFromBand(frequency, gain, q) {
	 return Engine.doubleToString(STATE.currentBandIndex / 5, 0) + ' | ' + Math.round(parseInt(frequency)) + 'Hz | ' +  Engine.doubleToString(gain, 1) + 'dB | ' + Engine.doubleToString(q, 2) + ' Q';
	}
	
	// BYPASS
	inline function onbutton_toggle_filterControl(component, value)
	{
		EQ.setBypassed(!value);
		panel_filter.set('enabled', value);
		
		if (STATE.presetBrowserOpen) return;
		
		if (value) {
			STATE.filterOpen = true;
			displayShowMain('filter');
			updateFreezeParameter(false);
		} else {
			STATE.filterOpen = false;
			displayShowMain('default');
		}
		
		button_showFilter.setValue(value);
		
	};
	
	
	inline function onknob_filter_freqControl(component, value)
	{
		EQ.setAttribute(STATE.currentBandIndex + 1 , value);
		updateParameterWithLabel('FREQUENCY', value, 'Hz');
		
		if (STATE.filterOnDrag == 1) {
			STATE.filterOpen = true;
			displayShowMain('filter');
			updateFreezeParameter(false);
		}
	};
	

	inline function onknob_filter_qControl(component, value)
	{
		
		EQ.setAttribute(STATE.currentBandIndex + 2, value);
		updateParameterWithLabel('Q', value, '');
		if (STATE.filterOnDrag == 1) {
			STATE.filterOpen = true;
			displayShowMain('filter');
			updateFreezeParameter(false);
		}
	}
	

	inline function onknob_filter_gainControl(component, value)
	{
		EQ.setAttribute(STATE.currentBandIndex, value);
		updateParameterWithDb('GAIN', value);
		if (STATE.filterOnDrag == 1) {
			STATE.filterOpen = true;
			displayShowMain('filter');
			updateFreezeParameter(false);
		}
	};
	

	inline function onbutton_showFilterControl(component, value)
	{
		if (value) {
			STATE.filterOpen = true;
			displayShowMain('filter');
			updateFreezeParameter(false);
		} else {
			STATE.filterOpen = false;
			displayShowMain('default');
		}
	};
	
	inline function onbutton_disableBandControl(component, value)
	{	
		EQ.setAttribute(STATE.currentBandIndex + 3, value);
		label_bandDisplay.set('enabled', value);
	};
	
	inline function onbutton_lowPassControl(component, value)
	{
		
		if (value) {
				local idx = 0;
				EQ.setAttribute(STATE.currentBandIndex + 4, idx);
				filterTypeRadio(idx);
		}
	};
	
	inline function onbutton_HighPassControl(component, value)
	{
		
		if (value) {
			local idx = 1;
			EQ.setAttribute(STATE.currentBandIndex + 4, idx);
			filterTypeRadio(idx);
		}
	};
	
	inline function onbutton_lowShelfControl(component, value)
	{
		
		if (value) {
			local idx = 2;
			EQ.setAttribute(STATE.currentBandIndex + 4, idx);
			filterTypeRadio(idx);
		
		}
	};
	
	inline function onbutton_highShelfControl(component, value)
	{
		if (value) {
			local idx = 3;
			EQ.setAttribute(STATE.currentBandIndex + 4, idx);
			filterTypeRadio(idx);
		}
	};
	
	inline function onbutton_bandPassControl(component, value)
	{
		local idx = 4;
		if (value) {
			EQ.setAttribute(STATE.currentBandIndex + 4, idx);
			filterTypeRadio(idx);
		}
	};
}

namespace Bands {
	const var lastGains = [];
	const var lastFrequencies = [];
	const var lastQs = [];
	const var lastTypes = [];
}