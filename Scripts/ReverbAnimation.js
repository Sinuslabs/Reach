const var ReverbAnimationPanel = Content.getComponent("panel_animation_reverb");
ReverbAnimationPanel.setValue(1);

var AN_STATE = {
	width: 250,
	outterThickness: 2,
	innerThickness: 2,
	limit: 4
};

ReverbAnimationPanel.setPaintRoutine(function(g)
{
    g.setColour(Colours.white);
    
    g.drawEllipse([5, 5, this.getWidth() - 10, this.getHeight() - 10], AN_STATE.outterThickness);
        
    var radius = this.getWidth() / 2 - 10 * this.getValue();
    var diameter;
    var pos;

    for (i = 1; i < AN_STATE.limit; i++)
    {
        diameter = (radius * 2 / 4 * i + 10);
        pos = this.getWidth() / 2 - diameter / 2;
        if (pos > 0)
            g.drawEllipse([pos + 5, pos + 5, diameter - 10, diameter - 10], AN_STATE.innerThickness);
    } 
});