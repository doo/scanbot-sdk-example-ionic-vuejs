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
                    <ion-col size="6" v-for="image in data" :key="image['id']" @click="onItemClick(image['id'])">
                        <ion-img v-bind:src="image['url']" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="startDocumentScanner()">Add Page</ion-button>

                    <ion-button id="open-pdf-page-option" expand="block" >Create PDF</ion-button>
                    <CommonModalView trigger="open-pdf-page-option" title="PDF Page Size Options" v-bind:optionList="PDFPageSizeList" :onItemClick="createPDF"/>

                    <ion-button id="open-tiff-option" expand="block">Create TIFF</ion-button>
                    <CommonModalView trigger="open-tiff-option" title="Tiff Creation Options" v-bind:optionList="TiffOptions" :onItemClick="writeTIFF"/>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-button @click="deleteAll()">Delete</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonImg, IonCol } from '@ionic/vue';
import { Page, PDFPageSize } from 'capacitor-plugin-scanbot-sdk';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import CommonModalView from '../../common_views/CommonModalView.vue';
import { PDFPageSizeList, TiffOptions } from '@/utils/feature-util';
import { PDFPageSizeEnum } from '@/enums/pdf_page_size_enum';
import { TiffOptionsEnum } from '@/enums/tiff_option_enum';

const router = useRouter();

let pages: Page[] = [];
let data = ref<any>([]);

onMounted(async () => {
    await reloadPages();
});

const onItemClick = async (selectedPageId: string) => {
    await router.push('/image_edit/' + selectedPageId);
}

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

const createPDF = async (selectedItem: PDFPageSizeEnum) => {
    const imageUrls = pages.map(p => p.documentImageFileUri!);
    const pdfPageSize = PDFPageSizeList[selectedItem].value as PDFPageSize;

    await ScanbotSDKService.createPDF(imageUrls, pdfPageSize);
}

const writeTIFF = async (selectedItem: TiffOptionsEnum) => {
    const imageUrls = pages.map(p => p.documentImageFileUri!);
    const binarized = selectedItem == TiffOptionsEnum.Binarized;

    await ScanbotSDKService.writeTIFF(imageUrls, binarized);
}

const deleteAll = async () => {
    await StorageService.INSTANCE.removeAllPages();
    data.value = [];
}
</script>