import {
  ScanbotSDK,
  ScanbotSdkConfiguration,
  DocumentScannerConfiguration,
  BarcodeScannerConfiguration,
  BatchBarcodeScannerConfiguration,
  MrzScannerConfiguration,
  HealthInsuranceCardScannerConfiguration,
  CheckRecognizerConfiguration,
  TextDataScannerConfiguration,
  LicensePlateScannerConfiguration,
  MedicalCertificateRecognizerConfiguration,
  CroppingConfiguration,
  Page,
  PDFPageSize,
  ImageFilterType,
  GenericDocumentRecognizerConfiguration,
  FinderDocumentScannerConfiguration,
} from "capacitor-plugin-scanbot-sdk";

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

  // -------------------------
  // Initialize Scanbot SDK
  // -------------------------
  public initSdk = async () => {
    const configuration: ScanbotSdkConfiguration = {
      allowGpuAcceleration: true,
      allowXnnpackAcceleration: true,
      licenseKey: this.LICENSE_KEY,
    };

    // if (this.USE_CUSTOM_STORAGE) {
    // 	configuration.storageBaseDirectory = await this.getStorageBaseDirectory();
    // 	console.log("Changed Storage Base Directory to " + configuration.storageBaseDirectory);
    // }
    try {
      const result = ScanbotSDK.initializeSDK(configuration);
      console.log(JSON.stringify(result));
    } catch (error) {
      ShowAlert('Initialization Failed', JSON.stringify(error), ['OK']);
    }
  }

  // -------------------------
  // Validate license
  // -------------------------
  public validateLicense = async () => {
    try {
      const result = await ScanbotSDK.getLicenseInfo();
      if (result?.isLicenseValid) {
        // OK - we have a trial session, a valid trial license or valid production license.
        return true;
      }
      alert('Scanbot SDK (trial) license has expired!');
      return false;
    } 
    catch (error) {
      ShowAlert('License Validation Failed', JSON.stringify(error), ['OK']);
      return false;
    }
  }

  // -----------------
  // Document Scanner
  // -----------------
  public startDocumentScanner = async () => {
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
    return ScanbotSDK.startDocumentScanner(configuration);
  }

  // ------------------------
  // Finder Document Scanner
  // ------------------------
  public startFinderDocumentScanner = async () => {
    const configuration: FinderDocumentScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      cameraPreviewMode: 'FILL_IN',
      orientationLockMode: 'PORTRAIT',
      ignoreBadAspectRatio: true,
      topBarBackgroundColor: '#c8193c',
      finderEnabled: true,
      // see further configs ...
    };
    return await ScanbotSDK.startFinderDocumentScanner(configuration);
  }

  // ----------------
  // Cropping Screen
  // ----------------
  public startCroppingScreen = async (page: Page) => {
    const configuration: CroppingConfiguration = {
      // Pass your scanned page here:
      //page: scannedPage,
      // Customize colors, text resources, behavior, etc..
      doneButtonTitle: "Save",
      orientationLockMode: "PORTRAIT",
      topBarBackgroundColor: "#c8193c",
      // see further configs ...
    };

    return await ScanbotSDK.startCroppingScreen({
      page: page,
      configuration: configuration,
    });
  }

  // ----------------
  // Barcode Scanner
  // ----------------
  public startBarcodeScanner = async () => {
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
    return await ScanbotSDK.startBarcodeScanner(configuration);
  }

  // ----------------------
  // Batch Barcode Scanner
  // ----------------------
  public startBatchBarcodeScanner = async () => {
    const configuration: BatchBarcodeScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please align the barcode or QR code in the frame above to scan it.",
      orientationLockMode: "PORTRAIT",
      finderLineColor: "#0000ff",
      // overlayConfiguration: {
      //   overlayEnabled: true,
      //   automaticSelectionEnabled: false,
      //   textFormat: "CODE_AND_TYPE",
      //   /** The color of the polygon in the selection overlay. */
      //   polygonColor: "#0000ff",
      //   /** The color of the text in the selection overlay. */
      //   textColor: "#000fff",
      //   /** The color of the texts background in the selection overlay. */
      //   textContainerColor: "#00ffff",
      //   /** The color of the polygon in the selection overlay, when highlighted. */
      //   highlightedPolygonColor: "#42f566",
      //   /** The color of the text in the selection overlay, when highlighted. */
      //   highlightedTextColor: "#42f566",
      //   /** The color of the texts background in the selection overlay, when highlighted. */
      //   highlightedTextContainerColor: "#f5bf42",
      // },
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further configs ...
    };

    return await ScanbotSDK.startBatchBarcodeScanner(configuration);
  }

  // --------------------------------------
  // Detect barcodes from a imported image
  // --------------------------------------
  public detectBarcodesOnImage = async (imageFileUri: string) => {
    return await ScanbotSDK.detectBarcodesOnImage({
      imageFileUri: imageFileUri,
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further args...
    });
  }

  // -------------------------------------
  // Detect barcodes from imported images
  // -------------------------------------
  public async detectBarcodesOnImages(imageFilesUris: string[]) {
    return await ScanbotSDK.detectBarcodesOnImages({
      imageFileUris: imageFilesUris,
      //barcodeFormats: ['QR_CODE', 'EAN_13', ...], // optional filter for specific barcode types
      // see further args...
    });
  }

  // ----------------
  // Detect MRZ data
  // ----------------
  public startMrzScanner = async () => {
    const configuration: MrzScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.",
      orientationLockMode: "PORTRAIT",
      // see further configs ...
    };

    return await ScanbotSDK.startMrzScanner(configuration);
  }

  // -----------------
  // Detect EHIC data
  // -----------------
  public startEHICScanner = async () => {
    const configuration: HealthInsuranceCardScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        "Please hold your phone over the back of your Health Insurance Card.",
      orientationLockMode: "PORTRAIT",
      // see further configs ...
    };

    return await ScanbotSDK.startEHICScanner(configuration);
  }

  // -------------------------
  // Detect data from a check
  // -------------------------
  public startCheckRecognizer = async () => {
    const configuration: CheckRecognizerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      enableCameraButtonTitle: "Enable Camera",
      orientationLockMode: "PORTRAIT",
      finderLineColor: "#0000ff",
      // see further configs ...
    };

    return await ScanbotSDK.startCheckRecognizer(configuration);
  }

  // --------------------------------------
  // Detect check data from imported image
  // --------------------------------------
  public recognizeCheck = async (imageUrl: string) => {
    return await ScanbotSDK.recognizeCheck({
      imageFileUri: imageUrl,
    });
  }

  // --------------------------------
  // Detect medical certificate data
  // --------------------------------
  public startMedicalCertificateRecognizer = async () => {
    const configuration: MedicalCertificateRecognizerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      topBarBackgroundColor: "#c8193c",
      cancelButtonTitle: "Cancel",
      finderLineColor: "#c8193c",
      finderLineWidth: 5,
      orientationLockMode: "PORTRAIT",
      // see further configs...
    };

    return await ScanbotSDK.startMedicalCertificateRecognizer(
      configuration
    );
  }

  // -----------------
  // Detect text data
  // -----------------
  public startTextDataScanner = async () => {
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

    return await ScanbotSDK.startTextDataScanner(configuration);
  }

  // --------------------------
  // Detect license plate data
  // --------------------------
  public startLicensePlateScanner = async () => {
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

    return await ScanbotSDK.startLicensePlateScanner(configuration);
  }

  // -------------------------
  // Generic Document Scanner
  // -------------------------
  public startGenericDocumentRecognizer = async () => {
    const configuration: GenericDocumentRecognizerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      //shouldSavePhotoImageInStorage: true,
      // see further configs...
    };

    return await ScanbotSDK.startGenericDocumentRecognizer(configuration);
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

  // ------------------
  // Convert Image URL
  // ------------------
  public getImageData = async (imageFileUri: string) => {
    // Use the low-res image file "documentPreviewImageFileUri" of a Page for the preview:
    const result = await ScanbotSDK.getImageData({
      imageFileUri: imageFileUri,
    });

    return `data:image/jpeg;base64,${result.base64ImageData}`;
  }

  // public async applyImageFilterOnImage(imageUrl: string, imageFilter: ImageFilterType) {
  //   // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
  //   // if (!licenseCheckMethod()) {
  //   //   return;
  //   // }

  //   return await ScanbotSDK.applyImageFilter({
  //     imageFileUri: imageUrl,
  //     filter: imageFilter, // See available filters below
  //   });


  // }

  // ----------------------------------
  // Apply filter for a selected image
  // ----------------------------------
  public applyImageFilterOnPage = async (scannedPage: Page, imageFilter: ImageFilterType) => {
    return await ScanbotSDK.applyImageFilterOnPage({
      page: scannedPage,
      filter: imageFilter,
    });
  }

  // ---------------------
  // PDF Create Feature
  // ---------------------
  public async createPDF(urls: string[], pageSize: PDFPageSize) {
    return await ScanbotSDK.createPDF({
      imageFileUris: urls,
      pageSize: pageSize,
    });
  }

  // ---------------------
  // TIFF Create Feature
  // ---------------------
  public async writeTIFF(urls: string[], binarized: boolean) {
    return await ScanbotSDK.writeTIFF({
      imageFileUris: urls,
      options: {
        oneBitEncoded: binarized,
        dpi: 300,
        compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE',
      },
    });
  }

  // -------------------------
  // SDK License Information
  // -------------------------
  public viewLicenseInfo = async () => {
    const licenseInfo = await ScanbotSDK.getLicenseInfo();
    return licenseInfo;
  }

  // -------------------------
  // OCR Confoguaration
  // -------------------------
  public viewOcrConfigs = async () => {
    try {
      const ocrInfo = await ScanbotSDK.getOCRConfigs();
      return ocrInfo;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
}

export const ScanbotSDKService = new ScanbotService();
