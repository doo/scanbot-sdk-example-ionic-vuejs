<template>
  <DataDetectorResultPage title="MRZ Result" v-bind:dataList="mrzResult!"/>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';

import {DataDetectorRepository} from '@/utils/data_detector_repository';
import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';

const mrzResult = ref<{ name: string; value: string; }[]>();

onBeforeMount(() => {
  mrzResult.value = DataDetectorRepository.MrzResult;
});
</script>
