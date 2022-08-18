const var Flair1AnimationPanel = Content.getComponent('panel_animation_flair1');
Flair1AnimationPanel.setValue(1);

Flair1AnimationPanel.setPaintRoutine(function (g) {
	g.setColour(Colours.white);
	g.drawEllipse([10, 10, this.getWidth() - 20, this.getHeight() - 20], AN_STATE.outterThickness);
});

const var Flair2AnimationPanel = Content.getComponent('panel_animation_flair2');
Flair2AnimationPanel.setValue(1);

Flair2AnimationPanel.setPaintRoutine(function (g) {
	g.setColour(Colours.white);
	g.drawEllipse([10, 10, this.getWidth() - 20, this.getHeight() - 20], AN_STATE.outterThickness);
});