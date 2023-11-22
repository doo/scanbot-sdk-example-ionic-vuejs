import { CoreFeatureIdEnum } from "@/enums/core_feature_id_enum";
import { CoreFeatureModel } from "@/models/core_feature_model";
import { CoreFeatureEnum } from "../enums/core_feature_enum";


export const CORE_FEATURES: CoreFeatureModel [] = [
  {
    id: CoreFeatureIdEnum.DocumentDetector,
    title: "Document Scanner",
    description: "test1",
    items: [
      { key: CoreFeatureEnum.Document, value: "Scan Document" },
      { key: CoreFeatureEnum.ImageResult, value: "View Image Results" },
    ],
  },
  {
    id: CoreFeatureIdEnum.BarcodeDetactor,
    title: "Barcode Scanner & Detector",
    description: "test2",
    items: [
        { key: CoreFeatureEnum.Barcode, value: "Scan QR-/Barcode" },
        { key: CoreFeatureEnum.BatchBarcode, value: "Scan Batch of Barcodes" },
        { key: CoreFeatureEnum.ImportBarcode, value: "Import Image & Detect Barcodes" },
        { key: CoreFeatureEnum.ImportBarcode, value: "Import Images & Detect Barcodes" },
    ],
  },
  {
    id: CoreFeatureIdEnum.DataDetactor,
    title: "Data Detectors",
    description: "test3",
    items: [
        { key: CoreFeatureEnum.MRZ, value: "Scan MRZ" },
        { key: CoreFeatureEnum.EHIC, value: "Scan Health Insurance Card" },
        { key: CoreFeatureEnum.Check, value: "Scan Checks" },
        { key: CoreFeatureEnum.LicensePlate, value: "Scan License Plate" },
        { key: CoreFeatureEnum.MedicalCertificate, value: "Scan Medical Certificate" },
        { key: CoreFeatureEnum.TextData, value: "Scan Text Data" },
        { key: CoreFeatureEnum.GenericDocument, value: "Scan Generic Documents" },
    ],
  },
  {
    id: CoreFeatureIdEnum.Other,
    title: "Test Other SDK API Methods",
    description: "test4",
    items: [
        { key: CoreFeatureEnum.LicenseInfo, value: "View License Info" },
        { key: CoreFeatureEnum.OCRConfig, value: "View OCR Configs" },
        { key: CoreFeatureEnum.LearnMore, value: "Learn More About the Scanbot SDK" },
    ],
  },
];

export const getItemList = (selectedItemId: CoreFeatureIdEnum) => {
  return CORE_FEATURES.find(item => item.id == selectedItemId)?.items!;
}
