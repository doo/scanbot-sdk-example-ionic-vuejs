<template>
  <CoreFeatureItemsView title="Scan Documents" v-bind:coreItems="coreItems" :onItemClick="onItemClick"/>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

import {GetItemList} from '@/utils/data_util';
import {CoreFeatureIdEnum} from '@/enums/core_feature_id_enum';
import {CoreFeatureEnum} from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import {ScanbotSDKService} from '@/services/scanbot-service';
import {StorageService} from '@/services/storage_service';
import {ShowAlert} from '@/services/alert_service';
import {onBeforeMount} from "vue";

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] | undefined = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onBeforeMount(() => {
  coreItems = GetItemList(selectedItemId);
});

/** Start document scanner for capture documents */
const startDocumentScanner = async () => {
  if (!await ScanbotSDKService.validateLicense()) return;

  try {
    const documentResult = await ScanbotSDKService.startDocumentScanner();
    if (documentResult.status == 'OK') {
      await StorageService.INSTANCE.addPages(documentResult.pages);
      await router.push('/image_preview');
    } else {
      await ShowAlert('Information', 'Document scanner has been canceled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
  }
}

/** Start finder document scanner for capture documents */
const startFinderDocumentScanner = async () => {
  if (!await ScanbotSDKService.validateLicense()) return;

  try {
    const finderDocumentResult = await ScanbotSDKService.startFinderDocumentScanner();
    if (finderDocumentResult.status == 'OK') {
      await StorageService.INSTANCE.addPages(finderDocumentResult.pages);
      await router.push('/image_preview');
    } else {
      await ShowAlert('Information', 'Finder Document scanner has been canceled.', ['OK']);
      return;
    }
  } catch (error) {
    await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
  }
}

// -----------------
// Item Click Event
// -----------------
const onItemClick = async (selectedItem: CoreFeatureEnum) => {
  switch (selectedItem) {
    case CoreFeatureEnum.Document: {
      await startDocumentScanner();
      break;
    }
    case CoreFeatureEnum.FinderDocument: {
      await startFinderDocumentScanner();
      break;
    }
    case CoreFeatureEnum.ImageResult: {
      if (!await ScanbotSDKService.validateLicense()) return;
      await router.push('/image_preview');
      break;
    }
    default: {
      await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
      break;
    }
  }
}
</script>
