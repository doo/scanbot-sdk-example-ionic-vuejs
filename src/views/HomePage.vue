<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Scanbot SDK Example</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card :button="true" color="secondary" v-for="coreitem in CORE_FEATURES" :key="coreitem.id"
        @click="itemOnClick(coreitem['id'])">
        <ion-card-header>
          <ion-card-title>{{ coreitem.title }}</ion-card-title>
          <ion-card-subtitle>{{ coreitem.description }}</ion-card-subtitle>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonItemGroup,
  IonCol,
  IonGrid,
  IonRow,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonButton,
} from "@ionic/vue";

import { ScanbotSDKService } from '../services/scanbot-service';

import { CORE_FEATURES } from "../utils/feature-util";
import { CoreFeatureIdEnum } from "@/enums/core_feature_id_enum";

import { useRouter } from 'vue-router';
const router = useRouter();

// The onMounted hook can be used to run code after the component has finished the initial rendering and created the DOM nodes.
onMounted(() => {
  ScanbotSDKService.initSdk();
});

// -------------------------
// Item Click Event
// -------------------------
const itemOnClick = async (selectedItem: CoreFeatureIdEnum) => {
  switch (selectedItem) {
    case CoreFeatureIdEnum.DocumentDetector: {
      await router.push('/document_scanner/'+ selectedItem);
      break;
    }
    case CoreFeatureIdEnum.BarcodeDetactor: {
      await router.push('/barcode_scanner/'+ selectedItem);
      break;
    }
    case CoreFeatureIdEnum.DataDetactor: {
      break;
    }
    case CoreFeatureIdEnum.Other: {
      break;
    }
    default: {
      //statements;
      break;
    }
  }
};
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
