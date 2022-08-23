Server.setBaseURL('https://sinuslabs.io/');
Server.setHttpHeader('Authorization: Basic ' + AUTH_KEY);

Console.print(AUTH_KEY);

function activateLicense(status, obj) {
	Console.print('STATUS: '+status);

    if(status == 200) 
		var data = {object: obj, date: Engine.getSystemTime(true)};
		var machineId = FileSystem.getSystemId();
		var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
		Console.print('ACTIVATED');
		STATE.ACTIVATED = true;
};

function getActivationStatus() {
	var license = getLocalLicense();
	if (license) STATE.ACTIVATED = true;
}

function activateLicense(KEY) {
	Console.print('key is: ' + KEY);

	//Server.callWithGET('wp-json/lmfwc/v2/licenses/validate/'+KEY, {}, activateLicense);		
}

function getLocalLicense() {
	var machineId = FileSystem.getSystemId();
	var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
	return license;
}

