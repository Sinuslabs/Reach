namespace About {
	
	const var about_info = Content.getComponent("about_info");
	
	const INFO = {
		
		name: 'REACH',
		website: 'https://sinuslabs.io/product/reach/'
		
	};
	
	about_info.setMouseCallback(function (event) {
		
		if (event.clicked) {
			Engine.openWebsite(INFO.website);
		}
		
	});
	
	about_info.setPaintRoutine(aboutRoutine);
	
	inline function aboutRoutine(g) {
		
		local a = this.getLocalBounds(1);
		
		local textHeight = 20;
		
		local logoArea = [a[0], a[1], 55, 77];
		local textArea = [60, a[1], a[2], a[3]];
		
		local nameArea = [textArea[0], a[1], a[2], textHeight];
		local versionArea = [textArea[0], a[1] + textHeight, 60, textHeight];
		local buildArea = [textArea[0], a[1] + textHeight * 2, a[2], textHeight];
		
		g.setColour(DisplayTheme.buttonSelectedBackgroundColour);
		g.fillPath(Paths.icons.reachLogo, logoArea);
		
		g.setFont(Fonts.mainFont, 20);
		g.drawAlignedText(INFO.name, nameArea, 'left');
		
		g.setColour('0xF2F63E');
		g.fillRoundedRectangle(versionArea, 2);
		
		g.setColour(Colours.black);
		g.drawAlignedText('V'+Engine.getVersion(), versionArea, 'centred');
		
		g.setColour(DisplayTheme.buttonSelectedBackgroundColour);
		g.setFont(Fonts.secondaryFont, 14);
		g.drawAlignedText(getDate(), buildArea, 'left');
	}
	
	inline function getDate() {
		local date = Date.getSystemTimeISO8601(true);
		
		date = date.split('.')[0];
		local time = date.split('T')[1];
		date = date.split('T')[0];
		return date;
	}
}