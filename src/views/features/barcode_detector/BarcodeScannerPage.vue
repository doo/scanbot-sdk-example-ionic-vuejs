<template>
    <CoreFeatureItemsView title="Scan Barcodes" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onIonViewWillEnter } from '@ionic/vue';
import { BarcodeResultField } from 'capacitor-plugin-scanbot-sdk';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { ShowAlert } from '@/services/alert_service';
import { GetItemList } from '../../../utils/data_util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';
import { BarcodeRepository } from '@/utils/barcode_repository';
import { PickImage, PickImages } from '@/utils/camera_util';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onIonViewWillEnter(() => {
    coreItems = GetItemList(selectedItemId);
});

/** Scan barcodes */
const startBarcodeScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const barcodeResult = await ScanbotSDKService.startBarcodeScanner();
        if (barcodeResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Barcode Scanner has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(barcodeResult?.barcodes!);
    }
    catch (error) {
        await ShowAlert('Scan Barcodes Failed', JSON.stringify(error), ['OK']);
    }
}

/** Scan batch barcodes */
const startBatchBarcodeScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const batchBarcodeResult = await ScanbotSDKService.startBatchBarcodeScanner();
        if (batchBarcodeResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Batch Barcode Scanner has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(batchBarcodeResult?.barcodes!);
    }
    catch (error) {
        await ShowAlert('Scan Barcodes Failed', JSON.stringify(error), ['OK']);
    }
}

/** Detect barcodes from a imported image */
const detectBarcodesFromImage = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const originalImageFileUri = await PickImage();

        const detectedBarcodesResult = await ScanbotSDKService.detectBarcodesOnImage(originalImageFileUri);
        if (detectedBarcodesResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Barcode detector has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(detectedBarcodesResult!.barcodes);
    }
    catch (error) {
        await ShowAlert('Detect Barcodes Failed', 'Please try again!', ['OK']);
    }
}

/** Detect barcodes from imported images */
const detectBarcodeFromImages = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const barcodes: BarcodeResultField[] = [];
        const originalImageFileUrls: string[] = [];
        const pickedPhotos = await PickImages();

        pickedPhotos.forEach(photo => {
            originalImageFileUrls.push(photo.path!);
        });

        const detectedBarcodesResult = await ScanbotSDKService.detectBarcodesOnImages(originalImageFileUrls);
        if (detectedBarcodesResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Barcode detector has been cancelled.', ['OK']);
            return;
        };

        detectedBarcodesResult?.results!.forEach(element => {
            element.barcodeResults.forEach(barcode => {
                barcodes.push(barcode);
            });
        });
        await navigateToBarcodeResultPage(barcodes);
    }
    catch (error) {
        await ShowAlert('Detect Barcodes Failed', 'Please try again!', ['OK']);
    }
}

/** Navigate to barcode result page */
const navigateToBarcodeResultPage = async (barcodes: BarcodeResultField[]) => {
    try {
        await BarcodeRepository.addBarcodes(barcodes);
        await router.push('/barcode_result');
    } 
    catch (error) {
        await ShowAlert('Navigate to barcode result page failed', JSON.stringify(error), ['OK']);
    }
}

// -----------------
// Item Click Event
// -----------------
const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.Barcode: {
            await startBarcodeScanner();
            break;
        }
        case CoreFeatureEnum.BatchBarcode: {
            await startBatchBarcodeScanner();
            break;
        }
        case CoreFeatureEnum.ImportBarcodeImage: {
            await detectBarcodesFromImage();
            break;
        }
        case CoreFeatureEnum.ImportBarcodeImages: {
            await detectBarcodeFromImages();
            break;
        }
        default: {
            await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
            break;
        }
    }
}
</script>