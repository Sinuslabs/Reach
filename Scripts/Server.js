Console.print('sever fetch activation status');

var KEY = 'SLDBCD-22CC-142B-42C4';


Server.setBaseURL('https://sinuslabs.io/');
Server.setHttpHeader('Authorization: Basic Y2tfNDE2NGIxYjg2NDgxYmUyOGI4ZGNkZjk4MzEzN2QxZGJkMTM0NjA4Mzpjc19kYzgyODQzYjZmYjk0ZTRmMWRmZDFkZmFiOWQwMTkyN2MyMDIwZjA1');

function activateLicense(status, obj) {
    if(status == 200) 
		var data = {object: obj, date: Engine.getSystemTime(true)};
		var machineId = FileSystem.getSystemId();
		var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
		appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);
		STATE.ACTIVATED = true;
};

function getActivationStatus() {
	var license = getLocalLicense();
	if (license) STATE.ACTIVATED = true;
}

function activateLicense() {
	label_serial_key.get('text');
	Server.callWithGET('wp-json/lmfwc/v2/licenses/validate/'+KEY, {}, activateLicense);		
}

function getLocalLicense() {
	var machineId = FileSystem.getSystemId();
	var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
	var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
	Console.print(FileSystem.UserPresets);
	Console.print('LICENSE IS: ' + trace(license));
	return license;
}

