include("Theme.js");
include("Paths.js");
include("Helpers.js");
include("Config.js");
include("StyleHelpers.js");
include("UpdateChecker.js");
include("LookAndFeel.js");
include("Filter.js");
include("Settings.js");
include("Handler.js");
include("Effects.js");
include("EffectCustomizer.js");
include("Reverb.js");
include("ZoomHandler.js");
include("Router.js");
include("ThankYou.js");
include("Supabase.js");
include("Display.js");
include("ReverbAnimation.js");
include("DegradeAnimation.js");
include("FlairAnimation.js");
include("ChorusAnimation.js");
include("DistortionAnimation.js");
include("VuMeter.js");
include("SplashAnimation.js");
include("Randomization.js");
include("About.js");
include("PresetBrowserLogic.js");
include("Master.js");
include("PanicMode.js");

Content.makeFrontInterface(1134, 510);

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/JetBrainsMono-Medium.ttf", "jetbrains-mono");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Inter-SemiBold.ttf", "inter-semi");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Inter-Regular.ttf", "inter-reg");
Engine.setGlobalFont("inter-semi");

// Setting Global State
Globals.parameter = 'NONE';
Globals.freezeMode = false;

// DEBUG
Globals.activated = false;
Globals.presetBrowserOpen = false;
Globals.settingsOpen = false;
Globals.effectsOpen = false;
Globals.aboutOpen = false;
Globals.filterOpen = false;
Globals.screenLock = true;

// Loading Settings
if (settingsExist()) {
	UserSettings.loadSettings();
	if (UserSettings.startupAnimation) {
		SplashAnimation.init();
	} else {
		SplashAnimation.tubeAniPanel.set('visible', false);
		SplashAnimation.animationBackground.set('visible', false);
	}
} else {
	Settings.setZoomLevel(0.81);
	comboBox_zoom.setValue(6.0);
	Theme.setTheme('Light');
	SplashAnimation.init();
}

reg i;
reg j;

// Activation Label
//const var button_not_activated = Content.getComponent("button_not_activated");
const var label_thank_you = Content.getComponent("label_thank_you");

// Check License
getActivationStatus();

UserSettings.button_not_activated.set('visible', !Globals.activated);
button_buy_reach.set('visible', !Globals.activated);
label_thank_you.set('visible', Globals.activated);

// Main Screen
const MainDisplayTimer = Engine.createTimerObject();
MainDisplayTimer.setTimerCallback(showMainOnInit);
MainDisplayTimer.startTimer(20);

inline function showMainOnInit() {

	showMain();
	//displayShow('about');
	Globals.screenLock = false;
	MainDisplayTimer.stopTimer();
}

const var GainReduction = Synth.getEffect("Simple Gain5");
const var GainReductionTimer = Engine.createTimerObject();
const var TimeoutCounter = 15000;

	var TimeoutCurrent = 0;
	
	GainReductionTimer.setTimerCallback(function() {
		
		if (Globals.isBypassed) {return;}
	
	    TimeoutCurrent += 1000;
	    
	    if (TimeoutCurrent == TimeoutCounter) {
	      TimeoutCurrent = 0;  
	    }
	    if (TimeoutCurrent > 13000) {
	       GainReduction.setBypassed(false);
	    } else {
	        GainReduction.setBypassed(true);
	    }
	});
	if (!Globals.activated) {
		GainReduction.setBypassed(false);
		GainReductionTimer.startTimer(1000);		
	} else {
		GainReduction.setBypassed(true);
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
			alpha: 0.03,
			monochromatic: true,
			scaleFactor: 1.2,
			area: a
		});
	});
}
themeMainPanel();
themePanels();


inline function addGuides() {
	
	Content.addVisualGuide([0, 460], Colours.yellow);
	Content.addVisualGuide([0, 306], Colours.yellow);
	Content.addVisualGuide([0, 198], Colours.yellow);
	
	Content.addVisualGuide([0, 40], Colours.yellow);
	Content.addVisualGuide([0, 30], Colours.yellow);
}

namespace FFTVisual {
	
	reg fftHistory = []; // Array to store historical paths
	const var HISTORY_SIZE = 10; // How many paths to store and draw
	const var X_OFFSET_STEP = 6; // Pixels to shift right per step
	const var Y_OFFSET_STEP = -3; // Pixels to shift up per step (negative Y is up in HISE)
	const var MIN_ALPHA = 0.1; // Minimum alpha for the oldest paths
	const var SCALE_REDUCTION = 0.3;
	// Minimum scale factor to prevent paths from becoming invisible
	const var MIN_SCALE = 0.1;
	
	const var DB = Synth.getDisplayBufferSource("Analyser1");
	const var buffer = DB.getDisplayBuffer(0);
	const var Panel1 = Content.getComponent("Panel1");
	Panel1.setPaintRoutine(drawAnalyser);
	
