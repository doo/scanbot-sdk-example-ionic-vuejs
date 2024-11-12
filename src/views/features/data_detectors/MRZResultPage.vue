<template>
    <DataDetectorResultPage title="MRZ Result" v-bind:dataList="mrzResult!" />
</template>

<script setup lang="ts">
import { onIonViewDidEnter } from '@ionic/vue';
import { ref } from 'vue';

import { DataDetectorRepository } from '@/utils/data_detector_repository';
import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';

let mrzResult = ref<{ name: string; value: string; }[]>();

onIonViewDidEnter(() => {
    mrzResult.value = DataDetectorRepository.MrzResult;
});
</script>