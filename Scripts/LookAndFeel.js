// Icons
const var icon_panel_logo = Content.getComponent("icon_panel_logo");
const var icon_panel_heart = Content.getComponent("icon_panel_heart");
const var icon_panel_fullLogo = Content.getComponent('icon_panel_fullLogo');

// custom Icons
icon_panel_heart.setPaintRoutine(function(g) {
	g.setColour('0xFF7A00');
	g.fillPath(Paths.icons['heart'], [0, 0, 18, 18]);
});

icon_panel_logo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['logo'], [0, 0, 48, 48]);
});

icon_panel_fullLogo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['fullLogo'], [0, 0, 220, 30]);
});

// LABELS
const var themeableLabels = Content.getAllComponents('themeAble_label');
function themeLabels() {
	for (label in themeableLabels) {
		label.setColour(3, PanelTheme.textColour);
	}
}
themeLabels();

// Buttons
const laf = Engine.createGlobalScriptLookAndFeel();

const SCROLLBAR_PADDING = 5;

laf.registerFunction('drawScrollbar', function(g, obj) {
	var a = obj.handle;
	var pa = [
		a[0] + SCROLLBAR_PADDING,
		a[1] + SCROLLBAR_PADDING,
		a[2] - SCROLLBAR_PADDING * 2,
		a[3] - SCROLLBAR_PADDING * 2,
	];
	var SCROLLBAR_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
	g.setColour(SCROLLBAR_COLOUR.replace('0x', '0x'+DisplayTheme.hoverOpacity));
	
	g.setColour(Colours.grey);
	g.fillRoundedRectangle(pa, 5);
	
});

const BUTTON_BORDER_RADIUS = 4;
const BUTTON_BORDER_SIZE = 2;

