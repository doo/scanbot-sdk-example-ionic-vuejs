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
        <ion-content>
            <ion-item :button="true" v-for="barcode in barcodes" :key="barcode.text">
                <ion-label>
                    <h3>{{ barcode.type }}</h3>
                    <p>{{ barcode.text }}</p>
                </ion-label>

            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { BarcodeRepository } from '@/utils/barcode_repository';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, IonItem, IonLabel } from '@ionic/vue';
import { BarcodeResultField } from 'capacitor-plugin-scanbot-sdk';
import { ref } from 'vue';

let barcodes = ref<BarcodeResultField[]>([]);

onIonViewDidEnter(() => {
    barcodes.value = BarcodeRepository.getBarcodes();
});

</script>