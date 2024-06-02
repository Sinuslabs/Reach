// Icons
const var icon_panel_logo = Content.getComponent("icon_panel_logo");
//const var icon_panel_heart = Content.getComponent("icon_panel_heart");


icon_panel_logo.setPaintRoutine(function(g) {
	g.setColour('0xffffff');
	g.fillPath(Paths.icons['fullLogo'], [0, 0, 131, 17]);
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

const BUTTON_BORDER_RADIUS = 1.5;
const BUTTON_BORDER_SIZE = 1.5;

const var LAF_displayButton = Content.createLocalLookAndFeel();

LAF_displayButton.registerFunction('drawToggleButton', function(g, obj) {	
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
			g.setColour(ICON_COLOUR) :
			g.setColour(SELECTED_ICON_COLOUR);
		
		g.fillPath(Paths.icons[obj.text], [this.getHeight / 2, this.getWidth / 2, parseInt(a[2]), parseInt(a[3])]);
		return;
	}
	
	if (obj.text.indexOf('switch') != -1) {
		var switchPadding = 5;
		var switchBorder = 1;
		var border_radius = 1;
		
		var SWITCH_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
		
		if (obj.over) {
			SWITCH_COLOUR = SWITCH_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
		}
		
		var innerArea = [
			a[0] + switchPadding,
			a[1] + switchPadding,
			a[2] - switchPadding * 2,
			a[3] - switchPadding * 2
		];
		
		g.setColour(SWITCH_COLOUR);
		g.drawRoundedRectangle(a, switchBorder, border_radius);
		g.setFont(Fonts.secondaryFont, 18.0);
		
		if (!obj.value) {
			g.fillRoundedRectangle(innerArea, border_radius);		
		} else {	
			g.drawRoundedRectangle(innerArea, border_radius, switchBorder);
		}
	}
});

const var LAF_displayIcon = Content.createLocalLookAndFeel();
LAF_displayIcon.registerFunction('drawToggleButton', displayIcon_LAF);

inline function displayIcon_LAF(g, obj) {
	
	local a = obj.area;
	local padding = 10;
	
	local pa = [
		a[0] + padding,
		a[1] + padding,
		a[2] - padding * 2,
		a[3] - padding * 2
	];
	
	local SELECTED_ICON_COLOUR = DisplayTheme.selectedIconColour;
	
	if (obj.over == 1) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
	}
	
	g.setColour(SELECTED_ICON_COLOUR);
	
	g.drawPath(Paths.icons.x, pa, 2);
}

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
	g.fillRoundedRectangle(a, BUTTON_BORDER_RADIUS);	

	g.setColour(BUTTON_TEXT_COLOUR);
	g.setFont(Fonts.secondaryFont, 19.0);
	g.drawAlignedText(obj.text, a, 'centred');
});


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
		
	g.setFont(Fonts.secondaryFont, 22);
	g.drawAlignedText(obj.text, [a[0] + 5, a[1], a[2], a[3]], 'left');
});


// HEADER BUTTONS
const headerButtonsLAF = Content.createLocalLookAndFeel();
headerButtonsLAF.registerFunction('drawToggleButton', function(g, obj){
	
	var SIZE = 10;
	
	if (obj.text === 'logo') {
		SIZE = 30;
	}

	var a = obj.area;
	var pa = [	
		a[2] / 2 - SIZE / 2, 
		a[3] / 2 - SIZE / 2,
		SIZE,
		SIZE
	];

	var SELECTED_ICON_COLOUR = HeaderTheme.selectedIconColour;
	var ICON_COLOUR = HeaderTheme.iconColour;
	
	if (obj.over == 1) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + HeaderTheme.hoverOpacity);
	}
	
	obj.value == 1 ?
		g.setColour(SELECTED_ICON_COLOUR) :
		g.setColour(ICON_COLOUR);
	
	g.fillPath(Paths.icons[obj.text], pa);
});


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
	
	//g.setFont(Fonts.secondaryFont, 48);
	//g.drawAlignedText(obj.text, a, 'left');
	
	g.fillPath(Paths.icons.reachLogo, a);
});

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



// KNOBS LOOK AND FEEL
// GENERAL
const DISABLED_OPACITY = 'CC';

// ARC
const ARC_THICKNESS = 2;
const ARC_PADDING = 0;

// SOCKEL
const SOCKEL_PADDING = 3.5;

