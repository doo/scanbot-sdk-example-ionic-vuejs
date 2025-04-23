<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Image Edit View</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" color="light">
      <ion-card>
        <ion-img v-bind:src="imageURL"/>
      </ion-card>
    </ion-content>

    <ion-footer>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button @click="startCroppingScreen()">Crop</ion-button>

          <ion-button id="open-filter-option" expand="block">Filter</ion-button>
          <CommonModalView trigger="open-filter-option" title="Filter Options"
                           v-bind:optionList="FilterOptions" :onItemClick="onFilterSelected" ref="filterOptionModal"/>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {onBeforeMount, ref} from 'vue';
import {useRouter} from 'vue-router';

import {Page} from 'capacitor-plugin-scanbot-sdk';
import {ScanbotSDKService} from '@/services/scanbot-service';
import {StorageService} from '@/services/storage_service';
import {ShowAlert} from '@/services/alert_service';
import CommonModalView from '../../common_views/CommonModalView.vue';
import {FilterOptions} from '@/utils/data_util';
import {Capacitor} from '@capacitor/core';
import {ImageFilterEnum} from '@/enums/filter_enum';

const router = useRouter();
const selectedPageId = router.currentRoute.value.params.selectedPageId as unknown as string;
let selectedPage: any = null;

const imageURL = ref<string>();
const filterOptionModal = ref();

onBeforeMount(async () => {
  await loadData();
});

/* load selected image */
const loadData = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    selectedPage = StorageService.INSTANCE.getPageById(selectedPageId);
    imageURL.value = Capacitor.convertFileSrc(selectedPage?.documentImageFileUri);
  } catch (error) {
    await ShowAlert('Load Selected Image Failed', JSON.stringify(error), ['OK'],);
  }
}

/* Update cropped or filtered image */
const updatePage = async (page: Page) => {
  await StorageService.INSTANCE.updatePage(page);
  await loadData();
}

/* Start the cropping screen */
const startCroppingScreen = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const croppingResult = await ScanbotSDKService.startCroppingScreen(selectedPage);

    if (croppingResult!.status == 'OK') {
      await updatePage(croppingResult.page);
    } else {
      await ShowAlert('Information', 'Cropping screen has been cancelled.', ['OK']);
    }

  } catch (error) {
    await ShowAlert('Start cropping screen Failed', JSON.stringify(error), ['OK']);
  }
}

/* Apply filter to the image */
const onFilterSelected = async (selectedFilterItem: ImageFilterEnum) => {
  if (!(await ScanbotSDKService.validateLicense())) {
    filterOptionModal.value.cancel();
    return;
  }

  try {
    const filteredResult = await ScanbotSDKService.applyImageFilterOnPage(
        selectedPage,
        selectedFilterItem
    );

    filterOptionModal.value.cancel();
    if (filteredResult!.status == 'OK') {
      await updatePage(filteredResult);
    } else {
      await ShowAlert('Information', 'Image filtering process has been cancelled.', ['OK']);
    }
  } catch (error) {
    filterOptionModal.value.cancel();
    await ShowAlert('Image filtering process Failed', JSON.stringify(error), ['OK']);
  }
}
</script>
