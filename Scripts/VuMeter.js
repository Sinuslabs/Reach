var vuMeterTimer = Engine.createTimerObject();
const var header_vumeter_ch1 = Content.getComponent("header_vumeter_ch1");
const var header_vumeter_ch2 = Content.getComponent("header_vumeter_ch2");

vuMeterTimer.setTimerCallback(function()
{
	var ch1 = getNormalizedPeakValue(Engine.getMasterPeakLevel(1));
	var ch2 = getNormalizedPeakValue(Engine.getMasterPeakLevel(0));
	
	header_vumeter_ch1.setValue(ch2);
	header_vumeter_ch2.setValue(ch1);
});
vuMeterTimer.startTimer(50);

function getNormalizedPeakValue(gain) {
		return 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
}