// INDICATOR
const INDICATOR_THICKNESS = 6;
const INDICATOR_LENGTH = 9;
const INDICATOR_BORDER_RADIUS = 2;
const INDICATOR_GAP = 5;

// MAIN BODY
const BORDER = 2 ;

// SHADOW
const SHADOW_RADIUS = 5;
const SHADOW_OFFSET = [0, 4];
const SHADOW_PADDING = 5;

// EXTRA RING
const GLOW_RING_SIZE = 3;
const GLOW_AMOUNT = 3;

const var knb_laf = Content.createLocalLookAndFeel();

knb_laf.registerFunction("drawRotarySlider", function(g, obj){
	
	// Padding
	var PADDING = 8;
	
	// Colours
	var ARC_COLOUR = SliderTheme.arcColour;
	var INDICATOR_COLOUR = SliderTheme.indicatorColour;
	var UPPER_GRADIENT = SliderTheme.upperGradientColour;
	var LOWER_GRADIENT = SliderTheme.lowerGradientColour;
	var BORDER_COLOUR = SliderTheme.borderColour;
	var TEXT_COLOUR = SliderTheme.textColour;
	var SHADOW_COLOUR = SliderTheme.shadowColour;
	var RED_COLOUR = SliderTheme.redColour;
	var BLUE_COLOUR = SliderTheme.blueColour;
	
	var text = obj.text;
	
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
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
	}
	
	if (obj.text == 'red' || obj.text == 'blue') {
		PADDING = 13;
	}
	
	var a = obj.area;
	
	var sockelA = [
		SOCKEL_PADDING,
		SOCKEL_PADDING,
		a[2] - SOCKEL_PADDING * 2,
		a[2] - SOCKEL_PADDING * 2
	];
	
	var ka = [
		PADDING,
		PADDING,
		a[2] - PADDING * 2,
		a[2] - PADDING * 2
	];
	
	var sa = [
		PADDING + SHADOW_PADDING,
		PADDING + SHADOW_PADDING,
		a[2] - (PADDING + SHADOW_PADDING) * 2,
		a[2] - (PADDING + SHADOW_PADDING) * 2
	];
	
	if (obj.clicked || obj.hover) {
		
		text = obj.valueAsText;
		if (obj.text === 'TIME') {
			if (obj.value >= 1) {
				text = text.replace(' ms', ' s');
				
			}
			if (obj.value < 1) {
				text = text.replace('0.', '');
			}
		}
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
	
	g.setGradientFill([
		UPPER_GRADIENT, 0.0, 0.0,
		LOWER_GRADIENT, 0.5, 100.0]
	);
	
	var ringColour = EffectCustomizer.getEffectColour(obj.text);
	if (isDefined(ringColour)) {
		g.setColour(ringColour);
		if (!obj.enabled) {
			g.setGradientFill([
				UPPER_GRADIENT, 0.0, 0.0,
				LOWER_GRADIENT, 0.5, 100.0]
			);
		}
	}
	
	// FIX REVERB TITLE 
	if (text == 'Reverb MIX') {
		text = 'MIX';
	}
	
	g.fillEllipse(sockelA);
	
	// SHADOW PATH
	var shadowPath = Content.createPath();
	shadowPath.addArc([0.0, 0.0, 1.0, 1.0], 0, Math.PI * 2);
	if (!disabled ) {
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
	
	g.setColour(TEXT_COLOUR);
	g.setFont(Fonts.mainFont, 15);
	g.drawAlignedText(text.toUpperCase(), [a[0], ka[1] + ka[3] * 0.9, a[2], ka[3]], 'centred');
	
	g.setColour(ARC_COLOUR);	
	

	if (obj.text == 'Reverb MIX') {
		g.setColour(ringColour);
	}
	
	g.drawPath(arcPath, pathArea, stableSize * arcThickness );
	
	g.rotate(end, [a[2] / 2, a[2] / 2]);
	g.setColour(INDICATOR_COLOUR);
	g.fillRoundedRectangle([
		a[2] / 2 - INDICATOR_THICKNESS / 2,
		PADDING + INDICATOR_GAP,
		(a[2] / 100) * INDICATOR_THICKNESS,
	 	(a[2] / 100) * INDICATOR_LENGTH],
	 	INDICATOR_BORDER_RADIUS
	);
});

const var mixLAF = Content.createLocalLookAndFeel();
mixLAF.registerFunction('drawRotarySlider', mixKnobLAF);

inline function mixKnobLAF(g, obj) {
	// Padding
	local PADDING = 8;
	local ARC_PADDING = 15;
	local ARC_THICKNESS = 3;
		
	// Colours
	local ARC_COLOUR = SliderTheme.arcColour;
	local INDICATOR_COLOUR = SliderTheme.indicatorColour;
	local UPPER_GRADIENT = SliderTheme.upperGradientColour;
	local LOWER_GRADIENT = SliderTheme.lowerGradientColour;
	local BORDER_COLOUR = SliderTheme.borderColour;
	local TEXT_COLOUR = SliderTheme.textColour;
	local SHADOW_COLOUR = SliderTheme.shadowColour;
	
	local disabled = !obj.enabled;
	
	if (disabled) {
		// Special case for the ARC Colour since its black transparency is not doing much
		ARC_COLOUR = ARC_COLOUR.replace('0x', '0x66');
		INDICATOR_COLOUR = INDICATOR_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		UPPER_GRADIENT = UPPER_GRADIENT.replace('0x', '0x' + DISABLED_OPACITY);
		LOWER_GRADIENT = LOWER_GRADIENT.replace('0x', '0x' + DISABLED_OPACITY);
		BORDER_COLOUR = BORDER_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		SHADOW_COLOUR = SHADOW_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + DISABLED_OPACITY);
	}
	
	local text = obj.valueAsText;
	
	local a = obj.area;
	
	local sockelA = [
		SOCKEL_PADDING,
		SOCKEL_PADDING,
		a[2] - SOCKEL_PADDING * 2,
		a[2] - SOCKEL_PADDING * 2
	];
	
	local ka = [
		PADDING,
		PADDING,
		a[2] - PADDING * 2,
		a[2] - PADDING * 2
	];
	
	local sa = [
		PADDING + SHADOW_PADDING,
		PADDING + SHADOW_PADDING,
		a[2] - (PADDING + SHADOW_PADDING) * 2,
		a[2] - (PADDING + SHADOW_PADDING) * 2
	];
	
	g.setGradientFill([
		UPPER_GRADIENT, 0.0, 0.0,
		LOWER_GRADIENT, 0.5, 100.0]
	);
	
	g.fillEllipse(sockelA);
	
	// SHADOW PATH
	local shadowPath = Content.createPath();
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
	
	local arcPath = Content.createPath();
	
	local start = 2.5;
	local end = start * 2 * obj.valueNormalized - start;
	
	local arcThickness = ARC_THICKNESS / 100;
	local arcWidth = (1.0 - 2.0 * arcThickness) + arcThickness;
	local stableSize = a[2];
	
	arcPath.addArc(
		[arcThickness / 2, arcThickness / 2,arcWidth , arcWidth],
		-start,
		end
	 );
	
	local pathArea = arcPath.getBounds(a[2] - ARC_PADDING);
	pathArea = [
		pathArea[0] + ARC_PADDING / 2,
		pathArea[1] + ARC_PADDING / 2,
		pathArea[2],
		pathArea[3]
	];
	
	g.setColour(TEXT_COLOUR);
	g.setFont(Fonts.secondaryFont, 25);
	g.drawAlignedText(text, ka, 'centred');
	
	g.setFont(Fonts.mainFont, 15);
	g.drawAlignedText('MIX', [a[0], ka[1] + ka[3] * 0.7, a[2], ka[3]], 'centred');
	
	g.setColour(ARC_COLOUR);	
	g.drawPath(arcPath, pathArea, stableSize * arcThickness );
}

