import { StorageService } from "@/services/storage_service";
import { ScanbotSDKService } from "@/services/scanbot-service";
import { ShowAlert } from "@/services/alert_service";

export default class MainPageViewModel {
    public async openDocumentScanner() {
        const documentScannerResult = await ScanbotSDKService.startDocumentScanner();

        if (documentScannerResult?.status === 'CANCELED') {
            //await ShowAlert('Information', 'Document scanner has been canceled.', ['OK'],);
            return;
        }

        // alert('hello1');
        // StorageService.getInstance.addPages(documentScannerResult!.pages);
    }

    public async TestMethod() {
        const documentScannerResult = await ScanbotSDKService.startDocumentScanner();

        if(documentScannerResult?.status == 'CANCELED') {
            return;
        }
    }
}

export const MainViewModel = new MainPageViewModel();