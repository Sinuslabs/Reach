const var eqWatcher = Engine.createBroadcaster({"component": undefined, "event": undefined});

eqWatcher.attachToComponentMouseEvents("tile_eq", "All Callbacks");

const var label_bandDisplay = Content.getComponent("label_bandDisplay");
eqWatcher.addListener("RefreshFunction", function(component, event)
{
    if(event.drag || event.clicked) {
		var movingBand = getChannelData();
		if (movingBand) {
			label_bandDisplay.set('text', movingBand.name + ' | ' + STATE.currentBandFilterType);
			knob_filter_freq.setValue(movingBand.frequency);
			knob_filter_gain.setValue(movingBand.gain);
			knob_filter_q.setValue(movingBand.q);
		}
    }
});



function getChannelData() {
	for (var i = 0; i < lastBands.length; i++) {
		
		var lastBand = lastBands[i];
		
		// get the index for each handle and extract data
		var currentBand = getCurrentBand(i);
		// if one of the parameters has changed compared to the last time update that Band
		if (lastBand.gain != currentBand.gain || lastBand.frequency != currentBand.frequency || lastBand.q != currentBand.q){
			// add to the lastBands buffer for next comparison
			lastBands[i] = currentBand;
			
			STATE.currentBandIndex = currentBand.index;
			return {
				name: 'Band ' + i,
				frequency: currentBand.frequency,
				gain: currentBand.gain,
				q: currentBand.q,
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

var lastBands = [
	{
		gain: 0,
		frequency: 0,
		q: 0,
	}, {
		gain: 0,
		frequency: 0,
		q: 0,
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
	},
	{
		gain: 0,
		frequency: 0,
		q: 0,
	}
];