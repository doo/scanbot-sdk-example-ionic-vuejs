<template>
    <DataDetectorResultPage title="Check Result" v-bind:dataList="DataDetectorRepository.CheckResult" />
</template>

<script setup lang="ts">
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import DataDetectorResultPage from '../data_detectors/DataDetectorResultPage.vue';
</script>