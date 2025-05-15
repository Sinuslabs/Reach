namespace crc {
	
	const e = false;
	
	const var crc_pnl = Content.getComponent("crc_pnl");
	crc_pnl.set('visible', false);
	if (e) {
		crc_pnl.set('visible', true);
	} 
	const var Button1 = Content.getComponent("displayButton-thanks");
	const var close_crc = Content.getComponent("close_crc");
	close_crc.setControlCallback(oncl);
	close_crc.setLocalLookAndFeel(LAF_displayIcon);
	
	Button1.setLocalLookAndFeel(LAF_displayButton);
	Button1.setControlCallback(ondisplayButtonThanksControl);
	
	inline function ondisplayButtonThanksControl(component, value)
	{	
		if (value) {
			Engine.openWebsite('https://sinuslabs.lemonsqueezy.com/buy/3906a349-b369-4a5a-bd70-45477a8bac1c?checkout[discount_code]=PIRAT');
		}
	};
	
	inline function oncl(component, value) {
		if (!value) return;
		crc_pnl.set('visible', false);
	}
} 