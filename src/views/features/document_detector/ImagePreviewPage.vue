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
        <ion-content :fullscreen="true">
            <ion-grid>
                <ion-row>
                    <ion-col size="6" v-for="image in imageData" :key="image['id']">
                        <ion-img v-bind:src="image['url']" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer>
            <ion-toolbar color="primary">
                <ion-buttons>
                    <ion-button>Add</ion-button>
                    <ion-button>Add</ion-button>
                    <ion-button>Add</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonImg, IonCol } from '@ionic/vue';
import { Page } from 'capacitor-plugin-scanbot-sdk';
import { onMounted } from 'vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';

let pages: Page[] = StorageService.INSTANCE.getPages();
let imageData: { id: string; url: string; }[] = [];

onMounted(async () => {
    alert(pages.length);
    await reloadPages();
});

/* load scanned documents */
async function reloadPages() {
    //if (!(await ScanbotSDKService.checkLicense())) { return; }
    //if (!hasScannedPages()) { return; }

    try {
        for (const page of pages) {
            const url = page.documentPreviewImageFileUri as string;
            const imageURL = await ScanbotSDKService.getImageData(url);
            if (imageURL === '' || imageURL === undefined) break;
            imageData.push({ id: page.pageId, url: imageURL });
        }
    }
    catch (error) {
        console.error(error);
    }
}
</script>