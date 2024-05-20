namespace Supabase {

    Server.setServerCallback(serverActivity);
    Server.setEnforceTrailingSlash(false);


    inline function setHeader() {
    

    local Headers = [
            "content_type: application/json",
            "apikey: " + Config.SUPABASE_ANON,
            "Authorization: Bearer " + Config.SUPABASE_ANON,
        ];
    
    local singleHeader = '';
        for (header in Headers) { singleHeader += header + '\n'; }
        Console.print(singleHeader);
        Server.setHttpHeader(singleHeader);
    }

inline function activate(license_key) {

        if (Globals.activated) {
            Console.print('Already activated');
            return;
        }

        Server.setBaseURL(Config.SUPABASE_URL);

        setHeader();
    
    local parameter = {
            "p_license_key": license_key.trim()
        };

        Server.callWithPOST("/rest/v1/rpc/check_license",
            parameter,
            onLicenseCheck);
    }


inline function onLicenseCheck(status, data) {

        Console.print('status: ' + status);
        Console.print(trace(data));

        if (data['valid']) {
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