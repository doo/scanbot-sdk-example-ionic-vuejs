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
import { ScanbotSDKService } from "../services/scanbot-service";

import { CORE_FEATURES } from "../utils/feature-util";

// The onMounted hook can be used to run code after the component has finished the initial rendering and created the DOM nodes.
onMounted(() => {
  ScanbotSDKService.initSdk();
});

// -------------------------
// Item Click Event
// -------------------------
const itemOnClick = (selectedItem: any) => {
  alert(JSON.stringify(selectedItem));
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
