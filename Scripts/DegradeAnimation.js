namespace DegradeAnimation {
	const var AnimationPanel = Content.getComponent("panel_animation_degrade");
	
	// Settings
	const ZOOM_AMOUNT = 2;
	const BORDER_RADIUS_MULTIPLIER = 40;
	
	reg rings = 10;
	reg PADDING = 1;
	reg borderRadius = 1;
	reg thickness = 4;
	reg zoom = 1;
	
	inline function setZoom(amount) { zoom = 1 - (amount * -1) * ZOOM_AMOUNT; }
	inline function setBorderRadius(amount) { borderRadius = BORDER_RADIUS_MULTIPLIER / amount; }
	
	AnimationPanel.setPaintRoutine(animationRoutine);
	inline function animationRoutine(g) {
	
		local a = [ 0, 0, this.getWidth(), this.getHeight()];
		
		local pa = [
			a[0] + PADDING,
			a[1] + PADDING,
			a[2] - PADDING * 2,
			a[3] - PADDING * 2
		];

	    g.setColour(DisplayTheme.buttonSelectedBackgroundColour);
	    
	    g.drawRoundedRectangle(pa, borderRadius, thickness);
	        
	    local radius = a[2] / 2 - 10 * zoom;
	    local diameter;
	    local pos;
	
	    for (i = 1; i < rings; i++) {
	        diameter = (radius * 2 / 4 * i + 10);
	        pos = a[2] / 2 - diameter / 2;
	        if (pos > 0)
	        	g.drawRoundedRectangle([
	        		pos + 1,
	        		pos + 1,
	        		diameter - 2, 
	        		diameter - 2
	        	], borderRadius,  thickness);
	    } 
	};
}



