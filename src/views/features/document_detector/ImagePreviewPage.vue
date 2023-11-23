<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Image Preview</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="6" v-for="image in data" :key="image['id']">
                        <ion-img v-bind:src="image['url']" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="startDocumentScanner()">Add Page</ion-button>

                    <ion-button id="open-pdf-page-option" expand="block">Create PDF</ion-button>
                    <CommonModalView trigger="open-pdf-page-option" title="PDF Page Size Options" v-bind:optionList="PDFPageSizeList"/>

                    <ion-button id="open-tiff-option" expand="block">Create TIFF</ion-button>
                    <CommonModalView trigger="open-tiff-option" title="Tiff Creation Options" v-bind:optionList="TiffOptions"/>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-button>Delete</ion-button>
                </ion-buttons>

            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonImg, IonCol } from '@ionic/vue';
import { Page } from 'capacitor-plugin-scanbot-sdk';
import { onMounted, ref } from 'vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import CommonModalView from '../../common_views/CommonModalView.vue';
import { PDFPageSizeList, TiffOptions } from '@/utils/feature-util';

let pages: Page[] = [];

let data = ref<any>([]);

onMounted(async () => {
    await reloadPages();
});

/* load scanned documents */
async function reloadPages() {
    //if (!(await ScanbotSDKService.checkLicense())) { return; }
    //if (!hasScannedPages()) { return; }
    pages = StorageService.INSTANCE.getPages();
    try {
        for (const page of pages) {
            const url = page.documentPreviewImageFileUri as string;
            const imageURL = await ScanbotSDKService.getImageData(url);
            //if (imageURL === '' || imageURL === undefined) break;

            data.value.push({ id: page.pageId, url: imageURL });
        }
    }
    catch (error) {
        console.error(error);
    }
}

const startDocumentScanner = async () => {
    const documentResult = await ScanbotSDKService.startDocumentScanner();

    if (documentResult.status == 'CANCELED') {
        await ShowAlert('Information', 'Document scanner has been canceled.', ['OK']);
        return;
    };

    await StorageService.INSTANCE.addPages(documentResult.pages);

    data.value = [];

    await reloadPages();
}
</script>