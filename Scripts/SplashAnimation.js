namespace SplashAnimation {
	const tubeAni = "1137.nT6K8C1nczyH.Xdq3IBHuBc..V1250LwEq5iBR5xDXRXgwM6kDtxzMGJhC.v.hOA6Avb.bF.H+eeeuoiMh9JOr07aq9ozMCxRRrvAyEK7wVhifIDcdT0hr5X9ON4CwboOXEjkdzjYlHAiTAsYBjkRyAJyjHbnhIXtXIz.EHf.DX.xbfnnBjkTlCjFLnMNRzDgBxRPdXNPWvH4xkHHKgP8xiQlCzEKyAx4AjkPyAxxDzlsk50Rqk5KUJt2Mc02NWjWq0ou+5onRyWOTU9xMUa16lv.LbPAVxBjGHONQbvjVp0ku3T+E8GY+vjxCTnPhkRCXTAykLgXghDLSrXQEGHLC4.ARhkHQbAsjkrjk1C2KYnAy3fddtY0975KjWsOdwsu9NUanNLUmZoOe84yeXIHttmxRqt7g4iKZ.sYB086xRq66mFQ03LSky0yMeTkJddCsy8QUakt8JuU+atN18sYi0+6WbqeZIOUY.Kn.aIVYFknXbw+q659k4i0N8OUKhXy5gKcUEiqpHfvBA.OHpLGnHXV+rA5JduGUbOrgkRTcOO2WYuX0otxUGq7p4KU9wK20ZWMWY1Gmp5Ax+.hhYbWKkOsw+MhGqpFKL6FJmwKejneYpOhWe9hMeu548pkXu6Ssuuxiyr8+5tU3szDQ9CApAnAE7PzPC.P..QQ.PzP.kyAgrpA.SfE2LGbaWfxPUcMEMWkAEQYjjvBybjADo4aCTYoxHLr476GTrHr+FQLDxY4jU7kCYQEqR33EArFDuHSgaoK6vrHNcGTsuVe76aG6SEZAUjEmFZXWnG60CPhZXHDi7nBIVGNaoBz8FTi+5qAqauzqO9aY5gmyfAjThXDX45.vT8Z0pkOj19DjfnYH+x0PBNYJqHvY2S9j.Kv8EHVwv..wDMER6RZWAJaoyqaUa0yY623gw.sPAIV7aB1EL37fokZ7itDI8aPSQvPS4ZpEQIX1DEn3K1SQn75BuhphZN3A.ytz4QiomOgganCa6NyYkM8HQrzoemhvwpPKg5Mg1UwPLOj.81oD0zsOchyCwagGozTpUNwh2nEToHYs9b2naOPVlpCk60QDRpV2cNASgxzooVjP6CmJPPYDqC9Qu1jXMc0DPtVR+TgPwqy8ctfbZcpUpSNPFEdnXdYWJvQmad8VQ9Gw.PhJuozfoVn.dJVbJIwICAMDAWndk0tyEldkoi1GeGix2ZpBMBdfVnUkvOJnJhSr2dXqsqqBNH2A.N.+hRd2RW1pVXdp3Yqzf+84rlFaIEf.3PWPuRBIsVnERfhLPGfWbN2V1dZsAcFN70FQs73nNC3T9imLZCtPPNhNT3I7rNlQx43heFW+cpBctbbEbsMDpzhOeT.9lnJnWXsehvwMXjGzqslOB0FadafJGiVhY0xz32.LYxXx4AxmfXCWBJX13G12jLDHj63a5t5u+NZclAkBFrIbDQLgCFrzFhfAOW1.O.B24oe66TGLOh52pq3YjzPDEo2xfMMicOkk+n7IjCEa6shts2Uip.";
	
	
	reg frame = 0;
	
	// DECLARTIONS
	const var tubeAniPanel = Content.getComponent("tubeAni");
	const var animationBackground = Content.getComponent("animationBackground");
	const var tubeAniTimer = Engine.createTimerObject();
	
	inline function init() {
		// ANIMATION SETUP
		tubeAniPanel.setAnimation(tubeAni);
		
		tubeAniTimer.setTimerCallback(nextFrame);
		tubeAniTimer.startTimer(25);
		
		tubeAniPanel.set('visible', true);
		animationBackground.set('visible', true);
		
		hideUI();
	}
	
	inline function nextFrame() {
		tubeAniPanel.setAnimationFrame(frame);
		frame += 1.4;
		if (frame >= 80) cancelAnimation();
	}
	
	inline function cancelAnimation() {
		tubeAniTimer.stopTimer();
		tubeAniPanel.set('visible', false);
		showUI();
		Globals.screenLock = false;
	}
	
	inline function showUI() {
		Filter.button_filter.set('visible', true);
		EffectCustomizer.button_fx.set('visible', true);
		animationBackground.set('visible', false);
		for (indicator in EffectCustomizer.effectIndicators) {
			indicator.set('visible', true);
		}
	}
	
	inline function hideUI() {
		Filter.button_filter.set('visible', false);
		EffectCustomizer.button_fx.set('visible', false);
		for (indicator in EffectCustomizer.effectIndicators) {
			indicator.set('visible', false);
		}
	}
}