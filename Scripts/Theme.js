const LIGHT_THEME = {
	name: 'Light',
	FONT: {
		MAIN: 'inter-semi',
		SECONDARY: 'space'
	},
	SLIDER: {
		ARC_COLOUR: '0x000000',
		INDICATOR_COLOUR: '0x6b6b6b',
		UPPER_GRADIENT_COLOUR: '0xF6F6F6',
		LOWER_GRADIENT_COLOUR: '0xEAEAEA',
		BORDER_COLOUR: '0xDFDFDF',
		SHADOW_COLOUR: '0x3e3234',
		RED_COLOUR: '0xFF0000',
		BLUE_COLOUR: '0x0023FF',
	},
	PANEL: {
		UPPER_GRADIENT_COLOUR: '0xDDDDDD',
		LOWER_GRADIENT_COLOUR: '0xE6E6E6',
		MAIN_UPPER_GRADIENT_COLOUR: '0xECECEC',
		MAIN_LOWER_GRADIENT_COLOUR: '0xD3D3D3',
		BORDER_COLOUR: '0xA5A5A5',
		SELECTED_ICON_COLOUR: '0x6B6B6B',
		ICON_COLOUR: '0xA3A3A3',
		HOVER_OPACITY: 'CC',
		TEXT_COLOUR: 4285229931
	},					
	BUTTON: {
			UPPER_GRADIENT_COLOUR: '0xF6F6F6',
			LOWER_GRADIENT_COLOUR: '0xEAEAEA',
			BACKGROUND_HOVER_COLOUR: '0xF5F5F5',
			BORDER_COLOUR: '0xA5A5A5',
			SHADOW_COLOUR: '0x3e3234',
			ICON_COLOUR: '0x6b6b6b',
	},
	DISPLAY: {
		BUTTON_BACKGROUND_COLOUR: '0x000000',
		BUTTON_SELECTED_BACKGROUND_COLOUR: '0xffffff',
		BUTTON_TEXT_COLOUR: '0xffffff',
		BUTTON_SELECTED_TEXT_COLOUR: '0x000000',
		TEXT_COLOUR: '0xffffff',
		HOVER_OPACITY: 'CC',
		SELECTED_ICON_COLOUR: '0xffffff',
		ICON_COLOUR: '0xAAAAAA',
		NOT_ACTIVATED_COLOUR: '0xFF0000',
	},
	HEADER: {
		SELECTED_ICON_COLOUR: '0xA3A3A3',
		ICON_COLOUR: '0x6B6B6B',
		SELECTED_TEXT_COLOUR: '0xA3A3A3',
		TEXT_COLOUR: '0x6B6B6B',
		HOVER_OPACITY: 'CC'
	}
};

const DARK_THEME = {
	name: 'Dark',
	FONT: {
		MAIN: 'inter-semi',
		SECONDARY: 'space'
	},
	SLIDER: {
		ARC_COLOUR: '0x969696',
		INDICATOR_COLOUR: '0x969696',
		UPPER_GRADIENT_COLOUR: '0x2D2D2D',
		LOWER_GRADIENT_COLOUR: '0x181818',
		BORDER_COLOUR: '0x333333',
		SHADOW_COLOUR: '0x3e3234',
		RED_COLOUR: '0xFBFF0000',
		BLUE_COLOUR: '0xFB0023FF',
	},
	PANEL: {
		UPPER_GRADIENT_COLOUR: '0x262626',
		LOWER_GRADIENT_COLOUR: '0x232323',
		MAIN_UPPER_GRADIENT_COLOUR: '0x323232',
		MAIN_LOWER_GRADIENT_COLOUR: '0x282828',
		BORDER_COLOUR: '0x000000',
		SELECTED_ICON_COLOUR: '0xE3E3E3',
		ICON_COLOUR: '0x696A69',
		HOVER_OPACITY: 'CC',
		TEXT_COLOUR: 4293125091
	},
	BUTTON: {
			UPPER_GRADIENT_COLOUR: '0x2D2D2D',
			LOWER_GRADIENT_COLOUR: '0x181818',
			BACKGROUND_HOVER_COLOUR: '0x282828',
			BORDER_COLOUR: '0x333333',
			SHADOW_COLOUR: '0x3e3234',
			ICON_COLOUR: '0x969696',
	},
	DISPLAY: {
		BUTTON_BACKGROUND_COLOUR: '0x000000',
		BUTTON_SELECTED_BACKGROUND_COLOUR: '0xffffff',
		BUTTON_TEXT_COLOUR: '0xffffff',
		BUTTON_SELECTED_TEXT_COLOUR: '0x000000',
		TEXT_COLOUR: '0xffffff',
		HOVER_OPACITY: 'CC',
		SELECTED_ICON_COLOUR: '0xffffff',
		ICON_COLOUR: '0xAAAAAA',
		NOT_ACTIVATED_COLOUR: '0xFF0000',
	},
	HEADER: {
		SELECTED_ICON_COLOUR: '0xA3A3A3',
		ICON_COLOUR: '0xE3E3E3',
		SELECTED_TEXT_COLOUR: '0xA3A3A3',
		TEXT_COLOUR: '0xE3E3E3',
		HOVER_OPACITY: 'CC',
	}
};

namespace Theme {
	reg name = '';

	reg defaultTheme = LIGHT_THEME;
	reg theme = {};
	