laf.registerFunction('drawToggleButton', function(g, obj) {	
	var a = obj.area;
	
	if (obj.text.indexOf('displayButton-') != -1) {
		obj.text = obj.text.replace('displayButton-');
		
		var BUTTON_SELECTED_BACKGROUND_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
		var BUTTON_BACKGROUND_COLOUR = DisplayTheme.buttonBackgroundColour;
		var BUTTON_TEXT_COLOUR = DisplayTheme.buttonSelectedTextColour;
		
		if (obj.over) {
			BUTTON_SELECTED_BACKGROUND_COLOUR = BUTTON_SELECTED_BACKGROUND_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
			BUTTON_TEXT_COLOUR = BUTTON_TEXT_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		// background layer
		g.setColour(BUTTON_SELECTED_BACKGROUND_COLOUR);
		g.fillRoundedRectangle(a, BUTTON_BORDER_RADIUS);
				
		if (!obj.value) {
			var pa = [
				a[0] + BUTTON_BORDER_SIZE,
				a[1] + BUTTON_BORDER_SIZE,
				a[2] - BUTTON_BORDER_SIZE * 2,
				a[3] - BUTTON_BORDER_SIZE * 2
			];
			g.setColour(BUTTON_BACKGROUND_COLOUR);
			g.fillRoundedRectangle(pa, BUTTON_BORDER_RADIUS);	
			g.setColour(BUTTON_SELECTED_BACKGROUND_COLOUR);
		} else {
			g.setColour(BUTTON_BACKGROUND_COLOUR);
		}
				
		g.setFont(Fonts.secondaryFont, 19.0);
		g.drawAlignedText(obj.text, a, 'centred');
		return;
	}
	
	if (obj.text.indexOf('displayIcon') != -1) {
		obj.text = obj.text.replace('displayIcon-');
		
		var SELECTED_ICON_COLOUR = DisplayTheme.selectedIconColour;
		var ICON_COLOUR = DisplayTheme.iconColour;
		
		if (obj.over) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		obj.value == 1 ?
			g.setColour(SELECTED_ICON_COLOUR) :
			g.setColour(ICON_COLOUR);
		
		if (obj.text.indexOf('outline-') != -1) {
			obj.text = obj.text.replace('outline-');
			g.drawPath(Paths.icons[obj.text], a, 3);
		} else {
			g.fillPath(Paths.icons[obj.text], a);
		}
		return;
	}
	
	if (obj.text.indexOf('icon-') != -1) {
		obj.text = obj.text.replace('icon-');
		
		var SELECTED_ICON_COLOUR = PanelTheme.selectedIconColour;
		var ICON_COLOUR = PanelTheme.iconColour;
		
		if (obj.over == 1) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
		}
		
		obj.value == 1 ?
			g.setColour(SELECTED_ICON_COLOUR) :
			g.setColour(ICON_COLOUR);
		
		g.fillPath(Paths.icons[obj.text], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
		return;
	}
	
	if (obj.text.indexOf('switch') != -1) {
		var switchPadding = 10;
		var switchBorder = 3;
		
		var SWITCH_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
		
		if (obj.over) {
			SWITCH_COLOUR = SWITCH_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		g.setColour(SWITCH_COLOUR);
		g.drawRect(a, switchBorder);
		g.setFont(Fonts.secondaryFont, 18.0);
		
		if (!obj.value) {
			g.fillRect([
				a[2] / 2,
				switchPadding,
				a[2] / 2 - switchPadding,
				a[3] - switchPadding * 2
			]);		
			g.drawAlignedText('ON', [0, 0, a[2] / 2, a[3]], 'centred');
		} else {	
			g.fillRect([
				switchPadding,
				switchPadding,
				a[2] / 2 - switchPadding,
				a[3] - switchPadding * 2
			]);
			g.drawAlignedText('OFF', [a[2] / 2, 0, a[2] / 2, a[3]], 'centred');
		}
	}
});

const asyncButtonLaf = Content.createLocalLookAndFeel();
asyncButtonLaf.registerFunction('drawToggleButton', function(g, obj) {
	var a = obj.area;
	
	obj.text = obj.text.replace('displayButton-');
	
	var BUTTON_SELECTED_BACKGROUND_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
	var BUTTON_BACKGROUND_COLOUR = DisplayTheme.buttonBackgroundColour;
	var BUTTON_TEXT_COLOUR = DisplayTheme.buttonSelectedTextColour;
	
	var LOADING_INDICATOR_LENGTH = 30;
	var LOADING_INDICATOR_THICKNESS = 5;
	
	if (obj.over) {
		BUTTON_SELECTED_BACKGROUND_COLOUR = BUTTON_SELECTED_BACKGROUND_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		BUTTON_TEXT_COLOUR = BUTTON_TEXT_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(BUTTON_SELECTED_BACKGROUND_COLOUR);
	g.fillRoundedRectangle(a, 2);	

	g.setColour(BUTTON_TEXT_COLOUR);
	g.setFont(Fonts.secondaryFont, 19.0);
	g.drawAlignedText(obj.text, a, 'centred');
});
button_active.setLocalLookAndFeel(asyncButtonLaf);

// Preset Browser Button
const presetBrowserButtonLAF = Content.createLocalLookAndFeel();
presetBrowserButtonLAF.registerFunction('drawToggleButton', function(g, obj) {
	
	var a = obj.area;
	var TEXT_COLOUR = HeaderTheme.textColour;
	var SELECTED_TEXT_COLOUR = HeaderTheme.selectedTextColour;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
		SELECTED_TEXT_COLOUR = SELECTED_TEXT_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
	}
	
	obj.value ?
		g.setColour(SELECTED_TEXT_COLOUR) :
		g.setColour(TEXT_COLOUR);
	
	g.setFont(Fonts.mainFont, 16);
	g.drawAlignedText(obj.text, a, 'left');
});
presetBrowserButton.setLocalLookAndFeel(presetBrowserButtonLAF);

// HEADER BUTTONS
const headerButtonsLAF = Content.createLocalLookAndFeel();
headerButtonsLAF.registerFunction('drawToggleButton', function(g, obj){
	var a = obj.area;

	var SELECTED_ICON_COLOUR = HeaderTheme.selectedIconColour;
	var ICON_COLOUR = HeaderTheme.iconColour;
	
	if (obj.over == 1) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
	}
	
	obj.value == 1 ?
		g.setColour(SELECTED_ICON_COLOUR) :
		g.setColour(ICON_COLOUR);
	
	g.fillPath(Paths.icons[obj.text], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
	return;
});

button_preset_rightArrow.setLocalLookAndFeel(headerButtonsLAF);
button_preset_leftArrow.setLocalLookAndFeel(headerButtonsLAF);
logoButton.setLocalLookAndFeel(headerButtonsLAF);

// Title Button
const headerTitleLAF = Content.createLocalLookAndFeel();
headerTitleLAF.registerFunction('drawToggleButton', function(g, obj){
	var a = obj.area;
	var TEXT_COLOUR = HeaderTheme.textColour;
	var SELECTED_TEXT_COLOUR = HeaderTheme.selectedTextColour;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
		SELECTED_TEXT_COLOUR = SELECTED_TEXT_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
	}
	
	obj.value ?
		g.setColour(SELECTED_TEXT_COLOUR) :
		g.setColour(TEXT_COLOUR);
	
	g.setFont(Fonts.mainFont, 36);
	g.drawAlignedText(obj.text, a, 'left');
});
button_title.setLocalLookAndFeel(headerTitleLAF);

// NOT ACTIVATED BUTTON
const notActivatedLAF = Content.createLocalLookAndFeel();
notActivatedLAF.registerFunction('drawToggleButton', function(g, obj){
	var a = obj.area;
	var TEXT_COLOUR = DisplayTheme.notActivatedColour;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(TEXT_COLOUR);
	
	g.setFont(Fonts.secondaryFont, 23.0);
	g.drawAlignedText(obj.text, a, 'left');
});

button_not_activated.setLocalLookAndFeel(notActivatedLAF);


// KNOBS LOOK AND FEEL
// GENERAL
const DISABLED_OPACITY = 'CC';

// ARC
const ARC_THICKNESS = 2;
const ARC_PADDING = 10;

// INDICATOR
const INDICATOR_THICKNESS = 5;
const INDICATOR_LENGTH = 15;
const INDICATOR_BORDER_RADIUS = 2;
const INDICATOR_GAP = 8;

// MAIN BODY

const BORDER = 2 ;

// SHADOW
const SHADOW_RADIUS = 10;
const SHADOW_OFFSET = [0, 2];
const SHADOW_PADDING = 5;

// EXTRA RING
const GLOW_RING_SIZE = 3;
const GLOW_AMOUNT = 3;

laf.registerFunction("drawRotarySlider", function(g, obj){
	
	// Padding
	var PADDING = 6;
	
	// Colours
	var ARC_COLOUR = SliderTheme.arcColour;
	var INDICATOR_COLOUR = SliderTheme.indicatorColour;
	var UPPER_GRADIENT = SliderTheme.upperGradientColour;
	var LOWER_GRADIENT = SliderTheme.lowerGradientColour;
	var BORDER_COLOUR = SliderTheme.borderColour;
	var SHADOW_COLOUR = SliderTheme.shadowColour;
	var RED_COLOUR = SliderTheme.redColour;
	var BLUE_COLOUR = SliderTheme.blueColour;
	
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
		PADDING = 13;
	}
	
	var a = obj.area;
	var ka = [
		PADDING,
		PADDING,
		a[2] - PADDING * 2,
		a[3] - PADDING * 2
	];
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
			g.setColour(PanelTheme.borderColour);
			g.fillRoundedRectangle(a, PANEL_BORDER_RADIUS);
			
			g.setGradientFill([
				PanelTheme.upperGradientColour, 0.0, 0.0,
				PanelTheme.lowerGradientColour, 0.5, 100.0]
			);
			g.fillRoundedRectangle([
				a[0] + PANEL_BORDER,
				a[1] + PANEL_BORDER,
				a[2] - PANEL_BORDER * 2,
				a[3] - PANEL_BORDER * 2
			], PANEL_BORDER_RADIUS);
			
			g.addNoise({
				alpha: 0.05,
				monochromatic: false,
				scaleFactor: 1.7,
				area: a
			});
		});
	}
}

