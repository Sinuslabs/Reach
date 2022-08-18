const var DegradeAnimationPanel = Content.getComponent("panel_animation_degrade");
DegradeAnimationPanel.setValue(1);

var DEGRADE_STATE = {
	width: 250,
	outterThickness: 2,
	innerThickness: 2,
	limit: 10,
	corner: 1,
};

DegradeAnimationPanel.setPaintRoutine(function(g)
{
    g.setColour(Colours.white);
    
    g.drawRoundedRectangle([1, 1, this.getWidth() - 2, this.getHeight() - 2], DEGRADE_STATE.corner, DEGRADE_STATE.innerThickness);
        
    var radius = this.getWidth() / 2 - 10 * this.getValue();
    var diameter;
    var pos;

    for (i = 1; i < DEGRADE_STATE.limit; i++)
    {
        diameter = (radius * 2 / 4 * i + 10);
        pos = this.getWidth() / 2 - diameter / 2;
        if (pos > 0)
        	g.drawRoundedRectangle([pos + 1, pos + 1, diameter - 2, diameter - 2],DEGRADE_STATE.corner,  DEGRADE_STATE.innerThickness);
    } 
});

