namespace ThankYou {
	
	const var thankyou_panel = Content.getComponent("thankyou_panel");
	
	ThankYou.thankyou_panel.showControl(false);
	
	thankyou_panel.setMouseCallback(onPanel);
	inline function onPanel(event) {
		
		if (event.clicked) { showMain(); }
		
	}
	
	
	thankyou_panel.setPaintRoutine(function (g) {
		
		var a = this.getLocalBounds(0);
		Console.print(DisplayTheme.defaultText);
		g.setColour(DisplayTheme.defaultText);
		//g.fillRect(a);
		g.fillPath(Paths.icons['highfive'], a);
		
	});
	
}