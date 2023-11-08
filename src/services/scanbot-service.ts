import {ScanbotSDK, ScanbotSdkConfiguration} from 'capacitor-plugin-scanbot-sdk';


export default class ScanbotService {
    /**
	 * Here you can set your license key. 
	 * 
	 * If you leave this field empty, a 60 seconds trial license will be activated
	 * once the SDK is initialized.
	 * 
	 * You can request a 7-day trial license on [our website](https://scanbot.io/trial/).
	 */
	private readonly LICENSE_KEY = "";

    // If true, a custom storage base directory will be set.
	private readonly USE_CUSTOM_STORAGE = false;

    // If USE_CUSTOM_STORAGE is true, this will be the name of the base directory.
	private readonly CUSTOM_STORAGE_NAME = 'my-demo-custom-storage';

    public async initSdk() {
		const configuration: ScanbotSdkConfiguration = {
			allowGpuAcceleration: true, 
			allowXnnpackAcceleration: true,
			licenseKey: this.LICENSE_KEY,
		}

		// if (this.USE_CUSTOM_STORAGE) {
		// 	configuration.storageBaseDirectory = await this.getStorageBaseDirectory();
		// 	console.log("Changed Storage Base Directory to " + configuration.storageBaseDirectory);
		// }

		const results = await ScanbotSDK.initializeSDK(configuration);

        console.log(JSON.stringify(results));
	}
}

export const ScanbotSDKService = new ScanbotService();
