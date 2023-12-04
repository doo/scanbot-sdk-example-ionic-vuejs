<template>
    <CoreFeatureItemsView title="Date Detectors" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
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
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { CheckRecognizerResult, CheckRecognizerResultField, HealthInsuranceCardScannerResult } from 'capacitor-plugin-scanbot-sdk';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onMounted(() => {
    coreItems = getItemList(selectedItemId);
});

const startMRZScanner = async () => {
    const mrzResult = await ScanbotSDKService.startMrzScanner();
    DataDetectorRepository.DataResult = JSON.stringify(mrzResult);
    await router.push('/mrz_result');
}

const startEHICScanner = async () => {
    const ehicResult = await ScanbotSDKService.startEHICScanner();
    DataDetectorRepository.DataResult = JSON.stringify(ehicResult);
    parseResult(ehicResult!);
    await router.push('/ehic_result');
    
}

const parseResult = (result: HealthInsuranceCardScannerResult) => {
    console.log('start');
    console.log(JSON.stringify(result));
    const newFields: { name: string, value: string }[] = []
    result.fields.map(item => {
        newFields.push({
            name: item.type,
            value: item.value
        });
    });
    DataDetectorRepository.EHICResult = newFields;
    console.log(JSON.stringify(newFields));
}

const startCheckScanner = async () => {
    const result = await ScanbotSDKService.startCheckRecognizer();

    DataDetectorRepository.parseResult(result!);

    await router.push('/check_result');
}

const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.MRZ: {
            await startMRZScanner();
            break;
        }
        case CoreFeatureEnum.EHIC: {
            await startEHICScanner();
            break;
        }
        case CoreFeatureEnum.Check: {
            await startCheckScanner();
            break;
        }
        default: {
            //statements;
            break;
        }
    }
}
</script>