var STATE = {
	parameter: 'TEST',
	value: '50%',
	freezeMode: false,
	ACTIVATED: false,
};

function getDisplayParameter() {return {'parameter': parameter, 'value': value};}

function setFreezeMode(freezeMode) {
	STATE.freezeMode = freezeMode;
}

function getFreezeMode() {return STATE.freezeMode;}


function setActivated(status) {
	STATE.ACTIVATED = status;
}

function getActivated() {return STATE.ACTIVATED;}
