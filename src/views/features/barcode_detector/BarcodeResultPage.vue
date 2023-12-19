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
                    <ion-label>
                        <h3>{{ barcode.type }}</h3>
                        <p>{{ barcode.text }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref } from 'vue';

import { BarcodeResultField } from 'capacitor-plugin-scanbot-sdk';
import { BarcodeRepository } from '@/utils/barcode_repository';

let barcodes = ref<BarcodeResultField[]>([]);

onIonViewDidEnter(() => {
    barcodes.value = BarcodeRepository.getBarcodes();
});
</script>