import {
  ScanbotSDK,
  ScanbotSdkConfiguration,
  DocumentScannerConfiguration,
  BarcodeScannerConfiguration,
  BatchBarcodeScannerConfiguration,
  MrzScannerConfiguration,
  MrzResult,
  HealthInsuranceCardScannerConfiguration,
  CheckRecognizerConfiguration,
  TextDataScannerConfiguration,
  LicensePlateScannerConfiguration,
  MedicalCertificateRecognizerConfiguration,
  CroppingConfiguration,
  Page,
  InitializeSDKResult,
  GetLicenseInfoResult,
  DocumentScannerResult,
} from "capacitor-plugin-scanbot-sdk";

import { ErrorHandelingService } from "./error_handling_service";
import { ShowAlert } from "./alert_service";

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
  private readonly CUSTOM_STORAGE_NAME = "my-demo-custom-storage";

  public async initSdk() {
    const configuration: ScanbotSdkConfiguration = {
      allowGpuAcceleration: true,
      allowXnnpackAcceleration: true,
      licenseKey: this.LICENSE_KEY,
    };

    // if (this.USE_CUSTOM_STORAGE) {
    // 	configuration.storageBaseDirectory = await this.getStorageBaseDirectory();
    // 	console.log("Changed Storage Base Directory to " + configuration.storageBaseDirectory);
    // }

    const result = await ErrorHandelingService<InitializeSDKResult>(() => ScanbotSDK.initializeSDK(configuration));
    console.log(JSON.stringify(result));
  }

  public async validateLicense() {
    const result = await ErrorHandelingService<GetLicenseInfoResult>(() => ScanbotSDK.getLicenseInfo());
    if (result?.isLicenseValid) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    alert('Scanbot SDK (trial) license has expired!');
    return false;
  }

  public startDocumentScanner = async () : Promise<DocumentScannerResult> => {
    //if (!this.validateLicense()) return;

    const configuration: DocumentScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      cameraPreviewMode: "FIT_IN",
      orientationLockMode: "PORTRAIT",
      pageCounterButtonTitle: "%d Page(s)",
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
      topBarBackgroundColor: "#c8193c",
      bottomBarBackgroundColor: "#c8193c",
      // see further configs ...
    };

    const documentScannerResult = await ErrorHandelingService<DocumentScannerResult>(() => ScanbotSDK.startDocumentScanner(configuration));
    return documentScannerResult!;
  }

  public async startCroppingScreen(page: Page) {
    // Always make sure you have a valid license on runtime via SDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: CroppingConfiguration = {
      // Pass your scanned page here:
      //page: scannedPage,
      // Customize colors, text resources, behavior, etc..
      doneButtonTitle: "Save",
      orientationLockMode: "PORTRAIT",
      topBarBackgroundColor: "#c8193c",
      // see further configs ...
    };

    const result = await ScanbotSDK.startCroppingScreen({
      page: page,
      configuration: configuration,
    });

    if (result.status === "CANCELED") {
      // User has canceled the cropping operation
      return;
    }
  }

  public async startBarcodeScanner() {
    // // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: BarcodeScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please align the barcode or QR code in the frame above to scan it.",
      orientationLockMode: "PORTRAIT",
      finderLineColor: "#0000ff",

      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: false,
        textFormat: "CODE_AND_TYPE",
        /** The color of the polygon in the selection overlay. */
        polygonColor: "#0000ff",
        /** The color of the text in the selection overlay. */
        textColor: "#000fff",
        /** The color of the texts background in the selection overlay. */
        textContainerColor: "#00ffff",
        /** The color of the polygon in the selection overlay, when highlighted. */
        highlightedPolygonColor: "#42f566",
        /** The color of the text in the selection overlay, when highlighted. */
        highlightedTextColor: "#42f566",
        /** The color of the texts background in the selection overlay, when highlighted. */
        highlightedTextContainerColor: "#f5bf42",
      },
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further configs ...
    };

    const result = await ScanbotSDK.startBarcodeScanner(configuration);

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }
    alert(JSON.stringify(result));
    // handle the scanned barcode(s) from result
    // result.barcodes[n]...
  }

  public async startBatchBarcodeScanner() {
    // // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: BatchBarcodeScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please align the barcode or QR code in the frame above to scan it.",
      orientationLockMode: "PORTRAIT",
      finderLineColor: "#0000ff",
      overlayConfiguration: {
        overlayEnabled: true,
        automaticSelectionEnabled: false,
        textFormat: "CODE_AND_TYPE",
        /** The color of the polygon in the selection overlay. */
        polygonColor: "#0000ff",
        /** The color of the text in the selection overlay. */
        textColor: "#000fff",
        /** The color of the texts background in the selection overlay. */
        textContainerColor: "#00ffff",
        /** The color of the polygon in the selection overlay, when highlighted. */
        highlightedPolygonColor: "#42f566",
        /** The color of the text in the selection overlay, when highlighted. */
        highlightedTextColor: "#42f566",
        /** The color of the texts background in the selection overlay, when highlighted. */
        highlightedTextContainerColor: "#f5bf42",
      },
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further configs ...
    };

    const result = await ScanbotSDK.startBatchBarcodeScanner(configuration);

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }

    alert(JSON.stringify(result));
  }

  public async startMrzScanner() {
    // Always make sure you have a valid license on runtime via SDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: MrzScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.",
      orientationLockMode: "PORTRAIT",
      // see further configs ...
    };

    const result: MrzResult = await ScanbotSDK.startMrzScanner(configuration);

    if (result.status === "CANCELED") {
      // User has canceled the scanning operation
      return;
    }
    alert(JSON.stringify(result));
  }

  public async startEHICScanner() {
    // Always make sure you have a valid license on runtime via SDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: HealthInsuranceCardScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please hold your phone over the back of your Health Insurance Card.",
      orientationLockMode: "PORTRAIT",
      // see further configs ...
    };

    const result = await ScanbotSDK.startEHICScanner(configuration);

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }
    alert(JSON.stringify(result));
  }

  public async startCheckRecognizer() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: CheckRecognizerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      enableCameraButtonTitle: "Enable Camera",
      orientationLockMode: "PORTRAIT",
      finderLineColor: "#0000ff",
      // see further configs ...
    };

    const result = await ScanbotSDK.startCheckRecognizer(configuration);

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }

    alert(JSON.stringify(result));
  }

  public async startTextDataScanner() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: TextDataScannerConfiguration = {
      textDataScannerStep: {
        allowedSymbols: "",
        aspectRatio: {
          height: 1.0,
          width: 5.0,
        },
        guidanceText: "Place the text in the frame to scan it",
        pattern: "",
        preferredZoom: 2.0,
        shouldMatchSubstring: false,
        significantShakeDelay: -1,
        textFilterStrategy: "Document",
        unzoomedFinderHeight: 40,
      },
      // Other UI configs...
    };

    const result = await ScanbotSDK.startTextDataScanner(configuration);

    if (result.status === "CANCELED") {
      return;
    }

    alert(JSON.stringify(result));
  }

  public async startLicensePlateScanner() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: LicensePlateScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      scanStrategy: "MlBased",
      topBarBackgroundColor: "#c8193c",
      cancelButtonTitle: "Cancel",
      finderLineColor: "#c8193c",
      finderLineWidth: 5,
      orientationLockMode: "PORTRAIT",
      finderTextHint: 'Place the whole license plate in the frame to scan it',
      confirmationDialogConfirmButtonFilled: true,
      // see further configs...
    };

    const result = await ScanbotSDK.startLicensePlateScanner(configuration);

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }
    alert(JSON.stringify(result));
  }

  public async startMedicalCertificateRecognizer() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const configuration: MedicalCertificateRecognizerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      topBarBackgroundColor: "#c8193c",
      cancelButtonTitle: "Cancel",
      finderLineColor: "#c8193c",
      finderLineWidth: 5,
      orientationLockMode: "PORTRAIT",
      // see further configs...
    };

    const result = await ScanbotSDK.startMedicalCertificateRecognizer(
      configuration
    );

    if (result.status === "CANCELED") {
      // user has canceled the scanning operation
      return;
    }

    alert(JSON.stringify(result));
  }

  public async detectBarcodesOnImage() {
    const result = await ScanbotSDK.detectBarcodesOnImage({
      imageFileUri: "file:///some/image-file.jpg",
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further args...
    });
  }

  public async detectBarcodesOnImages() {
    const result = await ScanbotSDK.detectBarcodesOnImages({
      imageFileUris: [
        "file:///some/image-file_1.jpg",
        "file:///some/image-file_2.jpg",
      ],
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further args...
    });
  }

  public async recognizeCheck() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.recognizeCheck({
      imageFileUri: "file:///some/image-file.jpg",
    });
  }

  public async performOCR() {
    // Always make sure you have a valid license on runtime via SDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.performOCR({
      imageFileUris: [],
      languages: ["en"],
      options: {
        outputFormat: "FULL_OCR_RESULT",
      },
    });
  }

  public async getImageData(imageFileUri: string) {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    // Use the low-res image file "documentPreviewImageFileUri" of a Page for the preview:
    const result = await ScanbotSDK.getImageData({
      imageFileUri: imageFileUri,
    });

    return `data:image/jpeg;base64,${result.base64ImageData}`;
  }

  public async applyImageFilterOnImage() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.applyImageFilter({
      imageFileUri: "file:///some/image-file.jpg",
      filter: "ImageFilterTypeGray", // See available filters below
    });

    const filteredImageUri: string = result.imageFileUri;
  }

  public async applyImageFilterOnPage(scannedPage: Page) {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.applyImageFilterOnPage({
      page: scannedPage,
      filter: "ImageFilterTypeBinarized",
    });

    // Use the updated page from result
    const filteredPage: Page = result;
  }

  public async getFilteredDocumentPreviewUri(scannedPage: Page) {
    const result = await ScanbotSDK.getFilteredDocumentPreviewUri({
      page: scannedPage,
      filter: "ImageFilterTypeLowLightBinarization2", // See available filters above
    });

    // use the imageFileUri from result to show a preview image of an image filter
    const filteredPreviewImageUri = result.filteredDocumentPreviewUri;
  }

  public async estimateBlur() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.estimateBlur({
      imageFileUri: "",
    });

    // Check the blurriness value, e.g.
    if (result.blur > 0.6) {
      alert("This scanned image looks blurry. Consider rescanning it.");
    }
  }

  public async createPDF() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.createPDF({
      imageFileUris: [],
      pageSize: "FIXED_A4",
    });
  }

  public async writeTIFF() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    // if (!licenseCheckMethod()) {
    //   return;
    // }

    const result = await ScanbotSDK.writeTIFF({
      imageFileUris: [],
      options: {
        oneBitEncoded: true,
        dpi: 300,
        compression: "CCITT_T6",
      },
    });
  }
}

export const ScanbotSDKService = new ScanbotService();
