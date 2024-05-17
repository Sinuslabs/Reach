namespace PanicMode {

	const NAME = 'Reach_';

	const PanicTimeoutTimer = Engine.createTimerObject();
	PanicTimeoutTimer.setTimerCallback(onTimeout);
	
	inline function onTimeout() {
		PanicTimeoutTimer.stopTimer();
		randomizeAndScreenshot();
	}
	
	inline function randomizeAndScreenshot() {
		
		Engine.setZoomLevel(1.0);
		Randomization.randomizeParameters();
		Content.createScreenshot(
			[0, 0, 1134, 510],
			FileSystem.getFolder(FileSystem.Documents),
			NAME + '_' + Math.randInt(0, 99));
	}

	inline function panic() {
		PanicTimeoutTimer.startTimer(1000);
	}

}