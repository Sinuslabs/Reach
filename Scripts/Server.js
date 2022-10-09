Server.setBaseURL('https://sinuslabs.io/');
Server.setHttpHeader('Authorization: Basic ' + AUTH_KEY);

// NOT FOUND LABEL
const var label_not_found = Content.getComponent("label_not_found");

function getActivation(status, obj) {
	if (status == 404 || obj.data.productId != 422) {
		label_not_found.set('visible', true);
		return;
	}
	
    if(status == 200) {
		var data = {object: obj, date: Engine.getSystemTime(true)};
		var machineId = FileSystem.getSystemId();
		var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
		STATE.ACTIVATED = true;
		
		// Disable gain reduction
		GainReduction.setBypassed(STATE.ACTIVATED);
				
		// update panels
		panel_non_activated.set('visible', !STATE.ACTIVATED);
		panel_non_activated.repaint();
		label_status_main.set('visible', !STATE.ACTIVATED);
		label_thank_you.set('visible', STATE.ACTIVATED);
		
	}
};

function getActivationStatus() {
	var license = getLocalLicense();
	if (license) STATE.ACTIVATED = true;
}

function activateLicense(KEY) {
	Server.callWithGET('wp-json/lmfwc/v2/licenses/activate/'+KEY, {}, getActivation);		
}

function getLocalLicense() {
	var machineId = FileSystem.getSystemId();
	var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
	return license;
}

