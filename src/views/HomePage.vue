<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Scanbot SDK Example</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item-group v-for="coreitem in CORE_FEATURES" :key="coreitem.title">
        <ion-item-divider color="secondary">
          <ion-label>
            <strong>
              {{ coreitem.title }}
            </strong>
          </ion-label>
        </ion-item-divider>

        <ion-item
          :button="true"
          v-for="item in coreitem.items"
          :key="item['key']"
          @click="itemOnClick(item['key'])"
        >
          <ion-label> {{ item["value"] }} </ion-label>
        </ion-item>
      </ion-item-group>
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
} from "@ionic/vue";

import { ScanbotSDKService } from '../services/scanbot-service';

import { CORE_FEATURES } from "../utils/feature-util";
import { CoreFeatureEnum } from "../enums/core_feature_enum";

import { useRouter } from 'vue-router';
import { DocumentScannerResult } from "capacitor-plugin-scanbot-sdk";
const router = useRouter();

// The onMounted hook can be used to run code after the component has finished the initial rendering and created the DOM nodes.
onMounted(() => {
  ScanbotSDKService.initSdk();
});

// -------------------------
// Item Click Event
// -------------------------
const itemOnClick = async (selectedItem: CoreFeatureEnum) => {
  switch (selectedItem) {
    case CoreFeatureEnum.Document: {
      alert('hello2');
      //await router.push('/image_preview');
      break;
    }
    case CoreFeatureEnum.ImageResult: {
      break;
    }
    case CoreFeatureEnum.Barcode: {
      await ScanbotSDKService.startBarcodeScanner();
      break;
    }
    case CoreFeatureEnum.BatchBarcode: {
      await ScanbotSDKService.startBatchBarcodeScanner();
      break;
    }
    case CoreFeatureEnum.ImportBarcode: {
      alert("ImportBarcode");
      break;
    }
    case CoreFeatureEnum.MRZ: {
      await ScanbotSDKService.startMrzScanner();
      break;
    }
    case CoreFeatureEnum.EHIC: {
      await ScanbotSDKService.startEHICScanner();
      break;
    }
    case CoreFeatureEnum.MedicalCertificate: {
      await ScanbotSDKService.startMedicalCertificateRecognizer();
      break;
    }
    case CoreFeatureEnum.Check: {
      await ScanbotSDKService.startCheckRecognizer();
      break;
    }
    case CoreFeatureEnum.LicensePlate: {
      await ScanbotSDKService.startLicensePlateScanner();
      break;
    }
    case CoreFeatureEnum.TextData: {
      await ScanbotSDKService.startTextDataScanner();
      break;
    }
    case CoreFeatureEnum.GenericDocument: {
      break;
    }
    case CoreFeatureEnum.LicenseInfo: {
      alert("LicenseInfo");
      break;
    }
    case CoreFeatureEnum.OCRConfig: {
      alert("OCRConfig");
      break;
    }
    case CoreFeatureEnum.LearnMore: {
      alert("LearnMore");
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
