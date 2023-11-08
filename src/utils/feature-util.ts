import { CoreFeatureEnum } from "../enums/core_feature_enum";

export const CORE_FEATURES = [
  {
    title: "Document Scanner",
    items: [
      { key: CoreFeatureEnum.Document, value: "Scan Document" },
      { key: CoreFeatureEnum.ImageResult, value: "View Image Results" },
    ],
  },
  {
    title: "Barcode Scanner & Detector",
    items: [
        { key: CoreFeatureEnum.Barcode, value: "Scan QR-/Barcode" },
        { key: CoreFeatureEnum.BatchBarcode, value: "Scan Batch of Barcodes" },
        { key: CoreFeatureEnum.ImportBarcode, value: "Import Image & Detect Barcodes" },
        { key: CoreFeatureEnum.ImportBarcode, value: "Import Images & Detect Barcodes" },
    ],
  },
  {
    title: "Data Detectors",
    items: [
        { key: CoreFeatureEnum.MRZ, value: "Scan MRZ" },
        { key: CoreFeatureEnum.EHIC, value: "Scan Health Insurance Card" },
        { key: CoreFeatureEnum.Check, value: "Scan Checks" },
        { key: CoreFeatureEnum.LicensePlate, value: "Scan License Plate" },
        { key: CoreFeatureEnum.TextData, value: "Scan Data" },
        { key: CoreFeatureEnum.GenericDocument, value: "Scan Generic Documents" },
    ],
  },
  {
    title: "Test Other SDK API Methods",
    items: [
        { key: CoreFeatureEnum.LicenseInfo, value: "View License Info" },
        { key: CoreFeatureEnum.OCRConfig, value: "View OCR Configs" },
        { key: CoreFeatureEnum.LearnMore, value: "Learn More About the Scanbot SDK" },
    ],
  },
];
