<template>
    <CoreFeatureItemsView title="Other Features" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { GetItemList } from '../../../utils/data_util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { ShowAlert } from '@/services/alert_service';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onMounted(() => {
    coreItems = GetItemList(selectedItemId);
});

const getLicenseInfo = async () => {
    try {
        const licenseInfo = await ScanbotSDKService.viewLicenseInfo();
        await ShowAlert('License Info', JSON.stringify(licenseInfo), ['OK']);
    } catch (error) {
        await ShowAlert('License Info', JSON.stringify(error), ['OK']);
    }
}

const getOCRInfo = async () => {
    try {
        const ocrInfo = await ScanbotSDKService.viewOcrConfigs();
        await ShowAlert('OCR Info', JSON.stringify(ocrInfo), ['OK']);
    } catch (error) {
        await ShowAlert('OCR Info', JSON.stringify(error), ['OK']);
    }
}

const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.LicenseInfo: {
            await getLicenseInfo();
            break;
        }
        case CoreFeatureEnum.OCRConfig: {
            //await getOCRInfo(); // broken will fix in 2.2.4
            break;
        }
        case CoreFeatureEnum.LearnMore: {
            window.location.href = String('https://scanbot.io');
            break;
        }
        default: {
            //statements;
            break;
        }
    }
}
</script>