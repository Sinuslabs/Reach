// Icons
const var icon_panel_freeze2 = Content.getComponent("icon_panel_freeze2");

const var icon_panel_logo = Content.getComponent("icon_panel_logo");
const var icon_panel_heart = Content.getComponent("icon_panel_heart");
const var icon_panel_fullLogo = Content.getComponent('icon_panel_fullLogo');

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

// LABELS
const var themeableLabels = Content.getAllComponents('themeAble_label');
function themeLabels() {
	for (label in themeableLabels) {
		label.setColour(3, THEME.PANEL.TEXT_COLOUR);
	}
}
themeLabels();

// Buttons
const laf = Engine.createGlobalScriptLookAndFeel();

laf.registerFunction('drawToggleButton', function(g, obj) {	
	var a = obj.area;
	
	if (obj.text.indexOf('displayButton-') != -1) {
		
		obj.text = obj.text.replace('displayButton-');
		
		var BUTTON_BACKGROUND_COLOUR = THEME.DISPLAY.BUTTON_SELECTED_BACKGROUND_COLOUR;
		var BUTTON_TEXT_COLOUR = THEME.DISPLAY.BUTTON_SELECTED_TEXT_COLOUR;
		
		if (obj.over) {
			BUTTON_BACKGROUND_COLOUR = BUTTON_BACKGROUND_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
			BUTTON_TEXT_COLOUR = BUTTON_TEXT_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
		}
		
		g.setColour(BUTTON_BACKGROUND_COLOUR);
		g.fillRect(a);
		
		g.setColour(BUTTON_TEXT_COLOUR);
		g.setFont(THEME.FONT.SECONDARY, 32.0);
		g.drawAlignedText(obj.text, a, 'centred');
		return;
	}
	
	if (obj.text.indexOf('displayIcon') != -1) {
		obj.text = obj.text.replace('displayIcon-');
		
		var SELECTED_ICON_COLOUR = THEME.DISPLAY.SELECTED_ICON_COLOUR;
		var ICON_COLOUR = THEME.DISPLAY.ICON_COLOUR;
		
		if (obj.over) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
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
	
	if (obj.text.indexOf('icon') != -1) {
		obj.text = obj.text.replace('icon-');
		
		var SELECTED_ICON_COLOUR = THEME.PANEL.SELECTED_ICON_COLOUR;
		var ICON_COLOUR = THEME.PANEL.ICON_COLOUR;
		
		if (obj.over == 1) {
			SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + THEME.PANEL.HOVER_OPACITY);
			ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + THEME.PANEL.HOVER_OPACITY);
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
		
		var SWITCH_COLOUR = THEME.DISPLAY.BUTTON_SELECTED_BACKGROUND_COLOUR;
		
		if (obj.over) {
			SWITCH_COLOUR = SWITCH_COLOUR.replace('0x', '0x'+THEME.DISPLAY.HOVER_OPACITY);
		}
		
		g.setColour(SWITCH_COLOUR);
		g.drawRect(a, switchBorder);
		g.setFont(THEME.FONT.SECONDARY, 26.0);
		
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

// Preset Browser Button
const presetBrowserButtonLAF = Content.createLocalLookAndFeel();
presetBrowserButtonLAF.registerFunction('drawToggleButton', function(g, obj) {
	
	var a = obj.area;
	var TEXT_COLOUR = THEME.HEADER.TEXT_COLOUR;
	var SELECTED_TEXT_COLOUR = THEME.HEADER.SELECTED_ICON_COLOUR;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
		SELECTED_TEXT_COLOUR = SELECTED_TEXT_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
	}
	
	obj.value ?
		g.setColour(SELECTED_TEXT_COLOUR) :
		g.setColour(TEXT_COLOUR);
	
	g.setFont(THEME.FONT.MAIN, 26);
	g.drawAlignedText(obj.text, a, 'left');
});
presetBrowserButton.setLocalLookAndFeel(presetBrowserButtonLAF);

// HEADER BUTTONS
const headerButtonsLAF = Content.createLocalLookAndFeel();
headerButtonsLAF.registerFunction('drawToggleButton', function(g, obj){
	var a = obj.area;

	var SELECTED_ICON_COLOUR = THEME.HEADER.SELECTED_ICON_COLOUR;
	var ICON_COLOUR = THEME.HEADER.ICON_COLOUR;
	
	if (obj.over == 1) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
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
	var TEXT_COLOUR = THEME.HEADER.TEXT_COLOUR;
	var SELECTED_TEXT_COLOUR = THEME.HEADER.SELECTED_ICON_COLOUR;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
		SELECTED_TEXT_COLOUR = SELECTED_TEXT_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
	}
	
	obj.value ?
		g.setColour(SELECTED_TEXT_COLOUR) :
		g.setColour(TEXT_COLOUR);
	
	g.setFont(THEME.FONT.MAIN, 60);
	g.drawAlignedText(obj.text, a, 'left');
});
button_title.setLocalLookAndFeel(headerTitleLAF);

// NOT ACTIVATED BUTTON
const notActivatedLAF = Content.createLocalLookAndFeel();
notActivatedLAF.registerFunction('drawToggleButton', function(g, obj){
	var a = obj.area;
	var TEXT_COLOUR = THEME.DISPLAY.NOT_ACTIVATED_COLOUR;
	
	if (obj.over) {
		TEXT_COLOUR = TEXT_COLOUR.replace('0x', '0x' + THEME.HEADER.HOVER_OPACITY);
	}
	
	g.setColour(TEXT_COLOUR);
	
	g.setFont(THEME.FONT.SECONDARY, 38);
	g.drawAlignedText(obj.text, a, 'left');
});

button_not_activated.setLocalLookAndFeel(notActivatedLAF);

// FILTER OUTLINE ICONS
const FILTER_BUTTON_PADDING = 5;
const FILTER_BUTTON_STROKE_WIDTH = 5;

const filterButtonLAF = Content.createLocalLookAndFeel();
filterButtonLAF.registerFunction('drawToggleButton', function(g, obj){
	
	var a = obj.area;
	var SELECTED_ICON_COLOUR = THEME.DISPLAY.SELECTED_ICON_COLOUR;
	var ICON_COLOUR = THEME.DISPLAY.ICON_COLOUR;
	
	if (obj.over) {
		SELECTED_ICON_COLOUR = SELECTED_ICON_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
	}
	
	a = [
		FILTER_BUTTON_PADDING,
		FILTER_BUTTON_PADDING,
		a[2] - FILTER_BUTTON_PADDING * 2,
		a[3] - FILTER_BUTTON_PADDING * 2
	];
	
	obj.value ?
		g.setColour(SELECTED_ICON_COLOUR) :
		g.setColour(ICON_COLOUR);
	
	g.drawPath(Paths.icons[obj.text], a, FILTER_BUTTON_STROKE_WIDTH);
});

for (filterButton in filterButtons) {
	filterButton.setLocalLookAndFeel(filterButtonLAF);
}

// SETTINGS SCREEN MENU BUTTON
const MENU_ITEM_HOVER_OPACITY = 'CC';
const MENU_ITEM_TEXT_ALIGN = 'left';
const MENU_ITEM_PADDING_LEFT = 30;

const menuButtonLAF = Content.createLocalLookAndFeel();
menuButtonLAF.registerFunction("drawToggleButton", function(g, obj) {
	var a = obj.area;
	obj.text = obj.text.replace('settings-');
	
	var MENU_ITEM_BACKGROUND_COLOUR = THEME.DISPLAY.BUTTON_BACKGROUND_COLOUR;
	var MENU_ITEM_SELECTED_BACKGROUND_COLOUR = THEME.DISPLAY.BUTTON_SELECTED_BACKGROUND_COLOUR;
	var MENU_ITEM_TEXT_COLOUR = THEME.DISPLAY.BUTTON_TEXT_COLOUR;
	var MENU_ITEM_SELECTED_TEXT_COLOUR = THEME.DISPLAY.BUTTON_SELECTED_TEXT_COLOUR;
	
	// HOVER
	if (obj.over) {
		MENU_ITEM_BACKGROUND_COLOUR = MENU_ITEM_BACKGROUND_COLOUR.replace('0x', '0x' + MENU_ITEM_HOVER_OPACITY);
		MENU_ITEM_SELECTED_BACKGROUND_COLOUR = MENU_ITEM_SELECTED_BACKGROUND_COLOUR.replace('0x', '0x' + MENU_ITEM_HOVER_OPACITY);
		MENU_ITEM_TEXT_COLOUR = MENU_ITEM_TEXT_COLOUR.replace('0x', '0x' + MENU_ITEM_HOVER_OPACITY);
		MENU_ITEM_SELECTED_TEXT_COLOUR = MENU_ITEM_SELECTED_TEXT_COLOUR.replace('0x', '0x' + MENU_ITEM_HOVER_OPACITY);
	}
	
	// SELECTED BACKGROUND
	obj.value == 1 ?
		g.setColour(MENU_ITEM_SELECTED_BACKGROUND_COLOUR)
		: g.setColour(MENU_ITEM_BACKGROUND_COLOUR);
	
	// Button Background
	g.fillRect(a);
	
	// TEXT
	obj.value == 1 ?
		g.setColour(MENU_ITEM_SELECTED_TEXT_COLOUR)
		: g.setColour(MENU_ITEM_TEXT_COLOUR);
	
	g.setFont(THEME.FONT.SECONDARY, 32.0);
	g.drawAlignedText(obj.text, [
		a[0] + MENU_ITEM_PADDING_LEFT,
		a[1],
		a[2],
		a[3]
	], MENU_ITEM_TEXT_ALIGN);
});

for (menuButton in settingsButtons) {
	menuButton.setLocalLookAndFeel(menuButtonLAF);
}

// PHYSICAL BUTTON
// GENERAL
const BUTTON_PHYSICAL_DISABLED_OPACITY = 'CC';
const BUTTON_PHYSICAL_HOVER_OPACITY = 'F5';
const BUTTON_PHYSICAL_BORDER = 2;
const BUTTON_PHYSICAL_SHADOW_RADIUS = 5;
const BUTTON_PHYSICAL_PADDING = 6;
const BUTTON_PHYSICAL_BORDER_RADIUS = 4;
const BUTTON_PHYSICAL_ICON_SIZE = 20;

const freezeButtonLAF = Content.createLocalLookAndFeel();
freezeButtonLAF.registerFunction("drawToggleButton", function(g, obj) {	

	var a = obj.area;
	var borderA = [
		BUTTON_PHYSICAL_PADDING,
		BUTTON_PHYSICAL_PADDING,
		a[2] - BUTTON_PHYSICAL_PADDING * 2,
		a[3] - BUTTON_PHYSICAL_PADDING * 2
	];
	
	var buttonA = [
		BUTTON_PHYSICAL_PADDING + BUTTON_PHYSICAL_BORDER,
		BUTTON_PHYSICAL_PADDING + BUTTON_PHYSICAL_BORDER,
		a[2] - (BUTTON_PHYSICAL_PADDING + BUTTON_PHYSICAL_BORDER) * 2,
		a[3] - (BUTTON_PHYSICAL_PADDING + BUTTON_PHYSICAL_BORDER) * 2
	];
	
	var UPPER_GRADIENT_COLOUR = THEME.BUTTON.PHYSICAL.UPPER_GRADIENT_COLOUR;
	var LOWER_GRADIENT_COLOUR = THEME.BUTTON.PHYSICAL.LOWER_GRADIENT_COLOUR;
	var BORDER_COLOUR = THEME.BUTTON.PHYSICAL.BORDER_COLOUR;
	var SHADOW_COLOUR = THEME.BUTTON.PHYSICAL.SHADOW_COLOUR;
	var ICON_COLOUR = THEME.BUTTON.PHYSICAL.ICON_COLOUR;
	var BACKGROUND_HOVER_COLOUR = THEME.BUTTON.PHYSICAL.BACKGROUND_HOVER_COLOUR;
	
	// Make transparent on disabled
	var disabled = !obj.enabled;
	if (disabled || obj.value) {
		UPPER_GRADIENT_COLOUR = UPPER_GRADIENT_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_DISABLED_OPACITY);
		LOWER_GRADIENT_COLOUR = LOWER_GRADIENT_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_DISABLED_OPACITY);
		BORDER_COLOUR = BORDER_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_DISABLED_OPACITY);
		SHADOW_COLOUR = SHADOW_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_DISABLED_OPACITY);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_DISABLED_OPACITY);
	}
	
	// Hover states
	if (obj.over) {
		UPPER_GRADIENT_COLOUR = UPPER_GRADIENT_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_HOVER_OPACITY);
		LOWER_GRADIENT_COLOUR = LOWER_GRADIENT_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_HOVER_OPACITY);
		BORDER_COLOUR = BORDER_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_HOVER_OPACITY);
		SHADOW_COLOUR = SHADOW_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_HOVER_OPACITY);
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + BUTTON_PHYSICAL_HOVER_OPACITY);
	}
	
	g.setColour(BORDER_COLOUR);
	g.fillRoundedRectangle(borderA, BUTTON_PHYSICAL_BORDER_RADIUS);
	
	if (!obj.value) {
		g.drawDropShadow(buttonA, SHADOW_COLOUR, BUTTON_PHYSICAL_SHADOW_RADIUS);
	}
	
	// Main Colour
	g.setGradientFill([
		UPPER_GRADIENT_COLOUR, 0.0, 0.0,
		LOWER_GRADIENT_COLOUR, 0.5, 100.0]
	);
	
	g.fillRoundedRectangle(buttonA, BUTTON_PHYSICAL_BORDER_RADIUS);

	g.setColour(ICON_COLOUR);
	
	var iconPosition = [ 30, 30, 40, 40 ];
	g.fillPath(Paths.icons[obj.text], iconPosition);
	
	g.addNoise({
		alpha: 0.05,
		monochromatic: false,
		scaleFactor: 1.7,
		area: a
	});
});

