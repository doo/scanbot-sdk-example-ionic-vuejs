<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title> Barcode Result</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content color="light">
            <ion-list :inset="true">
                <ion-item :detail="false" v-for="barcode in barcodes">
                    <CommonLabel v-bind:title="barcode.type" v-bind:value="barcode.text" />
                </ion-item>
            </ion-list>

             <!-- display empty view when no barcodes detected -->
            <CommonEmptyView message="No barcodes detected, Please try again!" v-bind:hidden="isEmptyTextHidden" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, IonList, IonItem } from '@ionic/vue';
import { ref } from 'vue';

import { BarcodeResultField } from 'capacitor-plugin-scanbot-sdk';
import { BarcodeRepository } from '@/utils/barcode_repository';
import CommonLabel from '@/views/common_views/CommonLabel.vue';
import CommonEmptyView from '@/views/common_views/CommonEmptyView.vue';

let barcodes = ref<BarcodeResultField[]>([]);
let isEmptyTextHidden = ref<boolean>(true);

onIonViewDidEnter(() => {
    barcodes.value = BarcodeRepository.getBarcodes();
    isEmptyTextHidden.value = barcodes.value.length > 0;
});
</script>