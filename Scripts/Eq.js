const var eqWatcher = Engine.createBroadcaster({"component": undefined, "event": undefined});

eqWatcher.attachToComponentMouseEvents("tile_eq", "All Callbacks");

const var label_bandDisplay = Content.getComponent("label_bandDisplay");
eqWatcher.addListener("RefreshFunction", function(component, event)
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
			
			knob_filter_freq.setValue(frequency);
			knob_filter_gain.setValue(gain);
			knob_filter_q.setValue(q);
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
			STATE.currentBandFilterType = bandTypeToLabel(parseInt(Filter.getAttribute(currentBand.index + 4)));
			
			Console.print('currentBand filter type' + STATE.currentBandFilterType);
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
	var index = bandIndex * Filter.BandOffset + Filter.BandGain;
	return {
		gain: Math.floor(Filter.getAttribute(index) * 100 ) / 100,
		frequency: Math.floor(Filter.getAttribute(index + 1) * 100) / 100,
		q: Math.floor(Filter.getAttribute(index + 2) * 100 ) / 100,
		index: index
	};
}

function getParameterFromBand(frequency, gain, q) { return Engine.doubleToString(STATE.currentBandIndex / 5, 0) + ' | ' + Math.round(parseInt(frequency)) + 'Hz | ' +  Engine.doubleToString(gain, 1) + 'dB | ' + q + ' Q';   }

var lastBands = [
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