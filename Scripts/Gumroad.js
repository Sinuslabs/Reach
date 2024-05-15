// Gumroad.getActivationStatus();
// Gumroad.activate(license_key);

namespace Gumroad {

    Server.setBaseURL("https://api.gumroad.com/v2");
    Server.setServerCallback(serverActivity);
	
	inline function activate(license_key) {

        if (Globals.activated) {
            Console.print('Already activated');
            return;
        }

        Server.callWithPOST("/licenses/verify", {
            'product_id': Config.API_KEY,
            'license_key': license_key.trim(),
        }, onLicenseCheck);
    }
	
	inline function onLicenseCheck(status, data) {
		
		if (data.success) {
			unlockProduct();
		} else {
			UserSettings.serial_error_label.set('text', 'License Key not found :()');
		}
    }
	
	inline function unlockProduct() {
		local data = { 'isActivated': true, date: Engine.getSystemTime(true) };
		local machineId = FileSystem.getSystemId();
		local appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
        appDateDir.getChildFile("license.dat").writeEncryptedObject(data, machineId);

        Globals.activated = true;
		
		UserSettings.unlockDemoLimitations();

        Console.print('Activated');

    }

    function getActivationStatus() {
        var license = getLocalLicense();
        if (license) Globals.activated = true;
    }
	
	inline function serverActivity(isWaiting) {
        Console.print('loading: ' + isWaiting);
    }

    function getLocalLicense() {
        var machineId = FileSystem.getSystemId();
        var appDateDir = FileSystem.getFolder(FileSystem.UserPresets).getParentDirectory();
        var license = appDateDir.getChildFile("license.dat").loadEncryptedObject(machineId);
        return license;
    }
}