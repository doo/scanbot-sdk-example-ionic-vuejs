import {BarcodeResultField} from "capacitor-plugin-scanbot-sdk";
import {BarcodeItem} from "capacitor-plugin-scanbot-sdk/ui_v2";

export class BarcodeRepository {
    private static barcodes: (BarcodeResultField | BarcodeItem)[] = [];

    public static async addBarcodes(barcodes: (BarcodeResultField | BarcodeItem)[]) {
        if (this.barcodes.length > 0) this.barcodes = [];
        this.barcodes = [...this.barcodes, ...barcodes];
    }

    public static getBarcodes(): (BarcodeResultField | BarcodeItem)[] {
        return this.barcodes;
    }
}
