<template>
    <CoreFeatureItemsView title="Scan Barcodes" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getItemList } from '../../../utils/feature-util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';
import { ScanbotSDKService } from '@/services/scanbot-service';
import { BarcodeRepository } from '@/utils/barcode_repository';
import { BarcodeResultField } from 'capacitor-plugin-scanbot-sdk';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onMounted(() => {
    coreItems = getItemList(selectedItemId);
});

const startBarcodeScanner = async () => {
    const barcodeResult = await ScanbotSDKService.startBarcodeScanner();
    await navigateToBarcodeResultPage(barcodeResult?.barcodes!);
}

const startBatchBarcodeScanner = async () => {
    const batchBarcodeResult = await ScanbotSDKService.startBatchBarcodeScanner();
    await navigateToBarcodeResultPage(batchBarcodeResult?.barcodes!);
}

const detectBarcodesFromImage = async () => {
    try {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos,
        });

        const originalImageFileUri = image.path!;

        const result = await ScanbotSDKService.detectBarcodesOnImage(originalImageFileUri);

        await navigateToBarcodeResultPage(result!.barcodes);
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

const detectBarcodeFromImages = async () => {
    try {
        const barcodes: BarcodeResultField[] = [];
        const originalImageFileUrls: string[] = [];
        const pickedImageResults = await Camera.pickImages({
            quality: 80,
        });

        pickedImageResults.photos.forEach(photo => {
            originalImageFileUrls.push(photo.path!);
        });

        const result = await ScanbotSDKService.detectBarcodesOnImages(originalImageFileUrls);

        result?.results!.forEach(element => {
            element.barcodeResults.forEach(barcode => {
                barcodes.push(barcode);
            });
        });

        await navigateToBarcodeResultPage(barcodes);
    } catch (error) {

    }
}

const navigateToBarcodeResultPage = async (barcodes: BarcodeResultField[]) => {
    await BarcodeRepository.addBarcodes(barcodes);
    await router.push('/barcode_result');
}

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
            //statements;
            break;
        }
    }
}
</script>