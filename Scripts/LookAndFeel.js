// Icons
const var icon_panel_freeze2 = Content.getComponent("icon_panel_freeze2");

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

icon_panel_io.setPaintRoutine(function(g) {
	g.setColour('0x6B6B6B');
	g.fillPath(Paths.icons['inOut'], [0, 0, 80, 15]);
});

// Buttons
const laf = Engine.createGlobalScriptLookAndFeel();

laf.registerFunction('drawToggleButton', function(g, obj) {	
	var a = obj.area;
	
	if (obj.text.indexOf("onOff-label-") != -1) {
			obj.text = obj.text.replace('onOff-label-');
			obj.value == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);
		
			if (obj.over == 1) {
				g.setColour(obj.itemColour2);
			}
			var text = obj.text.replace("onOff-label-");
			g.fillPath(Paths.icons['onOff'], [10, 10, 20, 20]);
			g.setFont('inter-semi', 32.0);
			g.drawAlignedText(text, a, 'centred');
	}
	
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
		if (!panel_reverb.get('enabled')) g.setColour(obj.itemColour1);	

		obj.text = obj.text.replace('toggle-');
		if (obj.text.indexOf('rounded-') != -1) {
			if (obj.over == 1) {
				g.setColour(obj.itemColour1);
			}
		
			obj.text = obj.text.replace('rounded-');
			g.fillRoundedRectangle(a, 4);
			if (obj.text.indexOf('icon-') != -1) {
				if (obj.over == 1) {
					g.setColour(obj.itemColour2);
				}
				obj.text = obj.text.replace('icon-');
				obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour2);
				if (!panel_reverb.get('enabled')) g.setColour(obj.textColour);	
				g.fillPath(Paths.icons['freeze'], [20, 20, 40, 40]);
			}
		} else {
			obj.value == 1 ? g.setColour(obj.bgColour) : g.setColour(obj.bgColour);
			obj.over == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.itemColour2);
			g.fillRect(a);
		}
		
		g.addNoise({
			alpha: 0.02,
			monochromatic: true,
			scaleFactor: 10.0,
			area: a,
		});	
		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
	}
	if (obj.text.indexOf('settings-') != -1) {
		obj.text = obj.text.replace('settings-');
		obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.bgColour);
		if (obj.over) g.setColour(obj.itemColour1);	
		g.fillRect(a);
		
		obj.value == 1 ? g.setColour(obj.bgColour) : g.setColour(obj.textColour);
		if (obj.over) g.setColour(obj.bgColour);

		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, [a[0] + 30, a[1], a[2], a[3]], 'left');
	}
	if (obj.text.indexOf('icon-outline2-') != -1) {
		bj.value == 1 ? g.setColour(obj.bgColour) : g.setColour(obj.itemColour2);
				if (obj.over == 1) {
					g.setColour(obj.itemColour1);
				}
				var icon = obj.text.replace('icon-outline2-');
				g.drawPath(Paths.icons[icon], [this.getHeight / 2 , this.getWidth / 2, a[2], a[3]], 2);
	}
	if (obj.text.indexOf('icon-outline-') != -1) {
		obj.value == 1 ? g.setColour(obj.bgColour) : g.setColour(obj.itemColour2);
		if (obj.over == 1) {
			g.setColour(obj.itemColour1);
		}
		var icon = obj.text.replace('icon-outline-');
		g.drawPath(Paths.icons[icon], [this.getHeight / 2 + 5, this.getWidth / 2 + 5, parseInt(a[2] - 10), parseInt(a[3] - 10)], 5);
	} else if (obj.text.indexOf('icon') != -1) {
		var icon = obj.text.replace('icon-');
		obj.value == 1 ? g.setColour(obj.bgColour) : g.setColour(obj.itemColour2);
		if (obj.over == 1) {
			g.setColour(obj.itemColour1);
		}
		g.fillPath(Paths.icons[icon], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
	} else if (obj.text.indexOf("label-") != -1) {
		var text = obj.text.replace("label-");
		obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour1);
		if (obj.over == 1) {
			g.setColour(obj.itemColour2);
		}
		g.setFont('inter-semi', 26);
		g.drawAlignedText(text, a, "centred");
	} else if (obj.text.indexOf("text-") != -1) {
		var text = obj.text.replace("text-");
		g.drawAlignedText(text, a, 'centred');
	}
	
	if (obj.text.indexOf('animationToggle') != -1) {
		
		var border = 10;
	
		g.setColour(obj.bgColour);
		g.drawRect(a, 3);
		g.setFont('space', 26.0);
		
		if (obj.value) {
			g.fillRect([a[2] / 2, border, a[2] / 2 - border, a[3] - border * 2]);		
			g.drawAlignedText('ON', [0, 0, a[2] / 2, a[3]], 'centred');
		} else {	
			g.fillRect([border, border, a[2] / 2 - border, a[3] - border * 2]);
			g.drawAlignedText('OFF', [a[2] / 2, 0, a[2] / 2, a[3]], 'centred');
		}
		

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


const localLaf = Content.createLocalLookAndFeel();
localLaf.registerFunction("drawFilterDragHandle", function(g, obj)
{	
	var SIZE = 26;
	var area = [obj.handle[0], obj.handle[1], SIZE, SIZE];
	
	g.setColour(0XFFFFFFFF);
	g.fillEllipse(area);
	
	g.setColour(0XFF000000);
	g.drawEllipse(area, 2);
	
	g.setFont("space", 24); 
	g.drawAlignedText(obj.index, area, "centred");
});

const var EQ = Content.getComponent("tile_eq");
EQ.setLocalLookAndFeel(localLaf);