function themeMainPanel() {
	panel_background.setPaintRoutine(function(g) {
		var a = [0, 0, this.getWidth(), this.getHeight()];
		g.setGradientFill([
			PanelTheme.mainUpperGradientColour, 0.0, 0.0,
			PanelTheme.mainLowerGradientColour, 0.5, 100.0]
		);
		g.fillRoundedRectangle(a, PANEL_BORDER_RADIUS);
		g.addNoise({
			alpha: 0.02,
			monochromatic: true,
			scaleFactor: 1.2,
			area: a
		});
	});
}
themeMainPanel();
themePanels();

// override preset browser search bar to hide it
laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj){});

laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
{
	
	var TOP_PADDING = 10;
	var PADDING = 10;
	var a = obj.area;
	
	var pa = [a[0] - PADDING, a[1] - PADDING, a[2] + PADDING * 2, a[3] + PADDING * 2];
	
	obj.labelArea = [obj.labelArea[0], obj.labelArea[1], obj.labelArea[2], obj.labelArea[3] + 20];
	
   g.setColour(Colours.black);
   g.fillRoundedRectangle(pa, 5.0);
   g.setColour(Colours.white);
   g.drawRoundedRectangle(pa, 5, 2);
   g.setFont(Fonts.secondaryFont, 28.0);
   obj.text = obj.text.replace('Are you sure you want to replace the file', 'Replace');
   obj.text = obj.text.replace('Are you sure you want to delete the file ?', 'Delete Preset?');
   g.drawAlignedText(obj.text, [pa[0], pa[1] + PADDING, pa[2], pa[3]], "centredTop");
    
});

