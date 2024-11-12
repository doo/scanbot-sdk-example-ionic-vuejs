export class BarcodeRepository {
    private static barcodes: any = [];

    public static async addBarcodes(barcodes: any) {
        if (this.barcodes.length > 0) this.barcodes = [];
        this.barcodes = this.barcodes.concat(barcodes);
    }

    public static getBarcodes(): any {
        return this.barcodes;
    }
}