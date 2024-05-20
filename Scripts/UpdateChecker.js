namespace UpdateChecker {
	
	const CURRENT_VERSION = Engine.getVersion();
	const NAME = Engine.getName().toLowerCase();
	
	const GITHUB_API = 'https://api.github.com';
	
	reg onDoneCallback;
	
	inline function checkUpdate(callback) {
		Console.print('check update');
		
		onDoneCallback = callback;
		
		Server.setBaseURL(GITHUB_API);
		
		Server.callWithGET(
			"/repos/sinuslabs/reach/releases/latest",
			{},
			onGithubResponse
		);
	}
	
	inline function onGithubResponse(status, data) {
		if (status == 200) {
			onDoneCallback(canUpdate(data['tag_name'], CURRENT_VERSION));
		} else {
			onDoneCallback(false);
		}
	}
	
	inline function canUpdate(remoteVersion, localVersion) {
		
		// split version
		local remoteVersionSplit = remoteVersion.replace('v', '').split('.');
		local localVersionSplit = localVersion.split('.');
		
		// format version number to int
		local remote_major = Math.round(remoteVersionSplit[0]);
		local local_major = Math.round(localVersionSplit[0]);		
		local remote_minor = Math.round(remoteVersionSplit[1]);
		local local_minor = Math.round(localVersionSplit[1]);
		local remote_mini = remoteVersionSplit[2];
		local local_mini = localVersionSplit[2];

		if (remote_major > local_major) {
			return true;
		}
		
		if (remote_minor > local_minor) {
			return true;
		}
		
		if (isDefined(remote_mini)) {
			if (Math.round(remote_mini) > Math.round(remote_mini)) {
				return true;
			}
		}
		
		return false;
	}	
}