	inline function setTheme(themeName) {
		if(themeName == 'Light') {
			theme = LIGHT_THEME;
			UserSettings.theme = 'Light';
		}
		if (themeName == 'Dark') {
			theme = DARK_THEME;
			UserSettings.theme = 'Dark';
		}
		
		name = theme.name;
		
		Fonts.load(theme['FONT']);
		PanelTheme.load(theme['PANEL']);
		HeaderTheme.load(theme['HEADER']);
		SliderTheme.load(theme['SLIDER']);
		ButtonTheme.load(theme['BUTTON']);
		DisplayTheme.load(theme['DISPLAY']);
		
		repaintAllPanels();
		themeLabels();
		
		saveSettings();
	}
}

namespace Fonts {
	reg mainFont = '';
	reg secondaryFont = '';
	
	inline function load(theme) {
		mainFont = theme['MAIN'];
		secondaryFont = theme['SECONDARY'];
	}
}

namespace SliderTheme {
	
	reg arcColour = '';
	reg indicatorColour = '';
	reg upperGradientColour = '';
	reg lowerGradientColour = '';
	reg borderColour = '';
	reg shadowColour = '';
	reg redColour = '';
	reg blueColour = '';
	
	inline function load(theme) {
		arcColour = theme['ARC_COLOUR'];
		indicatorColour = theme['INDICATOR_COLOUR'];
		upperGradientColour = theme['UPPER_GRADIENT_COLOUR'];
		lowerGradientColour = theme['LOWER_GRADIENT_COLOUR'];
		borderColour = theme['BORDER_COLOUR'];
		shadowColour = theme['SHADOW_COLOUR'];
		redColour = theme['RED_COLOUR'];
		blueColour = theme['BLUE_COLOUR'];
	} 
}

namespace PanelTheme {
	reg upperGradientColour = '';
	reg lowerGradientColour = '';
	reg mainUpperGradientColour = '';
	reg mainLowerGradientColour = '';
	reg borderColour = '';
	reg selectedIconColour = '';
	reg iconColour = '';
	reg hoverOpacity = '';
	reg textColour = 0;
	
	inline function load(theme) {
		upperGradientColour = theme['UPPER_GRADIENT_COLOUR'];
		lowerGradientColour = theme['LOWER_GRADIENT_COLOUR'];
		mainUpperGradientColour = theme['MAIN_UPPER_GRADIENT_COLOUR'];
		mainLowerGradientColour = theme['MAIN_LOWER_GRADIENT_COLOUR'];
		borderColour = theme['BORDER_COLOUR'];
		selectedIconColour = theme['SELECTED_ICON_COLOUR'];
		iconColour = theme['ICON_COLOUR'];
		hoverOpacity = theme['HOVER_OPACITY'];
		textColour = theme['TEXT_COLOUR'];
	}
}

namespace ButtonTheme {
	reg upperGradientColour = '';
	reg lowerGradientColour = '';
	reg backgroundHoverColour = '';
	reg borderColour = '';
	reg shadowColour = '';
	reg iconColour = '';
	
	inline function load(theme) {
		upperGradientColour = theme['UPPER_GRADIENT_COLOUR'];
		lowerGradientColour = theme['LOWER_GRADIENT_COLOUR'];
		backgroundHoverColour = theme['BACKGROUND_HOVER_COLOUR'];
		borderColour = theme['BORDER_COLOUR'];
		shadowColour = theme['SHADOW_COLOUR'];
		iconColour = theme['ICON_COLOUR'];
	}
}

namespace HeaderTheme {

	reg selectedIconColour = '';
	reg iconColour = '';
	reg selectedTextColour = '';
	reg textColour = '';
	reg hoverOpacity = '';
	
	inline function load(theme) {
		
		Console.print(theme['SELECTED_TEXT_COLOUR']);
		Console.print(Theme.name);
		
		selectedIconColour = theme['SELECTED_ICON_COLOUR'];
		iconColour = theme['ICON_COLOUR'];
		selectedTextColour = theme['SELECTED_TEXT_COLOUR'];
		textColour = theme['TEXT_COLOUR'];
		hoverOpacity = theme['HOVER_OPACITY'];
	}
}

namespace DisplayTheme {
	
	reg name = '';
	reg buttonSelectedBackgroundColour = '';
	reg buttonBackgroundColour = '';
	reg buttonTextColour = '';
	reg buttonSelectedTextColour = '';
	reg textColour = '';
	reg hoverOpacity = '';
	reg selectedIconColour = '';
	reg iconColour = '';
	reg notActivatedColour = '';
	
	inline function load(theme) {
		buttonSelectedBackgroundColour = theme['BUTTON_SELECTED_BACKGROUND_COLOUR'];
		buttonBackgroundColour = theme['BUTTON_BACKGROUND_COLOUR'];
		buttonTextColour = theme['BUTTON_TEXT_COLOUR'];
		buttonSelectedTextColour = theme['BUTTON_SELECTED_TEXT_COLOUR'];
		textColour = theme['TEXT_COLOUR'];
		hoverOpacity = theme['HOVER_OPACITY'];
		selectedIconColour = theme['SELECTED_ICON_COLOUR'];
		iconColour = theme['ICON_COLOUR'];
		notActivatedColour = theme['NOT_ACTIVATED_COLOUR'];
	}
}