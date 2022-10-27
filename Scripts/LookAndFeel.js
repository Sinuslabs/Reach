// Icons
const var icon_panel_freeze2 = Content.getComponent("icon_panel_freeze2");

const var icon_panel_logo = Content.getComponent("icon_panel_logo");
const var icon_panel_heart = Content.getComponent("icon_panel_heart");
const var icon_panel_fullLogo = Content.getComponent('icon_panel_fullLogo');

// Noise Panels
const var noise_panels = Content.getAllComponents('_noise');

// Background Noise
for (var i=0; i < noise_panels.length; i++) {
	noise_panels[i].setPaintRoutine(function(g) {
		var a = [0, 0, this.getWidth(), this.getHeight()];
		g.addNoise({
			alpha: 0.03,
			monochromatic: false,
			scaleFactor: 1.5,
			area: a
		});
	});
}

// custom Icons
icon_panel_heart.setPaintRoutine(function(g) {
	g.setColour('0xFF7A00');
	g.fillPath(Paths.icons['heart'], [0, 0, 25, 25]);
});

icon_panel_logo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['logo'], [0, 0, 75, 75]);
});

icon_panel_fullLogo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['fullLogo'], [0, 0, 360, 40]);
});

icon_panel_freeze2.setPaintRoutine(function(g) {
	g.setColour('0xD4D4D4');
	g.fillPath(Paths.icons['freeze'], [0, 0, 30, 30]);
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
		return;
	}
	
	if (obj.text.indexOf('freeze-icon-') != -1) {
		
		var border = 3;

		if (!obj.value) {
			g.setColour(obj.itemColour1);
			g.fillRoundedRectangle([a[0] + border, a[1] + border + 3, a[2] - border * 2, a[3] - border * 2], 4);
		}
		
		g.setColour(obj.bgColour);
		
		if (obj.over == 1) { g.setColour(obj.itemColour2);}
		g.fillRoundedRectangle([a[0] + border, a[1] + border, a[2] - border * 2, a[3] - border * 2], 4);
		
		obj.value == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.textColour);
		g.fillPath(Paths.icons['freeze'], [20, 20, 40, 40]);
		return;
	}
	
	if (obj.text.indexOf('button-') != -1) {
		obj.text = obj.text.replace('button-');
		obj.over == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);
		g.fillRect(a);
		g.setColour(obj.textColour);
		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
		return;
	}
	if (obj.text.indexOf('toggle-') != -1) {
		
		obj.text = obj.text.replace('toggle-');
		obj.value == 1 ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);

		if (obj.over == 1) {
			g.setColour(obj.itemColour1);
		}
		g.fillRect(a);
		g.addNoise({
			alpha: 0.02,
			monochromatic: true,
			scaleFactor: 10.0,
			area: a,
		});	
		g.setColour(obj.textColour);
		g.setFont('space', 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
		return;
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
		return;
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
		return;
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
		return;
	} else if (obj.text.indexOf("text-") != -1) {
		var text = obj.text.replace("text-");
		obj.value == 1 ? g.setColour(obj.textColour) : g.setColour(obj.itemColour1);
		if (obj.over == 1) {
			g.setColour(obj.itemColour2);
		}
		g.drawAlignedText(text, a, 'centred');
		return;
	}
	
	if (obj.text.indexOf('animationToggle') != -1) {
		
		var border = 10;
	
		g.setColour(obj.bgColour);
		g.drawRect(a, 3);
		g.setFont('space', 26.0);
		
		if (obj.value == 0.0) {
			g.fillRect([a[2] / 2, border, a[2] / 2 - border, a[3] - border * 2]);		
			g.drawAlignedText('ON', [0, 0, a[2] / 2, a[3]], 'centred');
		} else {	
			g.fillRect([border, border, a[2] / 2 - border, a[3] - border * 2]);
			g.drawAlignedText('OFF', [a[2] / 2, 0, a[2] / 2, a[3]], 'centred');
		}
	}
});

// SLIDERS

// GENERAL
const DISABLED_OPACITY = 'CC';

// ARC
const ARC_THICKNESS = 3;
const ARC_PADDING = 13;

