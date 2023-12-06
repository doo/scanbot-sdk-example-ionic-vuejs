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
                <ion-img v-bind:src="imageURL" />
            </ion-card>
        </ion-content>

        <ion-footer>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="startCroppingScreen()">Crop</ion-button>

                    <ion-button id="open-filter-option" expand="block">Filter</ion-button>
                    <CommonModalView trigger="open-filter-option" title="Filter Options" v-bind:optionList="FilterOptions"
                        :onItemClick="onFilterSelected" ref="filterOptionModal" />
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonImg, IonCard, onIonViewWillEnter } from '@ionic/vue';
import { ImageFilterType, Page } from 'capacitor-plugin-scanbot-sdk';
import { onMounted, ref } from 'vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import CommonModalView from '../../common_views/CommonModalView.vue';
import { FilterOptions } from '@/utils/feature-util';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedPageId = router.currentRoute.value.params.selectedPageId as unknown as string;
let selectedPage: any = null;

let imageURL = ref<string>();
const filterOptionModal = ref();

onIonViewWillEnter(async () => {
    await loadData();
});

/* load selected image */
const loadData = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        selectedPage = StorageService.INSTANCE.getPageById(selectedPageId);
        imageURL.value = await ScanbotSDKService.getImageData(selectedPage?.documentImageFileUri!);
    }
    catch (error) {
        ShowAlert('Load Selected Image Failed', JSON.stringify(error), ['OK'],);
    }
}

/* Update cropped or filtered image */
const updatePage = async (page: Page) => {
    await StorageService.INSTANCE.updatePage(page);
    await loadData();
}

/* Start the cropping screen */
const startCroppingScreen = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const croppingResult = await ScanbotSDKService.startCroppingScreen(selectedPage);

        if (croppingResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Cropping screen has been cancelled.', ['OK']);
            return;
        };
        await updatePage(croppingResult.page!);
    }
    catch (error) {
        await ShowAlert('Start cropping screen Failed', JSON.stringify(error), ['OK']);
    }
}

/* Apply filter to the image */
const onFilterSelected = async (selectedFilterItem: string) => {
    if (!(await ScanbotSDKService.validateLicense())) { 
        filterOptionModal.value.cancel();
        return; 
    }

    try {
        const filteredResult = await ScanbotSDKService.applyImageFilterOnPage(
            selectedPage, 
            selectedFilterItem as ImageFilterType
        );

        if (filteredResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Image filtering process has been cancelled.', ['OK']);
            return;
        };
        await updatePage(filteredResult);
        filterOptionModal.value.cancel();
    }
    catch (error) {
        await ShowAlert('Image filtering process Failed', JSON.stringify(error), ['OK']);
    }
}
</script>