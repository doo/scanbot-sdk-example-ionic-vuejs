<template>
    <DataDetectorResultPage title="EHIC Result" v-bind:dataList="DataDetectorRepository.EHICResult" />
</template>

<script setup lang="ts">
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';
</script>