button_freeze.setLocalLookAndFeel(freezeButtonLAF);

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
			THEME.PANEL.MAIN_UPPER_GRADIENT_COLOUR, 0.0, 0.0,
			THEME.PANEL.MAIN_LOWER_GRADIENT_COLOUR, 0.5, 100.0]
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

laf.registerFunction("drawDialogButton", function(g, obj){
	
	var SIZE = 26;
	var PADDING = 5;
	var a = obj.area;
	var pa = [
		a[0] + PADDING,
		a[1] + PADDING,
		SIZE - PADDING,
		SIZE - PADDING
	];
	var ICON_COLOUR = THEME.DISPLAY.ICON_COLOUR;
	
	if (obj.over) {
		ICON_COLOUR = ICON_COLOUR.replace('0x', '0x' + THEME.DISPLAY.HOVER_OPACITY);
	}
	
	g.setColour(ICON_COLOUR);
	
	if (obj.text == 'Add') {
		g.drawPath(Paths.icons['add'], pa, 4);
		return;
	}
	
	if (obj.text == 'Rename') {
		g.fillPath(Paths.icons['edit'], pa);
		return;
	}
	
	if (obj.text == 'Delete') {
		g.drawPath(Paths.icons['delete'], pa, 3);
		return;
	}
	
	if (obj.text == 'Save Preset') {
		g.drawPath(Paths.icons['save'], pa, 3);
		g.drawAlignedText('SAVE', a, 'centred');
		return;
	}
	Console.print(obj.text);
	if (obj.text == 'More') {
		Console.print('drawIcon');
		g.drawAlignedText('MENU', a, 'centred');
		g.fillPath(Paths.icons['menu'], a);
	}
	
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
   
   	g.setFont(THEME.FONT.SECONDARY, 32.0);
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
    
    g.setFont(THEME.FONT.SECONDARY, 38.0);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

laf.registerFunction("drawComboBox", function(g, obj)
{
    var a = obj.area;

    g.setColour(obj.bgColour);
    g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], 2.0);
    g.setColour(Colours.withAlpha(obj.textColour, (obj.enabled && obj.active) ? 1.0 : 0.2));
    g.setFont(THEME.FONT.SECONDARY, 36.0);
   
    g.drawAlignedText(obj.text, [a[0] + 30, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
});

laf.registerFunction("getIdealPopupMenuItemSize", function(obj) { return 60; });

const localLaf = Content.createLocalLookAndFeel();
localLaf.registerFunction("drawFilterDragHandle", function(g, obj)
{	
	var SIZE = 26;
	var area = [obj.handle[0], obj.handle[1], SIZE, SIZE];
	
	g.setColour(0XFFFFFFFF);
	g.fillEllipse(area);
	
	g.setColour(0XFF000000);
	g.drawEllipse(area, 2);
	
	g.setFont(THEME.FONT.SECONDARY, 24); 
	g.drawAlignedText(obj.index, area, "centred");
});

const var EQ = Content.getComponent("tile_eq");
EQ.setLocalLookAndFeel(localLaf);

