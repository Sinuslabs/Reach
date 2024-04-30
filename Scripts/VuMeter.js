var vuMeterTimer = Engine.createTimerObject();
const header_vumeter_ch1 = Content.getComponent("header_vumeter_ch1");
const header_vumeter_ch2 = Content.getComponent("header_vumeter_ch2");
const Analyser1 = Synth.getEffect("Analyser1");

var previousCh1 = 0;
var previousCh2 = 0;
const attackRate = 0.3; // Faster response when level increases
const decayRate = 0.9; // Slower response when level decreases

vuMeterTimer.setTimerCallback(function() {
    var ch1 = getNormalizedPeakValue(Analyser1.getCurrentLevel(false));
    var ch2 = getNormalizedPeakValue(Analyser1.getCurrentLevel(true));
    
    // Apply different smoothing based on whether the level is rising or falling
    ch1 = previousCh1 > ch1 ? Math.max(ch1, previousCh1 * decayRate) : (previousCh1 * (1 - attackRate) + ch1 * attackRate);
    ch2 = previousCh2 > ch2 ? Math.max(ch2, previousCh2 * decayRate) : (previousCh2 * (1 - attackRate) + ch2 * attackRate);

    header_vumeter_ch1.setValue(ch2);
    header_vumeter_ch2.setValue(ch1);

    previousCh1 = ch1;
    previousCh2 = ch2;
});

vuMeterTimer.startTimer(20);

function getNormalizedPeakValue(gain) {
    return 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
}