// INDICATOR
const INDICATOR_THICKNESS = 5;
const INDICATOR_LENGTH = 15;
const INDICATOR_BORDER_RADIUS = 2;
const INDICATOR_GAP = 8;

// MAIN BODY

const BORDER = 2;

// SHADOW
const SHADOW_RADIUS = 10;
const SHADOW_OFFSET = [0, 2];
const SHADOW_PADDING = 5;

// EXTRA RING
const GLOW_RING_SIZE = 3;
const GLOW_AMOUNT = 3;

laf.registerFunction("drawRotarySlider", function(g, obj){
	
	// Padding
	var PADDING = 10;
	
	// Colours
	var ARC_COLOUR = THEME.SLIDER.ARC_COLOUR;
	var INDICATOR_COLOUR = THEME.SLIDER.INDICATOR_COLOUR;
	var UPPER_GRADIENT = THEME.SLIDER.UPPER_GRADIENT_COLOUR;
	var LOWER_GRADIENT = THEME.SLIDER.LOWER_GRADIENT_COLOUR;
	var BORDER_COLOUR = THEME.SLIDER.BORDER_COLOUR;
	var SHADOW_COLOUR = THEME.SLIDER.SHADOW_COLOUR;
	var RED_COLOUR = THEME.SLIDER.RED_COLOUR;
	var BLUE_COLOUR = THEME.SLIDER.BLUE_COLOUR;
	
	// Make transparent on disabled
	var disabled = !obj.enabled;
	if (disabled) {
		// Special case for the ARC Colour since its black transparency is not doing much
		ARC_COLOUR = ARC_COLOUR.replace('0x', '0x66');
		INDICATOR_COLOUR = INDICATOR_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		UPPER_GRADIENT = UPPER_GRADIENT.replace('0x', '0x' + DISABLED_OPACITY);
		LOWER_GRADIENT = LOWER_GRADIENT.replace('0x', '0x' + DISABLED_OPACITY);
		BORDER_COLOUR = BORDER_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		SHADOW_COLOUR = SHADOW_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		RED_COLOUR = RED_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		BLUE_COLOUR = BLUE_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
	}
	
	if (obj.text == 'red' || obj.text == 'blue') {
		PADDING = 22;
	}
	
	var a = obj.area;
	var ka = [PADDING, PADDING, a[2] - PADDING * 2, a[3] - PADDING * 2];
	var sa = [
		PADDING + SHADOW_PADDING,
		PADDING + SHADOW_PADDING,
		a[2] - (PADDING + SHADOW_PADDING) * 2,
		a[3] - (PADDING + SHADOW_PADDING) * 2
	];
	
	if (obj.text == 'red') {
		g.setColour(RED_COLOUR);
		var ra = [
			PADDING - GLOW_RING_SIZE,
			PADDING - GLOW_RING_SIZE,
			a[2] - (PADDING - GLOW_RING_SIZE) * 2,
			a[3] - (PADDING - GLOW_RING_SIZE) * 2
		];
		g.fillEllipse(ra);
		g.addDropShadowFromAlpha(RED_COLOUR, GLOW_AMOUNT);
	}
	
	if (obj.text == 'blue') {
		g.setColour(BLUE_COLOUR);
		var ra = [
			PADDING - GLOW_RING_SIZE,
			PADDING - GLOW_RING_SIZE,
			a[2] - (PADDING - GLOW_RING_SIZE) * 2,
			a[3] - (PADDING - GLOW_RING_SIZE) * 2
		];
		g.fillEllipse(ra);
		g.addDropShadowFromAlpha(BLUE_COLOUR, GLOW_AMOUNT);
	}
	
	// SHADOW PATH
	var shadowPath = Content.createPath();
	shadowPath.addArc([0.0, 0.0, 1.0, 1.0], 0, Math.PI * 2);
	if (!disabled) {
		g.drawDropShadowFromPath(
			shadowPath,
			sa,
			SHADOW_COLOUR,
			SHADOW_RADIUS, SHADOW_OFFSET
		);
	}
	
	g.setColour(BORDER_COLOUR);
	g.fillEllipse(ka);
	g.setGradientFill([
		UPPER_GRADIENT, 0.0, 0.0,
		LOWER_GRADIENT, 0.5, 100.0]
	);
	
	g.fillEllipse([
		ka[0] + BORDER,
		ka[1] + BORDER,
		ka[2] - BORDER * 2,
		ka[3] - BORDER * 2
	]);
	
	var arcPath = Content.createPath();
	
	var start = 2.5;
	var end = start * 2 * obj.valueNormalized - start;
	
	var arcThickness = ARC_THICKNESS / 100;
	var arcWidth = (1.0 - 2.0 * arcThickness) + arcThickness;
	var stableSize = a[2];
	
	arcPath.addArc(
		[arcThickness / 2, arcThickness / 2,arcWidth , arcWidth],
		-start,
		end
	 );
	
	var pathArea = arcPath.getBounds(a[2] - ARC_PADDING);
	pathArea = [
		pathArea[0] + ARC_PADDING / 2,
		pathArea[1] + ARC_PADDING / 2,
		pathArea[2],
		pathArea[3]
	];
	
	g.setColour(ARC_COLOUR);	
	
	if (obj.text == 'red') {
		g.setColour(RED_COLOUR);
	}
	if (obj.text == 'blue') {
		g.setColour(BLUE_COLOUR);
	}
	
	g.drawPath(arcPath, pathArea, stableSize * arcThickness );
	
	g.rotate(end, [a[2] / 2, a[3] / 2]);
	g.setColour(INDICATOR_COLOUR);
	g.fillRoundedRectangle([
		a[2] / 2 - INDICATOR_THICKNESS / 2,
		PADDING + INDICATOR_GAP,
		(a[2] / 100) * INDICATOR_THICKNESS,
	 	(a[2] / 100) * INDICATOR_LENGTH],
	 	INDICATOR_BORDER_RADIUS
	);
});

