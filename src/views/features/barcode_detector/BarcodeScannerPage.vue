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
import { dismissLoading, showLoading } from '@/utils/loading_util';
import { BarcodeItem } from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onIonViewWillEnter(() => {
    coreItems = GetItemList(selectedItemId);
});

/** Start RTU UI Single Scanner */
const startSingleBarcodeScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const barcodeResult = await ScanbotSDKService.startSingleBarcodeScanner();
        if (barcodeResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Barcode Scanner has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(barcodeResult?.items!);
    }
    catch (error) {
        await ShowAlert('Scan Barcodes Failed', JSON.stringify(error), ['OK']);
    }
}

/** Start RTU UI Multi Barcode Scanner */
const startMultiBarcodeScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const batchBarcodeResult = await ScanbotSDKService.startMultiBarcodeScanner();
        if (batchBarcodeResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Batch Barcode Scanner has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(batchBarcodeResult?.items!);
    }
    catch (error) {
        await ShowAlert('Scan Barcodes Failed', JSON.stringify(error), ['OK']);
    }
}

/** Start RTU UI Multi AR Overlay Barcode Scanner */
const startMultiAROverlayBarcodeScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const batchBarcodeResult = await ScanbotSDKService.startMultiARBarcodeScanner();
        if (batchBarcodeResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Batch Barcode Scanner has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(batchBarcodeResult?.items!);
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
        await showLoading();
        const detectedBarcodesResult = await ScanbotSDKService.detectBarcodesOnImage(originalImageFileUri);
        await dismissLoading();
        if (detectedBarcodesResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Barcode detector has been cancelled.', ['OK']);
            return;
        };
        await navigateToBarcodeResultPage(detectedBarcodesResult!.barcodes);
    }
    catch (error) {
        await dismissLoading();
        await ShowAlert('Detect Barcodes Failed', 'Please try again!', ['OK']);
    }
}

/** Navigate to barcode result page */
const navigateToBarcodeResultPage = async (barcodes: any) => {
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
        case CoreFeatureEnum.SingleBarcode: {
            await startSingleBarcodeScanner();
            break;
        }
        case CoreFeatureEnum.MultiBarcode: {
            await startMultiBarcodeScanner();
            break;
        }
        case CoreFeatureEnum.MultiARBarcode: {
            await startMultiAROverlayBarcodeScanner();
            break;
        }
        case CoreFeatureEnum.ImportBarcodeImage: {
            await detectBarcodesFromImage();
            break;
        }
        default: {
            await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
            break;
        }
    }
}
</script>