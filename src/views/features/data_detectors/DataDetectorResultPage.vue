<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ props.title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item v-for="item in props.dataList" :key="item.name">
                <ion-label>
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.value }}</p>
                </ion-label>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, IonItem, IonLabel } from '@ionic/vue';

//let ehicResult = ref<HealthInsuranceCardScannerResult>();

onIonViewDidEnter(() => {
    //ehicResult = JSON.parse(DataDetectorRepository.DataResult);
    //parseResult(ehicResult.value!);
});

interface Props {
    title: string
    dataList: { name: any; value: any; }[]
}

const props = defineProps<Props>();

</script>

<style scoped>
ion-label {
    display: block;
    text-align: center;
}
</style>