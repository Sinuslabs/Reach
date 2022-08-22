// Icons
const var icon_panel_freeze = Content.getComponent("icon_panel_freeze");
const var icon_panel_degrade = Content.getComponent("icon_panel_degrade");
const var icon_panel_flair = Content.getComponent("icon_panel_flair");
const var icon_panel_io = Content.getComponent("icon_panel_io");
const var icon_panel_logo = Content.getComponent("icon_panel_logo");
const var icon_panel_heart = Content.getComponent("icon_panel_heart");

icon_panel_heart.setPaintRoutine(function(g) {
	g.setColour('0xFF7A00');
	g.fillPath(Paths.icons['heart'], [0, 0, 25, 25]);
});

icon_panel_logo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['logo'], [0, 0, 75, 75]);
});

icon_panel_freeze.setPaintRoutine(function(g) {
	g.setColour('0x6B6B6B');
	g.fillPath(Paths.icons['freeze'], [0, 0, 20, 20]);
});

icon_panel_degrade.setPaintRoutine(function(g) {
	var enabled = getBoolean(getPanelState('panel_degrade'));
	g.setColour(getIconColor(enabled));
	g.drawPath(Paths.icons['degrade'], [1, 1, 20, 20], 2);
});

icon_panel_flair.setPaintRoutine(function(g) {
	var enabled = getBoolean(getPanelState('panel_flair'));
	g.setColour(getIconColor(enabled));
	g.drawPath(Paths.icons['flair'], [1, 1, 30, 20], 2);
});

icon_panel_io.setPaintRoutine(function(g) {
	g.setColour('0x6B6B6B');
	g.fillPath(Paths.icons['inOut'], [0, 0, 80, 15]);
});

// Buttons
const laf = Engine.createGlobalScriptLookAndFeel();

laf.registerFunction('drawToggleButton', function(g, obj) {	
	var a = obj.area;
	if (obj.text.indexOf('icon') != -1) {
		var icon = obj.text.replace('icon-');
		g.fillPath(Paths.icons[icon], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
	} else if (obj.text.indexOf("label-") != -1) {
		var text = obj.text.replace("label-");
		g.drawAlignedText(text, a, "left");
	} else if (obj.text.replace("text") != -1) {
		var text = obj.text.replace("text-");
		g.drawAlignedText(text, a, 'centred');
	}
});