// CUSTOM KNOBS
const var barKnobLAF = Content.createLocalLookAndFeel();
barKnobLAF.registerFunction('drawRotarySlider', barKnobGraphics);

inline function barKnobGraphics(g, obj) {
	
	local GAP = 5;
	local disabled = !obj.enabled;
	local BAR_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
	local text = obj.text;
	local value = obj.value;
	local a = obj.area;
	local pa = [
		a[0] + PADDING,
		a[1] + PADDING,
		a[2] - PADDING * 2,
		a[3] - PADDING * 2,
	];
	local upperA = [pa[0], pa[1], pa[2], pa[3] / 1.7];
	local lowerA = [0, a[3] / 2 + GAP, a[2], a[3] / 2 - GAP];

	local statusBarArea = [0, upperA[3] * (1 - obj.valueNormalized), upperA[2], upperA[3]  - upperA[3] * (1 - obj.valueNormalized)];
	
	if (obj.clicked || obj.hover) { text = obj.valueAsText; }
	
	if (disabled) {
		BAR_COLOUR = BAR_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	g.setColour(BAR_COLOUR);	
	g.drawRoundedRectangle(upperA, 2, 1);
	g.fillRoundedRectangle(statusBarArea, 1);
	g.setFont(Fonts.secondaryFont, 14);
	g.drawAlignedText(text.toUpperCase(), lowerA, 'centred');
}


const var freqKnobLAF = Content.createLocalLookAndFeel();
freqKnobLAF.registerFunction('drawRotarySlider', freqKnobGraphics);

inline function freqKnobGraphics(g, obj) {
	
	local GAP = 2;
	local text = obj.text;
	local value = obj.value;
	local valueText;
	local disabled = !obj.enabled;

	local BAR_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;	
	
	local a = obj.area;
	local upperA = [a[0], a[1], a[2], a[3] / 2];
	local lowerA = [0, a[3] / 2 + GAP, a[2], a[3] / 2 - GAP];
	
	if (disabled) {
		BAR_COLOUR = BAR_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	if (obj.value > 1000) {
		valueText = Engine.doubleToString(obj.value / 1000, 1) + 'khz';
	} else {
		valueText = Engine.doubleToString(obj.value, 0) + 'Hz';
	}
	
	g.setColour(BAR_COLOUR);
	g.setFont(Fonts.secondaryFont, 20);
	g.drawAlignedText(valueText, upperA, 'centred');
}

//Reverb.displayKnob_reverb_lowcrossover.setLocalLookAndFeel(freqKnobLAF);
//Reverb.displayKnob_reverb_highcrossover.setLocalLookAndFeel(freqKnobLAF);

// Themeable Panels
const var themeablePanels = Content.getAllComponents('themeablePanel');
const PANEL_BORDER = 0;
const PANEL_BORDER_RADIUS = 4;

// Main Panels
function themePanels() {
	for (panel in themeablePanels) {
		panel.setPaintRoutine(function(g)
		{
			var a = [0, 0, this.getWidth(), this.getHeight()];
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



// override preset browser search bar to hide it
laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj){});

laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
{
	
	var TOP_PADDING = 5;
	var PADDING = 5;
	var a = obj.area;
	
	var pa = [a[0] - PADDING, a[1] - PADDING, a[2] + PADDING * 2, a[3] + PADDING * 3];
	
	obj.labelArea = [obj.labelArea[0], obj.labelArea[1], obj.labelArea[2], obj.labelArea[3] + 20];
	
   g.setColour(Theme.DisplayTheme.buttonSelectedTextColour);
   g.fillRoundedRectangle(pa, 5.0);
   g.setColour(Theme.DisplayTheme.buttonSelectedBackgroundColour);
   g.drawRoundedRectangle(pa, 5, 2);
   g.setFont(Fonts.secondaryFont, 28.0);
   obj.text = obj.text.replace('Are you sure you want to replace the file', 'Replace');
   obj.text = obj.text.replace('Are you sure you want to delete the file ?', 'Delete Preset?');
   g.drawAlignedText(obj.text, [pa[0], pa[1] + PADDING + TOP_PADDING, pa[2], pa[3]], "centredTop");
    
});

laf.registerFunction("drawDialogButton", function(g, obj){	

	var WIDTH = 17;
	var PADDING = 1;
	var a = obj.area;
	var pa = [
		(a[2] / 2 - WIDTH / 2) + PADDING,
		(a[3] / 2 - WIDTH / 2) ,
		WIDTH,
		a[3] - PADDING * 2
	];
	
	var SAVE_PADDING = 1;
	
	var save_area = [
		a[0] + SAVE_PADDING,
		a[1] + SAVE_PADDING,
		80,
		a[3] - SAVE_PADDING * 2
	];
	
	var dialogButtonPadding = 1;
	var dialogButtonPadding = [
		a[0] + dialogButtonPadding,
		a[1] + dialogButtonPadding,
		a[2] - dialogButtonPadding * 2,
		a[3] - dialogButtonPadding * 2
	];
	
	var ICON_COLOUR = DisplayTheme.iconColour;	
	
	if (obj.over) {
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(ICON_COLOUR);
	
	if (obj.text == 'OK' || obj.text == 'Cancel') {
		if (obj.over) {
			g.setColour(Colours.withAlpha(DisplayTheme.buttonSelectedBackgroundColour, 0.75));
		} else {
			g.setColour(DisplayTheme.buttonSelectedBackgroundColour);	
		}
		g.drawRoundedRectangle(dialogButtonPadding, 4, 2);
		g.drawAlignedText(obj.text, a, 'centred');
		
		return;
	}
	
	
	if (obj.text == 'More') {
		g.drawPath(Paths.icons['menu'], pa, 2);
		return;
	}
	
	if (obj.text == 'Save Preset') {
		g.setFont(Fonts.mainFontRegular, 20.0);
		g.drawRoundedRectangle(save_area, 2, 1 );
		g.drawAlignedText('SAVE', [ 20 + a[0], a[1], 120, a[3]], 'left');
		return;
	}
	
	g.setFont(Fonts.mainFontRegular, 14);
	g.drawAlignedText(obj.text, a, 'centred');
	
});

laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
{
	var a = obj.area;
	var padding = 2;
	a = [
		a[0] + padding,
		a[1] + padding,
		a[2] - padding * 2,
		a[3] - padding * 2
	];

    if(obj.selected)
    {
        g.setColour(Theme.DisplayTheme.buttonSelectedBackgroundColour);
       	g.fillRoundedRectangle(a, 3);
        g.setColour(Theme.DisplayTheme.buttonSelectedTextColour);
    } else {
	    
       	g.setColour(Colours.withAlpha(obj.textColour, 0.75));	    
    
	    if (obj.hover) {
			g.drawRoundedRectangle(a, 3, 1);
	    }
	    
    }
   
   	g.setFont(Fonts.mainFontRegular, 22.0);
    g.drawAlignedText(obj.text, [15, a[1], a[2], a[3]], "left");
});

const popMenuLaf = Content.createLocalLookAndFeel();

popMenuLaf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isTicked)
    {
        g.setColour(Colours.white);
        g.setColour(0x22FFFFFF);
        g.fillRoundedRectangle(a, 1);
    }
    
    if(obj.isHighlighted)
    {
        g.setColour(0x22FFFFFF);
        g.fillRect(obj.area);
    }
    
    g.setFont(Fonts.secondaryFont, 18.0);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + 5, a[1], a[2] - h, a[3]], "left");
});

