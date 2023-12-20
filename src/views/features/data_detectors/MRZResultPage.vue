<template>
    <DataDetectorResultPage title="MRZ Result" v-bind:dataList="mrzResult?.fields!" />
</template>

<script setup lang="ts">
import { onIonViewDidEnter } from '@ionic/vue';
import { ref } from 'vue';

import { MrzResult } from 'capacitor-plugin-scanbot-sdk';
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';

let mrzResult = ref<MrzResult>();

onIonViewDidEnter(() => {
    mrzResult.value = DataDetectorRepository.MrzResult;
});
</script>