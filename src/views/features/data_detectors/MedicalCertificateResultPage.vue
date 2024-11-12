<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title> Med Result </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content color="light">
            <ion-list :inset="true">
                <ion-item-group v-for="medItem in medicalCertifacteResult" :key="medItem.title">
                    <ion-list-header color="primary">
                        <ion-label style="font-size: 18px;">{{ medItem.title }}</ion-label>
                    </ion-list-header>

                    <ion-item v-for="item in medItem.items" :key="item.key">
                        <CommonLabel v-bind:title="item.key" v-bind:value="item.value" />
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemGroup, IonItem, IonLabel, IonList, IonListHeader, onIonViewWillEnter } from '@ionic/vue';
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import CommonLabel from '@/views/common_views/CommonLabel.vue';

let medicalCertifacteResult: { title: string; items: { key: string; value: string; }[]; }[] = [];

onIonViewWillEnter(async () => {
    medicalCertifacteResult = DataDetectorRepository.MedResult;
});

</script>