<template>
    <CoreFeatureItemsView title="Data Detectors" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onIonViewWillEnter } from '@ionic/vue';

import { GetItemList } from '../../../utils/data_util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { ShowAlert } from '@/services/alert_service';
import { PickImage } from '@/utils/camera_util';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onIonViewWillEnter(() => {
    coreItems = GetItemList(selectedItemId);
});

/** Detect MRZ data */
const startMRZScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const mrzResult = await ScanbotSDKService.startMrzScanner();
        if (mrzResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'MRZ detector has been cancelled.', ['OK']);
            return;
        };
        DataDetectorRepository.MrzResult = mrzResult;
        await router.push('/mrz_result');
    }
    catch (error) {
        await ShowAlert('Detect MRZ data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Detect EHIC data */
const startEHICScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const ehicResult = await ScanbotSDKService.startEHICScanner();
        if (ehicResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'EHIC detector has been cancelled.', ['OK']);
            return;
        };
        DataDetectorRepository.GeneratEHICResult(ehicResult!);
        await router.push('/ehic_result');
    }
    catch (error) {
        await ShowAlert('Detect EHIC data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Datect data from a check */
const startCheckScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const checkResult = await ScanbotSDKService.startCheckRecognizer();
        if (checkResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Check data detector has been cancelled.', ['OK']);
            return;
        };
        DataDetectorRepository.GenerateCheckResult(checkResult!);
        await router.push('/check_result');
    } 
    catch (error) {
        await ShowAlert('Detect Check data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Detect check data from imported image */
const detectCheckFromImage = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const originalImageFileUri = await PickImage();

        const checkResult = await ScanbotSDKService.recognizeCheck(originalImageFileUri);
        if (checkResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Check data detector has been cancelled.', ['OK']);
            return;
        };
        DataDetectorRepository.GenerateCheckResult(checkResult!);
        await router.push('/check_result');
    } 
    catch (error) {
        await ShowAlert('Detect Check data Failed', 'Please try again!', ['OK']);
    }
}

/** Detect license plate data */
const startLicensePlateScaner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const licensePlateResult = await ScanbotSDKService.startLicensePlateScanner();
        if (licensePlateResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'License plate data detector has been cancelled.', ['OK']);
            return;
        };
        alert(JSON.stringify(licensePlateResult));
    } 
    catch (error) {
        await ShowAlert('Detect license plate data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Detect medical certificate data */
const startMedicalCertificateScanner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const medicalCertificateResult = await ScanbotSDKService.startMedicalCertificateRecognizer();
        if (medicalCertificateResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Medicle certificate data detector has been cancelled.', ['OK']);
            return;
        };
        DataDetectorRepository.MedResult = medicalCertificateResult;
        await router.push('/medical_certificate');
    } 
    catch (error) {
        await ShowAlert('Detect Medical data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Detect text data */
const startScanTextDataScaner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const textResult = await ScanbotSDKService.startTextDataScanner();
        if (textResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Text data detector has been cancelled.', ['OK']);
            return;
        };
        alert(JSON.stringify(textResult));
    } 
    catch (error) {
        await ShowAlert('Detect text data Failed', JSON.stringify(error), ['OK']);
    }
}

/** Open generic document scanner */
const startGenericDocumentScaner = async () => {
    if (!(await ScanbotSDKService.validateLicense())) { return; }

    try {
        const genericDocumentResult = await ScanbotSDKService.startGenericDocumentRecognizer();
        if (genericDocumentResult!.status == 'CANCELED') {
            await ShowAlert('Information', 'Generic document scanner has been cancelled.', ['OK']);
            return;
        };
        alert(JSON.stringify(genericDocumentResult));
    } 
    catch (error) {
        await ShowAlert('Generic document scanner Failed', JSON.stringify(error), ['OK']);
    }
}

// -----------------
// Item Click Event
// -----------------
const onItemClick = async (selectedItem: CoreFeatureEnum) => {
    switch (selectedItem) {
        case CoreFeatureEnum.MRZ: {
            await startMRZScanner();
            break;
        }
        case CoreFeatureEnum.EHIC: {
            await startEHICScanner();
            break;
        }
        case CoreFeatureEnum.Check: {
            await startCheckScanner();
            break;
        }
        case CoreFeatureEnum.ImportCheckOnImage: {
            await detectCheckFromImage();
            break;
        }
        case CoreFeatureEnum.LicensePlate: {
            await startLicensePlateScaner();
            break;
        }
        case CoreFeatureEnum.MedicalCertificate: {
            await startMedicalCertificateScanner();
            break;
        }
        case CoreFeatureEnum.TextData: {
            await startScanTextDataScaner();
            break;
        }
        case CoreFeatureEnum.GenericDocument: {
            await startGenericDocumentScaner();
            break;
        }
        default: {
            await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
            break;
        }
    }
}
</script>