// Themeable Panels
const var themeablePanels = Content.getAllComponents('themeablePanel');
const PANEL_BORDER = 2;
const PANEL_BORDER_RADIUS = 5;

// Main Panels
function themePanels() {
	for (panel in themeablePanels) {
		panel.setPaintRoutine(function(g)
		{
			var a = [0, 0, this.getWidth(), this.getHeight()];
			g.setColour(THEME.PANEL.BORDER_COLOUR);
			g.fillRoundedRectangle(a, PANEL_BORDER_RADIUS);
			
			g.setGradientFill([
				THEME.PANEL.UPPER_GRADIENT_COLOUR, 0.0, 0.0,
				THEME.PANEL.LOWER_GRADIENT_COLOUR, 0.5, 100.0]
			);
			g.fillRoundedRectangle([
				a[0] + PANEL_BORDER,
				a[1] + PANEL_BORDER,
				a[2] - PANEL_BORDER * 2,
				a[3] - PANEL_BORDER * 2
			], PANEL_BORDER_RADIUS);
		});
	}
}

function themeMainPanel() {
	panel_background.setPaintRoutine(function(g) {
		var a = [0, 0, this.getWidth(), this.getHeight()];
		g.setGradientFill([
			THEME.PANEL.MAIN_UPPER_GRADIENT_COLOUR, 0.0, 0.0,
			THEME.PANEL.MAIN_LOWER_GRADIENT_COLOUR, 0.5, 100.0]
		);
		g.fillRoundedRectangle(a, PANEL_BORDER_RADIUS);
	});
}
themeMainPanel();
themePanels();

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

laf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isTicked)
    {
        g.setColour(Colours.white);
        g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
    }
    
    if(obj.isHighlighted)
    {
        g.setColour(0x22FFFFFF);
        g.fillRect(obj.area);
    }
    
    g.setFont("space", 38.0);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

laf.registerFunction("drawComboBox", function(g, obj)
{
    var a = obj.area;

    g.setColour(obj.bgColour);
    g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], 2.0);
    g.setColour(Colours.withAlpha(obj.textColour, (obj.enabled && obj.active) ? 1.0 : 0.2));
    g.setFont("space", 36.0);
   
    g.drawAlignedText(obj.text, [a[0] + 30, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
});

laf.registerFunction("getIdealPopupMenuItemSize", function(obj)
{		 
	// this will set the width to 200 and height to 50
	//return [200, 50];
	 
	// sets the height to 30
	return 60;
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

