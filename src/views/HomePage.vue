<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Scanbot SDK Example</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card :button="true" v-for="coreitem in CORE_FEATURES" :key="coreitem.id" @click="itemOnClick(coreitem['id'])">
        <ion-card-header>
          <ion-card-title style="font-size:20px">{{ coreitem.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          {{ coreitem.description }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";

import { ScanbotSDKService } from '../services/scanbot-service';
import { CORE_FEATURES } from "../utils/data_util";
import { CoreFeatureIdEnum } from "@/enums/core_feature_id_enum";
import { ShowAlert } from "@/services/alert_service";

const router = useRouter();

onMounted(async () => {
  await ScanbotSDKService.initSdk();
});

// -----------------
// Item Click Event
// -----------------
const itemOnClick = async (selectedItem: CoreFeatureIdEnum) => {
  switch (selectedItem) {
    case CoreFeatureIdEnum.DocumentDetector: {
      await router.push('/document_scanner/' + selectedItem);
      break;
    }
    case CoreFeatureIdEnum.BarcodeDetactor: {
      await router.push('/barcode_scanner/' + selectedItem);
      break;
    }
    case CoreFeatureIdEnum.DataDetactor: {
      await router.push('/data_detector/' + selectedItem);
      break;
    }
    case CoreFeatureIdEnum.Other: {
      await router.push('/more_feature/' + selectedItem);
      break;
    }
    default: {
      await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
      break;
    }
  }
};
</script>