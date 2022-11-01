const var eqWatcher = Engine.createBroadcaster({
	"id": "EQ Watcher",
	"args": ["component", "event"]
});

eqWatcher.attachToComponentMouseEvents("tile_eq", "All Callbacks", "Mouse Listener for EQ");

eqWatcher.addListener("RefreshFunction", "updates each EQ band on Drag and sets the filter label",function(component, event)
{
    if(event.drag || event.clicked) {
		var movingBand = getMovingBand();
		if (movingBand) {
			
			updateFilterLabel();
			
			var frequency = movingBand.frequency;
			var gain = movingBand.gain;
			var q = movingBand.q;
			
			var parameter = getParameterFromBand(frequency, gain, q);
			
			customParameter(parameter);
			
			Filter.knob_filter_freq.setValue(frequency);
			Filter.knob_filter_gain.setValue(gain);
			Filter.knob_filter_q.setValue(q);
		}
    }
});

function getMovingBand() {
	for (var i = 0; i < lastBands.length; i++) {
		
		var lastBand = lastBands[i];
		
		// get the index for each handle and extract data
		var currentBand = getCurrentBand(i);
		// if one of the parameters has changed compared to the last time update that Band
		if (lastBand.gain != currentBand.gain || lastBand.frequency != currentBand.frequency || lastBand.q != currentBand.q){
			// add to the lastBands buffer for next comparison
			lastBands[i] = currentBand;
			
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

function getCurrentBand(bandIndex) {
	reg eqIndex = bandIndex * Filter.EQ.BandOffset + Filter.EQ.BandGain;
	return {
		gain: Math.floor(Filter.EQ.getAttribute(eqIndex) * 100 ) / 100,
		frequency: Math.floor(Filter.EQ.getAttribute(eqIndex + 1) * 100) / 100,
		q: Math.floor(Filter.EQ.getAttribute(eqIndex + 2) * 100 ) / 100,
		index: eqIndex
	};
}

function getParameterFromBand(frequency, gain, q) {
 return Engine.doubleToString(STATE.currentBandIndex / 5, 0) + ' | ' + Math.round(parseInt(frequency)) + 'Hz | ' +  Engine.doubleToString(gain, 1) + 'dB | ' + Engine.doubleToString(q, 2) + ' Q';
}

reg lastBands = [
	{
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	}, {
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
		type: 0
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
	}
];