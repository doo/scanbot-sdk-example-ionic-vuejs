import { CoreFeatureIdEnum } from "@/enums/core_feature_id_enum";
import { CoreFeatureModel } from "@/models/core_feature_model";
import { CoreFeatureEnum } from "../enums/core_feature_enum";
import { PDFPageSizeEnum } from "@/enums/pdf_page_size_enum";
import { TiffOptionsEnum } from "@/enums/tiff_option_enum";

export const CORE_FEATURES: CoreFeatureModel[] = [
  {
    id: CoreFeatureIdEnum.DocumentDetector,
    title: "Document Scanner",
    description: "The Scanbot SDK provides a Ready-To-Use UI screen component for document scanning.",
    items: [
      { key: CoreFeatureEnum.Document, value: "Scan Document" },
      { key: CoreFeatureEnum.ImageResult, value: "View Image Results" },
    ],
  },
  {
    id: CoreFeatureIdEnum.BarcodeDetactor,
    title: "Barcode Scanner & Detector",
    description: "The Scanbot SDK provides a Ready-To-Use UI screen component for Barcode and QR-Code scanning.",
    items: [
      { key: CoreFeatureEnum.Barcode, value: "Scan QR-/Barcode" },
      { key: CoreFeatureEnum.BatchBarcode, value: "Scan Batch of Barcodes" },
      { key: CoreFeatureEnum.ImportBarcodeImage, value: "Import Image & Detect Barcodes" },
      { key: CoreFeatureEnum.ImportBarcodeImages, value: "Import Images & Detect Barcodes" },
    ],
  },
  {
    id: CoreFeatureIdEnum.DataDetactor,
    title: "Data Detectors",
    description: "The Scanbot SDK provides a Ready-To-Use UI screen component for detect data from MRZ, ID CARDS, EHIC, etc... ",
    items: [
      { key: CoreFeatureEnum.MRZ, value: "Scan MRZ" },
      { key: CoreFeatureEnum.EHIC, value: "Scan Health Insurance Card" },
      { key: CoreFeatureEnum.Check, value: "Scan Checks" },
      { key: CoreFeatureEnum.ImportCheckOnImage, value: "Import Image & Detect Check" },
      { key: CoreFeatureEnum.LicensePlate, value: "Scan License Plate" },
      { key: CoreFeatureEnum.MedicalCertificate, value: "Scan Medical Certificate" },
      { key: CoreFeatureEnum.TextData, value: "Scan Text Data" },
      { key: CoreFeatureEnum.GenericDocument, value: "Scan Generic Documents" },
    ],
  },
  {
    id: CoreFeatureIdEnum.Other,
    title: "Test Other SDK API Methods",
    description: "The Scanbot SDK provides more API methods.",
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

export const PDFPageSizeList = [
  { key: PDFPageSizeEnum.FromImage, value: "FROM_IMAGE" },
  { key: PDFPageSizeEnum.FromImage, value: "A4" },
  { key: PDFPageSizeEnum.FromImage, value: "FIXED_A4" },
  { key: PDFPageSizeEnum.FromImage, value: "US_LETTER" },
  { key: PDFPageSizeEnum.FromImage, value: "FIXED_US_LETTER" },
  { key: PDFPageSizeEnum.FromImage, value: "AUTO_LOCALE" },
  { key: PDFPageSizeEnum.FromImage, value: "AUTO" },
];

export const TiffOptions = [
  { key: TiffOptionsEnum.Binarized, value: "Binarized Images (1-bit)" },
  { key: TiffOptionsEnum.Color, value: "Color Images" },
];

export const FilterOptions = [
  { key: "ImageFilterTypeNone", value: 'None' },
  { key: 'ImageFilterTypeColor', value: 'Color Enhanced' },
  { key: "ImageFilterTypeGray", value: 'Gray Scale' },
  { key: 'ImageFilterTypePureGray', value: 'Pure Gray' },
  { key: "ImageFilterTypeBinarized", value: 'Binarized' },
  { key: "ImageFilterTypeColorDocument", value: 'Color Document' },
  { key: "ImageFilterTypePureBinarized", value: 'Pure Binarized' },
  { key: "ImageFilterTypeBackgroundClean", value: 'Background Clean' },
  { key: "ImageFilterTypeBlackAndWhite", value: 'Black and White' },
  { key: 'ImageFilterTypeOtsuBinarization', value: 'OTSU Binarization' },
  { key: 'ImageFilterTypeDeepBinarization', value: 'Deep Binarization' },
  { key: 'ImageFilterTypeEdgeHighlight', value: 'Edge Highlight' },
  { key: 'ImageFilterTypeLowLightBinarization', value: 'Low Light Binarization' },
  { key: 'ImageFilterTypeLowLightBinarization2', value: 'Low Light Binarization 2' },
];
