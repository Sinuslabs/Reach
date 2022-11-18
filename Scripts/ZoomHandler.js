namespace ZoomHandler
{
	const var MIN_ZOOM = 0.50;
	const var MAX_ZOOM = 2.0;
	const var ZOOM_STEP = 0.01;
	const var INTERFACE_WIDTH = 1134;
	const var INTERFACE_HEIGHT = 510;

	const var ZoomPanel = Content.getComponent("ZoomPanel");
	
	const var draggerData = [ 110,109,143,130,218,67,147,216,145,66,108,147,216,145,66,143,130,218,67,108,0,0,0,0,143,130,218,67,108,143,130,218,67,0,0,0,0,108,143,130,218,67,147,216,145,66,99,109,143,130,218,67,139,140,96,67,108,139,140,96,67,143,130,218,67,108,66,160,23,67,143,
	130,218,67,108,143,130,218,67,66,160,23,67,108,143,130,218,67,139,140,96,67,99,109,143,130,218,67,102,22,188,67,108,102,22,188,67,143,130,218,67,108,66,160,151,67,143,130,218,67,108,143,130,218,67,66,160,151,67,108,143,130,218,67,102,22,188,67,99,101,
	0,0 ];
	
	const var draggerPath = Content.createPath();
	
	draggerPath.loadFromData(draggerData);
	
	ZoomPanel.setPaintRoutine(function(g) {
		var DRAGGER_COLOUR = SliderTheme.arcColour;
	
		g.setColour(DRAGGER_COLOUR);
		if (this.data.hover && this.data.allowDrag) {
			g.setOpacity(0.8);
		} else {
			g.setOpacity(0.2);
		}
		g.fillPath(draggerPath, [8, 4, 14, 14]);

	});
	
	inline function allowZoom(panel, on) {
		panel.data.allowDrag = on;
		panel.setMouseCursor(on ?"BottomRightCornerResizeCursor" : "NormalCursor", Colours.white, [0, 0]);
		panel.repaint();
	}
	
	allowZoom(ZoomPanel, true);
	
	ZoomPanel.setMouseCallback(function(event) {
		this.data.hover = event.hover;
		if(event.clicked) {
			this.data.zoomStart = Settings.getZoomLevel();
		}
		if(event.mouseUp) {
			return;
		}
	
		if(event.drag) {
			if(!this.data.allowDrag)
				return;
	
			var diagonal = Math.sqrt(INTERFACE_WIDTH*INTERFACE_WIDTH + INTERFACE_HEIGHT*INTERFACE_HEIGHT);
			var currentZoom = Settings.getZoomLevel();
			var dragPixel = 0;
			
			if(event.dragX > event.dragY)
				dragPixel = (event.dragX * currentZoom) / INTERFACE_WIDTH;
			else
				dragPixel = (event.dragY * currentZoom) / INTERFACE_HEIGHT;
			
			
			var maxScaleFactor = Content.getScreenBounds(false)[3] / INTERFACE_HEIGHT;
			var diagonalDrag = this.data.zoomStart + dragPixel;
			
			diagonalDrag += (ZOOM_STEP / 2);
			
			diagonalDrag = Math.min(diagonalDrag, maxScaleFactor);
			
			diagonalDrag -= Math.fmod(diagonalDrag, ZOOM_STEP);
			diagonalDrag = Math.range(diagonalDrag, MIN_ZOOM, MAX_ZOOM);
			
			var zoomToUse = diagonalDrag;
	
			if(currentZoom != zoomToUse) {
				comboBox_zoom.setValue(13.0);		
				Settings.setZoomLevel(zoomToUse);
			}
		}
		
		this.repaint();
	});
}