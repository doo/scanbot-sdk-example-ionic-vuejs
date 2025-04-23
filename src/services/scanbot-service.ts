import {Directory, Filesystem} from "@capacitor/filesystem";
import {
  BrightnessFilter,
  CheckRecognizerConfiguration,
  ColorDocumentFilter,
  ContrastFilter,
  CroppingConfiguration,
  CustomBinarizationFilter,
  DocumentScannerConfiguration,
  FinderDocumentScannerConfiguration,
  GenericDocumentRecognizerConfiguration,
  GrayscaleFilter,
  HealthInsuranceCardScannerConfiguration,
  LegacyFilter,
  LicensePlateScannerConfiguration,
  MedicalCertificateRecognizerConfiguration,
  MrzScannerConfiguration,
  Page,
  PageSize,
  ScanbotBinarizationFilter,
  ScanbotSDK,
  ScanbotSdkConfiguration,
  TextDataScannerConfiguration,
  WhiteBlackPointFilter,
} from "capacitor-plugin-scanbot-sdk";

import {
  BarcodeMappedData,
  BarcodeScannerConfiguration,
  MultipleScanningMode,
  SingleScanningMode,
  startBarcodeScanner
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

import {ShowAlert} from "./alert_service";
import {ImageFilterEnum} from "@/enums/filter_enum";

export default class ScanbotService {

  /*
  * TODO add the license key here.
  * Please note: The Scanbot SDK will run without a license key for one minute per session!
  * After the trial period has expired, all SDK functions and UI components will stop working.
  * You can get a free "no-strings-attached" trial license.
  * Please submit the trial license form (https://scanbot.io/trial/) on our website using
  * the app identifier "io.scanbot.example.sdk.capacitor.ionic.vuejs" of this example app
  * or of your app (see capacitor.config.ts).
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

    if (this.USE_CUSTOM_STORAGE) {
      configuration.storageBaseDirectory = await this.getStorageBaseDirectory();
      console.log("Changed Storage Base Directory to " + configuration.storageBaseDirectory);
    }
    try {
      const result = await ScanbotSDK.initializeSDK(configuration);
      console.log(JSON.stringify(result));
    } catch (error) {
      ShowAlert('Initialization Failed', JSON.stringify(error), ['OK']);
    }
  }

  // -------------------------
  // Get system storage path
  // -------------------------
  private getStorageBaseDirectory = async () => {
    return (await Filesystem.getUri({ path: this.CUSTOM_STORAGE_NAME, directory: Directory.External })).uri;
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
      cameraPreviewMode: "FILL_IN",
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

  // -----------------------
  // Single Barcode Scanner
  // -----------------------
  public startSingleBarcodeScanner = async () => {
    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Initialize the use case for single scanning.
    config.useCase = new SingleScanningMode();

    // Enable and configure the confirmation sheet.
    config.useCase.confirmationSheetEnabled = true;
    config.useCase.sheetColor = '#FFFFFF';

    // Hide/unhide the barcode image.
    config.useCase.barcodeImageVisible = true;

    // Configure the barcode title of the confirmation sheet.
    config.useCase.barcodeTitle.visible = true;
    config.useCase.barcodeTitle.color = '#000000';

    // Configure the barcode subtitle of the confirmation sheet.
    config.useCase.barcodeSubtitle.visible = true;
    config.useCase.barcodeSubtitle.color = '#000000';

    // Configure the cancel button of the confirmation sheet.
    config.useCase.cancelButton.text = 'Close';
    config.useCase.cancelButton.foreground.color = '#C8193C';
    config.useCase.cancelButton.background.fillColor = '#00000000';

    // Configure the submit button of the confirmation sheet.
    config.useCase.submitButton.text = 'Submit';
    config.useCase.submitButton.foreground.color = '#FFFFFF';
    config.useCase.submitButton.background.fillColor = '#C8193C';

    // Configure other parameters pertaining to single-scanning mode as needed.

    return await startBarcodeScanner(config);
  }

  // ----------------------
  // Multi Barcode Scanner
  // ----------------------
  public startMultiBarcodeScanner = async () => {
    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Initialize the use case for multiple scanning.
    config.useCase = new MultipleScanningMode();

    // Set the counting mode.
    config.useCase.mode = 'COUNTING';

    // Set the sheet mode for the barcodes preview.
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';

    // Set the height for the collapsed sheet.
    config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

    // Enable manual count change.
    config.useCase.sheetContent.manualCountChangeEnabled = true;

    // Set the delay before the same barcode counting repeat.
    config.useCase.countingRepeatDelay = 1000;

    // Configure the submit button.
    config.useCase.sheetContent.submitButton.text = 'Submit';
    config.useCase.sheetContent.submitButton.foreground.color = '#000000';

    // Implement mapping for the barcode item information
    config.useCase.barcodeInfoMapping.barcodeItemMapper = (
      barcodeItem,
      onResult,
      onError
    ) => {
      /** TODO: process scan result as needed to get your mapped data,
       * e.g. query your server to get product image, title and subtitle.
       * See example below.
       */
      const title = `Some product ${barcodeItem.textWithExtension}`;
      const subtitle = barcodeItem.type ?? 'Unknown';

      // If an image from URL is used, on Android platform INTERNET permission is required.
      const image =
        'https://avatars.githubusercontent.com/u/1454920';
      // To show captured barcode image use BarcodeMappedData.barcodeImageKey
      // const image = BarcodeMappedData.barcodeImageKey;

      /** Call onError() in case of error during obtaining mapped data. */
      if (barcodeItem.textWithExtension == 'Error occurred!') {
        onError();
      } else {
        onResult(
          new BarcodeMappedData({
            title: title,
            subtitle: subtitle,
            barcodeImage: image,
          })
        );
      }
    };
    return await startBarcodeScanner(config);
  }

  // ------------------------
  // Multi AR Barcode Scanner
  // ------------------------
  public startMultiARBarcodeScanner = async () => {
    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Configure the usecase.
    config.useCase = new MultipleScanningMode();
    config.useCase.mode = 'UNIQUE';
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';
    config.useCase.sheet.collapsedVisibleHeight = 'SMALL';
    // Configure AR Overlay.
    config.useCase.arOverlay.visible = true;
    config.useCase.arOverlay.automaticSelectionEnabled = false;
    // Configure other parameters, pertaining to use case as needed.

    // Configure other parameters as needed.

    return await startBarcodeScanner(config);
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
      startScanningTitle: "Scan a German ID Card or Driver's License",
      // Customize colors, text resources, behavior, etc...
      //shouldSavePhotoImageInStorage: true,
      // see further configs...
    };
    return await ScanbotSDK.startGenericDocumentRecognizer(configuration);
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

  // ----------------------------------
  // Apply filter for a selected image
  // ----------------------------------
  public applyImageFilterOnPage = async (scannedPage: Page, imageFilter: ImageFilterEnum) => {
    const filter = this.getFilterInstance(imageFilter);
    return await ScanbotSDK.applyImageFiltersOnPage({
      page: scannedPage,
      filters: [filter!],
    });
  }

  // ---------------------------------------------
  // Return an instance of parametric filter type
  // ---------------------------------------------
  private getFilterInstance = (imageFilter: ImageFilterEnum) => {
    switch (imageFilter) {
      case ImageFilterEnum.ScanbotBinarizationFilter:
        return new ScanbotBinarizationFilter();
      case ImageFilterEnum.CustomBinarizationFilter:
        return new CustomBinarizationFilter({ preset: 'PRESET_1' });
      case ImageFilterEnum.ColorDocumentFilter:
        return new ColorDocumentFilter();
      case ImageFilterEnum.BrightnessFilter:
        return new BrightnessFilter({ brightness: 0.2 });
      case ImageFilterEnum.ContrastFilter:
        return new ContrastFilter({ contrast: 2 });
      case ImageFilterEnum.GrayscaleFilter:
        return new GrayscaleFilter();
      case ImageFilterEnum.WhiteBlackPointFilter:
        return new WhiteBlackPointFilter({ blackPoint: 0.2, whitePoint: 0.8 });
      case ImageFilterEnum.LegacyFilter:
        return new LegacyFilter();
      default:
        break;
    }
  }

  // ---------------------
  // PDF Create Feature
  // ---------------------
  public async createPDF(urls: string[], pageSize: PageSize) {
    return await ScanbotSDK.createPDF({
      imageFileUris: urls,
      options: {
        pageSize: pageSize,
      }
    });
  }

  // ---------------------
  // TIFF Create Feature
  // ---------------------
  public async writeTIFF(urls: string[], binarized: boolean) {
    return await ScanbotSDK.writeTIFF({
      imageFileUris: urls,
      options: {
        binarizationFilter: binarized ? new ScanbotBinarizationFilter() : undefined,
        dpi: 300,
        compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
      },
    });
  }

  // -------------------------
  // SDK License Information
  // -------------------------
  public viewLicenseInfo = async () => {
    return await ScanbotSDK.getLicenseInfo();
  }

  // -------------------------
  // OCR Configuration
  // -------------------------
  public viewOcrConfigs = async () => {
    try {
      return await ScanbotSDK.getOCRConfigs();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  // ----------------------------
  // Clean all data from storage
  // ----------------------------
  public cleanUp = async () => {
    try {
      await ScanbotSDK.cleanup();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
}

export const ScanbotSDKService = new ScanbotService();
