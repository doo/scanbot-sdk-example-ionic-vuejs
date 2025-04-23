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
        <ion-item :detail="false" v-for="barcode in barcodes" :key="barcode.textWithExtension + barcode.type">
          <CommonLabel v-bind:title="barcode.type!" v-bind:value="barcode.textWithExtension"/>
        </ion-item>
      </ion-list>

      <!-- display empty view when no barcodes detected -->
      <CommonEmptyView message="No barcodes detected, Please try again!" v-bind:hidden="isEmptyTextHidden"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {onBeforeMount, ref} from 'vue';

import {BarcodeRepository} from '@/utils/barcode_repository';
import CommonLabel from '@/views/common_views/CommonLabel.vue';
import {BarcodeItem} from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';
import {BarcodeResultField} from "capacitor-plugin-scanbot-sdk";
import CommonEmptyView from "@/views/common_views/CommonEmptyView.vue";

const barcodes = ref<(BarcodeResultField | BarcodeItem)[]>([]);
const isEmptyTextHidden = ref<boolean>(true);

onBeforeMount(() => {
  barcodes.value = BarcodeRepository.getBarcodes();
  isEmptyTextHidden.value = barcodes.value.length > 0;
});
</script>
