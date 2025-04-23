import {CoreFeatureIdEnum} from "@/enums/core_feature_id_enum";
import {CoreFeatureModel} from "@/models/core_feature_model";
import {CoreFeatureEnum} from "@/enums/core_feature_enum";
import {PDFPageSizeEnum} from "@/enums/pdf_page_size_enum";
import {TiffOptionsEnum} from "@/enums/tiff_option_enum";
import {ImageFilterEnum} from "@/enums/filter_enum";

export const CORE_FEATURES: CoreFeatureModel[] = [
    {
        id: CoreFeatureIdEnum.DocumentDetector,
        title: "Document Scanner",
        description: "The Scanbot SDK provides a Ready-To-Use UI screen component for document scanning.",
        items: [
            {key: CoreFeatureEnum.Document, value: "Scan Document"},
            {key: CoreFeatureEnum.FinderDocument, value: "Finder Document Scanner"},
            {key: CoreFeatureEnum.ImageResult, value: "View Image Results"},
        ],
    },
    {
        id: CoreFeatureIdEnum.BarcodeDetector,
        title: "Barcode Scanner & Detector",
        description: "The Scanbot SDK provides a Ready-To-Use UI screen component for Barcode and QR-Code scanning.",
        items: [
            {key: CoreFeatureEnum.SingleBarcode, value: "RTU UI Single Scanning"},
            {key: CoreFeatureEnum.MultiBarcode, value: "RTU UI Multi Scanning"},
            {key: CoreFeatureEnum.MultiARBarcode, value: "RTU UI Multi AR Scanning"},
            {key: CoreFeatureEnum.ImportBarcodeImage, value: "Import Image & Detect Barcodes"},
        ],
    },
    {
        id: CoreFeatureIdEnum.DataDetector,
        title: "Data Detectors",
        description: "The Scanbot SDK provides a Ready-To-Use UI screen component for detect data from MRZ, ID CARDS, EHIC, etc... ",
        items: [
            {key: CoreFeatureEnum.MRZ, value: "Scan MRZ"},
            {key: CoreFeatureEnum.EHIC, value: "Scan Health Insurance Card"},
            {key: CoreFeatureEnum.Check, value: "Scan Checks"},
            {key: CoreFeatureEnum.LicensePlate, value: "Scan License Plate"},
            {key: CoreFeatureEnum.MedicalCertificate, value: "Scan Medical Certificate"},
            {key: CoreFeatureEnum.TextData, value: "Scan Text Data"},
            {key: CoreFeatureEnum.GenericDocument, value: "Scan Generic Documents"},
        ],
    },
    {
        id: CoreFeatureIdEnum.Other,
        title: "Test Other SDK API Methods",
        description: "The Scanbot SDK provides more API methods.",
        items: [
            {key: CoreFeatureEnum.LicenseInfo, value: "View License Info"},
            {key: CoreFeatureEnum.OCR_CONFIGS, value: "OCR Configs"},
            {key: CoreFeatureEnum.LearnMore, value: "Learn More About the Scanbot SDK"},
        ],
    },
];

export const GetItemList = (selectedItemId: CoreFeatureIdEnum) => {
    return CORE_FEATURES.find(item => item.id == selectedItemId)?.items;
}

export const PDFPageSizeList = [
    {key: PDFPageSizeEnum.A3, value: "A3"},
    {key: PDFPageSizeEnum.A4, value: "A4"},
    {key: PDFPageSizeEnum.A5, value: "A5"},
    {key: PDFPageSizeEnum.B4, value: "B4"},
    {key: PDFPageSizeEnum.B5, value: "B5"},
    {key: PDFPageSizeEnum.COMM10, value: "COMM10"},
    {key: PDFPageSizeEnum.CUSTOM, value: "CUSTOM"},
    {key: PDFPageSizeEnum.EXECUTIVE, value: "EXECUTIVE"},
    {key: PDFPageSizeEnum.LEGAL, value: "LEGAL"},
    {key: PDFPageSizeEnum.LETTER, value: "LETTER"},
    {key: PDFPageSizeEnum.US4x6, value: "US4x6"},
    {key: PDFPageSizeEnum.US4x8, value: "US4x8"},
    {key: PDFPageSizeEnum.US5x7, value: "US5x7"},
];

export const TiffOptions = [
    {key: TiffOptionsEnum.Binarized, value: "Binarized Images (1-bit)"},
    {key: TiffOptionsEnum.Color, value: "Color Images"},
];

export const FilterOptions = [
    {key: ImageFilterEnum.ScanbotBinarizationFilter, value: "Scanbot Binarization"},
    {key: ImageFilterEnum.CustomBinarizationFilter, value: "Custom Binarization"},
    {key: ImageFilterEnum.ColorDocumentFilter, value: "Color Document"},
    {key: ImageFilterEnum.BrightnessFilter, value: "Brightness"},
    {key: ImageFilterEnum.ContrastFilter, value: "Contrast"},
    {key: ImageFilterEnum.GrayscaleFilter, value: "Grayscale"},
    {key: ImageFilterEnum.WhiteBlackPointFilter, value: "White Black Point"},
    {key: ImageFilterEnum.LegacyFilter, value: "Legacy"},
];