popMenuLaf.registerFunction("drawComboBox", function(g, obj)
{
    var a = obj.area;
	var padding = 2;
	a = [
		a[0] + padding,
		a[1] + padding,
		a[2] - padding * 2,
		a[3] - padding * 2
	];
	
    g.setColour(obj.bgColour);
    
    if (obj.hover) {
	    g.setColour(DisplayTheme.textColour);
    }
    
    g.drawRoundedRectangle([a[0], a[1], a[2], a[3]], 0.5, 2);
    g.setColour(Colours.withAlpha(obj.textColour, (obj.enabled && obj.active) ? 1.0 : 0.2));
    g.setFont(Fonts.secondaryFont, 20.0);
   
    g.drawAlignedText(obj.text, [a[0] + 5, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
});

popMenuLaf.registerFunction("getIdealPopupMenuItemSize", function(obj) { return 36; });


const var floatingLock_panel = Content.getComponent("floatingLock_panel");
floatingLock_panel.setPaintRoutine(function(g) {
	
	// Colors
	var BORDER_COLOUR = SliderTheme.arcColour;
	var BACKGROUND_COLOUR = SliderTheme.lowerGradientColour;
	
	var PADDING = 1;
	var a = [ 0, 0, this.getWidth(), this.getHeight()];
	var paddingA = [
		PADDING,
		PADDING,
		this.getWidth() - PADDING * 2,
		this.getHeight() - PADDING * 2
	];
	g.setColour(BORDER_COLOUR);
	g.fillRoundedRectangle(a, 3);
	g.setColour(BACKGROUND_COLOUR);
	g.fillRoundedRectangle(paddingA, 2);
});

const var button_floatingLock = Content.getComponent("button_floatingLock");
const var floatButtonLAF = Content.createLocalLookAndFeel();
floatButtonLAF.registerFunction('drawToggleButton', floatButtonGraphics);

inline function floatButtonGraphics(g, obj) {
	
	local ICON_SIZE = 15;
	
	local a = obj.area; 
	local textArea = [
		this.getHeight / 2 + 20,
		this.getWidth / 2 + 3,
		100,
		15
	];
	
	local iconArea = [this.getHeight / 2 + 5, this.getWidth / 2 + 2, ICON_SIZE - 5, ICON_SIZE];
	local SELECTED_ICON_COLOUR = PanelTheme.selectedIconColour;
	
	obj.text = obj.text.replace('icon-');
	if (obj.over == 1) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
	}
	
	g.setColour(SELECTED_ICON_COLOUR);
	g.fillPath(Paths.icons[obj.text], iconArea);
	
	g.setFont(Fonts.secondaryFont, 14);
	g.drawAlignedText('LOCK PARAMETER', textArea, 'left');
}
	
button_floatingLock.setLocalLookAndFeel(floatButtonLAF);

// Menu Button

const var randomLAF = Content.createLocalLookAndFeel();

randomLAF.registerFunction('drawToggleButton', menuButton);

inline function menuButton(g, obj) {
	
	local a = obj.area; 
	
	local COLOUR = PanelTheme.selectedIconColour;
	
	if (obj.over == 1) {
		COLOUR = COLOUR.replace('0x', '0x' + PanelTheme.hoverOpacity);
	}
	
	g.setColour(COLOUR);
	g.setFont(Fonts.secondaryFont, 14);
	g.drawAlignedText(obj.text, a, 'left');

}

const var LAF_DisplayTextKnob = Content.createLocalLookAndFeel();	
LAF_DisplayTextKnob.registerFunction('drawRotarySlider', DisplayTextKnob_LAF);

inline function DisplayTextKnob_LAF(g, obj) {
	
	local a = obj.area;
	
	local SELECTED_COLOUR = DisplayTheme.selectedIconColour;
	local SELECTED_COLOUR_var = DisplayTheme.iconColour;
	
	local padding = 1;
	a = [
		a[0] + padding,
		a[1] + padding,
		a[2] - padding * 2,
		a[3] - padding * 2,
	];
	
	local upper_a = [
		a[0],
		a[1],
		a[2],
		a[3] * 0.6
	];
	
	local lower_a = [
		a[0],
		a[3] * 0.6,
		a[2],
		a[3] * 0.4
	];
	
	local valueText = obj.valueAsText;
	
	if (!obj.enabled) {
		SELECTED_COLOUR = SELECTED_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(SELECTED_COLOUR);
	if (obj.hover || obj.clicked) {
		
		g.setColour(SELECTED_COLOUR_var);
		g.drawRoundedRectangle(a, 2, 1);
		
		g.setColour(SELECTED_COLOUR);
	}
	
	if (obj.text === 'Low' || obj.text === 'High') {
		if (obj.value > 0) {
			valueText = '+' + valueText;
		}
	}
	
	g.setFont(Fonts.secondaryFont, 18);
	g.drawAlignedText(obj.text, lower_a, 'centred');
	
	g.setFont(Fonts.mainFont, 24);
	g.drawAlignedText(valueText, upper_a, 'centred');

}



// CUSTOM KNOBS
const var LAF_horizontalBar = Content.createLocalLookAndFeel();
LAF_horizontalBar.registerFunction('drawRotarySlider', horbarKnobGraphics);

inline function horbarKnobGraphics(g, obj) {
	
	local disabled = !obj.enabled;
	local BAR_COLOUR = DisplayTheme.buttonSelectedBackgroundColour;
	local text = obj.text;
	local a = obj.area;
	local PADDING = 2;
	a = StyleHelpers.addPadding(a, 2);
	local label_size = 65;
	local bar_top_bot_padding = 3;
	
	local left_a = [
		a[0],
		a[1],
		label_size,
		a[3]
	];
	
	local right_a = [
		label_size,
		a[1] + bar_top_bot_padding,
		a[2] - label_size,
		a[3] - bar_top_bot_padding * 2
	];

	local statusBarArea = [
		right_a[0],
		right_a[1],
		right_a[2] * (obj.valueNormalized),
		right_a[3]
	];
	
	if (obj.clicked || obj.hover) { text = obj.valueAsText; }
	
	if (disabled) {
		BAR_COLOUR = BAR_COLOUR.replace('0x', '0x' + DisplayTheme.hoverOpacity);
	}
	
	g.setColour(BAR_COLOUR);
	g.setFont(Fonts.secondaryFont, 14);
	g.drawAlignedText(text.toUpperCase(), left_a, 'left');

	if (obj.text === 'HIGH CUT') {
		g.fillRoundedRectangle(right_a, 1);
		g.setColour(Colours.black);
		g.fillRect(statusBarArea);

	} else {
		g.fillRect(statusBarArea);
	}
	g.setColour(BAR_COLOUR);
	g.drawRoundedRectangle(right_a, 1, 1);

	
	}