laf.registerFunction("drawDialogButton", function(g, obj){	

	var WIDTH = 12;
	var PADDING = 5;
	var a = obj.area;
	var pa = [
		(a[2] / 2 - WIDTH / 2) + PADDING,
		(a[3] / 2 - WIDTH / 2) ,
		WIDTH,
		a[3] - PADDING * 2
	];
	var ICON_COLOUR = DisplayTheme.iconColour;	
	
	if (obj.over) {
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(ICON_COLOUR);
	
	if (obj.text == 'More') {
		g.drawPath(Paths.icons['menu'], pa, 2);
		return;
	}
	
	if (obj.text == 'Add') {
		g.drawPath(Paths.icons['add'], pa, 2);
		return;
	}
	
	if (obj.text == 'Rename') {
		g.fillPath(Paths.icons['edit'], pa);
		return;
	}
	
	if (obj.text == 'Delete') {
		g.drawPath(Paths.icons['delete'], pa, 2);
		return;
	}
	
	if (obj.text == 'Save Preset') {
		g.drawPath(Paths.icons['save'], [a[0], pa[1], 14, pa[3]], 2);
		g.setFont(Fonts.secondaryFont, 19.0);
		g.drawAlignedText('SAVE', [30, a[1], a[2], a[3]], 'left');
		return;
	}
	g.setColour(ICON_COLOUR);
	g.drawRoundedRectangle(a, 4, 2);
	if (obj.over) {
		g.fillRoundedRectangle(a, 4);
		g.setColour(Colours.black);
	}
	
	g.setFont(Fonts.secondaryFont, 30.0);
	g.drawAlignedText(obj.text, a, 'centred');
});

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
   
   	g.setFont(Fonts.secondaryFont, 18.0);
    g.drawAlignedText(obj.text, [5, a[1], a[2], a[3]], "left");
});

const popMenuLaf = Content.createLocalLookAndFeel();

popMenuLaf.registerFunction("drawPopupMenuItem", function(g, obj)
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
    
    g.setFont(Fonts.secondaryFont, 23.0);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

popMenuLaf.registerFunction("drawComboBox", function(g, obj)
{
    var a = obj.area;

    g.setColour(obj.bgColour);
    g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], 2.0);
    g.setColour(Colours.withAlpha(obj.textColour, (obj.enabled && obj.active) ? 1.0 : 0.2));
    g.setFont(Fonts.secondaryFont, 26.0);
   
    g.drawAlignedText(obj.text, [a[0] + 30, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
});

popMenuLaf.registerFunction("getIdealPopupMenuItemSize", function(obj) { return 36; });

comboBox_zoom.setLocalLookAndFeel(popMenuLaf);
comboBox_theme.setLocalLookAndFeel(popMenuLaf);