	Content.callAfterDelay(1100, function() {
		Panel1.startTimer(20);	
	}, {});
	Panel1.setTimerCallback(function()
	{
		var bf = buffer.createPath(this.getLocalBounds(0), // area
						 [0, BUFFER_LENGTH, 0, 1.0], // [x_start, x_end, y_min, y_max]
						 0.0 // start value (the initial value at position 0)
						 );
		var p = {
			path: bf
		};
		Panel1.setValue(p);
		updateFFTHistory(p);
		Panel1.repaint();
	});
	
	/**
	 * Call this function regularly (e.g., from a timer) to update the FFT history.
	 * Replace 'MyAnalyserNode' with the actual Script ID of your FFT analyser node.
	 */
	inline function updateFFTHistory(fftPath)
	{
	    if (typeof(fftPath) == "object" && isDefined(fftPath.path))
	    {
	        local newPath = fftPath.path;
	
	        // Add the new path to the beginning of the history array
	        fftHistory.insert(0, newPath);
	
	        // Limit the history size - remove the oldest path if the array is too long
	        if (fftHistory.length > HISTORY_SIZE)
	        {
	            fftHistory.pop(); // Removes the last element (the oldest one)
	        }
	
	        this.repaint();
	    }
	}
	
	inline function drawAnalyser(g)
	{
	    // Get the full drawing area bounds ONCE
	    local baseBounds = this.getLocalBounds(10);
	    local baseW = baseBounds[2]; // Width
	    local baseH = baseBounds[3]; // Height
	    local baseX = baseBounds[0]; // X position
	    local baseY = baseBounds[1]; // Y position
	    local baseCx = baseX + baseW / 2.0; // Center X
	    local baseCy = baseY + baseH / 2.0; // Center Y
	
	    local historyCount = fftHistory.length;
	
	    // --- Gradient Colours ---
	    local gradColourTop = Colours.lightblue;
	    local gradColourBottom = '0xffffff';
	    // const var gradColourBottom = gradColourTop.darker(0.6);
	    // const var gradColourBottom = Colours.transparentBlack;
	
	    // Iterate backwards through the history (oldest path first)
	    for (i = historyCount - 1; i >= 0; i--)
	    {
	        local path = fftHistory[i]; // Get the original path
	
	        // Calculate the 'age' factor (0 = newest, almost 1 = oldest)
	        local ageFactor = i / HISTORY_SIZE;
	
	        // --- Calculate Visual Properties based on Age ---
	        local alpha = 1.0 - ageFactor * (1.0 - MIN_ALPHA);
	        alpha = Math.max(MIN_ALPHA, alpha);
	        local scaleFactor = 1.0 - ageFactor * SCALE_REDUCTION;
	        scaleFactor = Math.max(MIN_SCALE, scaleFactor);
	        local offsetX = i * X_OFFSET_STEP;
	        local offsetY = i * Y_OFFSET_STEP;
	
	        // --- Calculate the new drawing bounds ---
	        local newW = baseW * scaleFactor;
	        local newH = baseH * scaleFactor;
	        local newX = baseCx - (newW / 2.0) + offsetX;
	        local newY = baseCy - (newH / 2.0) + offsetY;
	        local drawBounds = [newX, newY, newW, newH]; // [x, y, width, height]
	
	        // --- Setup Gradient Fill Data ---
	
	        // Apply the calculated alpha to the gradient colours
	        local currentTopColour = Colours.withAlpha(gradColourTop, alpha);
	        local currentBottomColour = Colours.withAlpha(gradColourBottom, alpha * 0.8); // Example fade
	
	        // Define gradient start and end points based on the drawBounds
	        local gradStartX = newX;            // Start X
	        local gradStartY = newY;            // Start Y (top edge)
	        local gradEndX = newX;              // End X (same for vertical)
	        local gradEndY = newY + newH;       // End Y (bottom edge)
	
	        // Create the gradient data array as per documentation:
	        // [Colour1, x1, y1, Colour2, x2, y2, isRadial (optional)]
	        local gradientData = [
	            currentTopColour, gradStartX, gradStartY,
	            currentBottomColour, gradEndX, gradEndY,
	            false // Explicitly linear gradient
	        ];
	
	        // Set the gradient fill using the data array
	        //g.setGradientFill(gradientData);
	
	        // --- Draw the Path ---
	        // Fill the path using the gradient we just set
	        g.setColour(Colours.withAlpha(Colours.lightgrey, 0.5));
	        g.fillPath(path, drawBounds);
	        g.setColour(Colours.lightgrey);
	        g.drawPath(path, drawBounds, 1);
	    }
	
	}

}

//addGuides();
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	Console.print('onTimer');
}
 function onControl(number, value)
{
	
}
 