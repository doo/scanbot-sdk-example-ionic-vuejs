<template>
    <DataDetectorResultPage title="MRZ Result" v-bind:dataList="mrzResult?.fields!" />
</template>

<script setup lang="ts">
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { onIonViewDidEnter } from '@ionic/vue';
import { MrzResult } from 'capacitor-plugin-scanbot-sdk';
import { ref } from 'vue';

import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';

let mrzResult = ref<MrzResult>();

onIonViewDidEnter(() => {
    mrzResult = JSON.parse(DataDetectorRepository.DataResult);
});

</script>