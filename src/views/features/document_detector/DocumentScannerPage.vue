<template>
    <CoreFeatureItemsView title="Scan Documents" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getItemList } from '../../../utils/feature-util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onMounted(() => {
    coreItems = getItemList(selectedItemId);
});

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
    } catch (error) {
        await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
    }
}

const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.Document: {
            await startDocumentScanner();
            break;
        }
        case CoreFeatureEnum.ImageResult: {
            await router.push('/image_preview');
            break;
        }
        default: {
            //statements;
            break;
        }
    }
}
</script>