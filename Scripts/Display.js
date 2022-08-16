// Display Parameter
const var label_parameter_value = Content.getComponent("label_parameter_value");
const var label_parameter_name = Content.getComponent("label_parameter_name");

function updateDisplay() {
	label_parameter_value.set('text', STATE.value);
	label_parameter_name.set('text', STATE.parameter);
}
updateDisplay();