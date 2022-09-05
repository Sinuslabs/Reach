// Icons
const var icon_panel_freeze2 = Content.getComponent("icon_panel_freeze2");
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

icon_panel_freeze2.setPaintRoutine(function(g) {
	g.setColour('0xD4D4D4');
	g.fillPath(Paths.icons['freeze'], [0, 0, 30, 30]);
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
	
	if (obj.text.indexOf('button-') != -1) {
		obj.text = obj.text.replace('button-');
		obj.over == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);
		g.fillRect(a);
		g.setColour(obj.textColour);
		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
	}
	if (obj.text.indexOf('toggle-') != -1) {
		obj.value == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);
		
		if (obj.over == 1) {
			g.setColour(obj.itemColour1);
		}
		obj.text = obj.text.replace('toggle-');
		if (obj.text.indexOf('rounded-') != -1) {
			obj.text = obj.text.replace('rounded-');
			g.fillRoundedRectangle(a, 4);
			if (obj.text.indexOf('icon-') != -1) {
				if (obj.over == 1) {
					g.setColour(obj.itemColour2);
				}
				obj.text = obj.text.replace('icon-');
				obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour2);
				g.fillPath(Paths.icons['freeze'], [20, 20, 40, 40]);
			}
		} else {
			g.fillRect(a);
		}
		
		g.addNoise({
			alpha: 0.02,
			monochromatic: true,
			scaleFactor: 10.0,
			area: a,
		});	
		
		obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour2);
		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
	}
	if (obj.text.indexOf('icon-outline-') != -1) {
		g.setColour(obj.itemColour1);
		if (obj.over == 1) {
			g.setColour(obj.itemColour2);
		}
		var icon = obj.text.replace('icon-outline-');
		g.drawPath(Paths.icons[icon], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])], 2);
	} else if (obj.text.indexOf('icon') != -1) {
		var icon = obj.text.replace('icon-');
		g.setColour(obj.bgColour);
		if (obj.over == 1) {
			g.setColour(obj.itemColour1);
		}
		g.fillPath(Paths.icons[icon], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
	} else if (obj.text.indexOf("label-") != -1) {
		var text = obj.text.replace("label-");
		g.setFont('inter-semi', 32);
		obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour1);
		if (obj.over == 1) {
			g.setColour(obj.itemColour2);
		}
		g.drawAlignedText(text, a, "centred");
	} else if (obj.text.replace("text") != -1) {
		var text = obj.text.replace("text-");
		g.drawAlignedText(text, a, 'centred');
	}
});


// override preset browser search bar to hide it
laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj){});

laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
{
	var a = obj.area;

    if(obj.selected)
    {
        g.setColour('0xFFDDDDDD');
        g.fillRoundedRectangle(a, 0);
        g.setColour('0x#FF000000');
    } else {
    	g.setColour(obj.textColour);	    
    }
   
   	g.setFont('space', 32.0);
    g.drawAlignedText(obj.text, [5, a[1], a[2], a[3]], "left");
});
