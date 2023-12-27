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
        <ion-content :fullscreen="true" color="light">
            <ion-grid>
                <ion-row>
                    <ion-col size="6" v-for="image in imageData" :key="image['id']" @click="onItemClick(image['id'])">
                        <ion-img v-bind:src="image['url']" />
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- display empty no image text when there is no images to display -->
            <CommonEmptyView message="No images to display." v-bind:hidden="isEmptyTextHidden" />
        </ion-content>

        <ion-footer>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="startDocumentScanner()">Add Page</ion-button>

                    <ion-button id="open-pdf-page-option" expand="block" v-bind:disabled="isModalEnabled">Create
                        PDF</ion-button>
                    <CommonModalView trigger="open-pdf-page-option" title="PDF Page Size Options"
                        v-bind:optionList="PDFPageSizeList" :onItemClick="createPDF" ref="pdfPageSizeModal" />

                    <ion-button id="open-tiff-option" expand="block" v-bind:disabled="isModalEnabled">Create
                        TIFF</ion-button>
                    <CommonModalView trigger="open-tiff-option" title="Tiff Creation Options"
                        v-bind:optionList="TiffOptions" :onItemClick="writeTIFF" ref="tiffOptionModal" />
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-button @click="deleteAll()" v-bind:disabled="isModalEnabled">Delete</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonImg, IonCol, onIonViewWillEnter, IonLabel } from '@ionic/vue';
import { Page, PDFPageSize } from 'capacitor-plugin-scanbot-sdk';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import CommonModalView from '../../common_views/CommonModalView.vue';
import { PDFPageSizeList, TiffOptions } from '@/utils/data_util';
import { PDFPageSizeEnum } from '@/enums/pdf_page_size_enum';
import { TiffOptionsEnum } from '@/enums/tiff_option_enum';
import CommonEmptyView from '@/views/common_views/CommonEmptyView.vue';

const router = useRouter();

let pages: Page[] = [];
let imageData = ref<any>([]);
let isModalEnabled = ref<boolean>(true);
let isEmptyTextHidden = ref<boolean>(true);
const pdfPageSizeModal = ref();
const tiffOptionModal = ref();

onIonViewWillEnter(async () => {
    await reloadPages();
});

// -----------------
// Item Click Event
// -----------------
const onItemClick = async (selectedPageId: string) => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    await router.push('/image_edit/' + selectedPageId);
}

/* load scanned documents */
async function reloadPages() {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    imageData.value = [];
    try {
        pages = StorageService.INSTANCE.getPages();
        isEmptyTextHidden.value = pages.length > 0;

        if (pages.length <= 0) return;

        for (const page of pages) {
            const url = page.documentPreviewImageFileUri as string;
            const imageURL = await ScanbotSDKService.getImageData(url);
            if (imageURL === '' || imageURL === undefined) break;

            imageData.value.push({ id: page.pageId, url: imageURL });
        }
        isModalEnabled.value = imageData.value.length <= 0;
    }
    catch (error) {
        ShowAlert('Load Scanned Documents Failed', JSON.stringify(error), ['OK'],);
    }
}

/* Scan Document */
const startDocumentScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const documentResult = await ScanbotSDKService.startDocumentScanner();

        if (documentResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Document scanner has been canceled.', ['OK']);
            return;
        };
        await StorageService.INSTANCE.addPages(documentResult!.pages);
        await reloadPages();
    }
    catch (error) {
        await ShowAlert('Scan Document Failed', JSON.stringify(error), ['OK']);
    }
}

/* Create PDF from scanned image urls */
const createPDF = async (selectedItem: PDFPageSizeEnum) => {
    if (!(await ScanbotSDKService.validateLicense())) {
        pdfPageSizeModal.value.cancel();
        return;
    }

    try {
        const imageUrls = pages.map(p => p.documentImageFileUri!);
        const pdfPageSize = PDFPageSizeList[selectedItem].value as PDFPageSize;

        const result = await ScanbotSDKService.createPDF(imageUrls, pdfPageSize);

        pdfPageSizeModal.value.cancel();
        if (result!.status == 'CANCELED') {
            await ShowAlert('Information', 'PDF Creation has been canceled.', ['OK']);
            return;
        };
        alert(JSON.stringify(result));
    }
    catch (error) {
        pdfPageSizeModal.value.cancel();
        await ShowAlert('PDF Creation Failed', JSON.stringify(error), ['OK']);
    }
}

/* Create TIFF from scanned image urls */
const writeTIFF = async (selectedItem: TiffOptionsEnum) => {
    if (!(await ScanbotSDKService.validateLicense())) {
        tiffOptionModal.value.cancel();
        return;
    }

    try {
        const imageUrls = pages.map(p => p.documentImageFileUri!);
        const binarized = selectedItem === TiffOptionsEnum.Binarized;

        const result = await ScanbotSDKService.writeTIFF(imageUrls, binarized);

        tiffOptionModal.value.cancel();
        if (result!.status == 'CANCELED') {
            await ShowAlert('Information', 'TIFF Creation has been canceled.', ['OK']);
            return;
        };
        alert(JSON.stringify(result));
    }
    catch (error) {
        tiffOptionModal.value.cancel();
        await ShowAlert('TIFF Creation Failed', JSON.stringify(error), ['OK']);
    }
}

const deleteAll = async () => {
    await StorageService.INSTANCE.removeAllPages();
    imageData.value = [];
    isModalEnabled.value = imageData.value.length <= 0;
    isEmptyTextHidden.value = imageData.value.length > 0;
}
</script>