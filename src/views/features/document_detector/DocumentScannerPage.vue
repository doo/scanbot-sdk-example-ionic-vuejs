<template>
    <CoreFeatureItemsView title="Scan Documents" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';

import { GetItemList } from '../../../utils/data_util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import { onIonViewWillEnter } from '@ionic/vue';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onIonViewWillEnter(() => {
    coreItems = GetItemList(selectedItemId);
});

/** Start document scanner for capture documents */
const startDocumentScanner = async () => {
    if (!await ScanbotSDKService.validateLicense()) return;
    try {
        const documentResult = await ScanbotSDKService.startDocumentScanner();
        if (documentResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Document scanner has been canceled.', ['OK']);
            return;
        };
        await StorageService.INSTANCE.addPages(documentResult!.pages);
        await router.push('/image_preview');
    } 
    catch (error) {
        await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
    }
}

/** Start finder socument scanner for capture documents */
const startFinderDocumentScanner = async () => {
    if (!await ScanbotSDKService.validateLicense()) return;
    try {
        const finderDocumentResult = await ScanbotSDKService.startFinderDocumentScanner();
        if (finderDocumentResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Finder Document scanner has been canceled.', ['OK']);
            return;
        };
        await StorageService.INSTANCE.addPages(finderDocumentResult!.pages);
        await router.push('/image_preview');
    } 
    catch (error) {
        await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
    }
}

// -----------------
// Item Click Event
// -----------------
const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.Document: {
            await startDocumentScanner();
            break;
        }
        case CoreFeatureEnum.FinderDocument: {
            await startFinderDocumentScanner();
            break;
        }
        case CoreFeatureEnum.ImageResult: {
            if (!await ScanbotSDKService.validateLicense()) return;
            await router.push('/image_preview');
            break;
        }
        default: {
            await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
            break;
        }
    }
}
</script>