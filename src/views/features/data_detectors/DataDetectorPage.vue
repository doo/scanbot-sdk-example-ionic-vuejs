<template>
    <CoreFeatureItemsView title="Date Detectors" v-bind:coreItems="coreItems" :onItemClick="onItemClick" />
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getItemList } from '../../../utils/feature-util';
import { CoreFeatureIdEnum } from '@/enums/core_feature_id_enum';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import { ScanbotSDKService } from '@/services/scanbot-service';
import { StorageService } from '@/services/storage_service';
import { ShowAlert } from '@/services/alert_service';
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { CheckRecognizerResult, CheckRecognizerResultField, HealthInsuranceCardScannerResult } from 'capacitor-plugin-scanbot-sdk';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onMounted(() => {
    coreItems = getItemList(selectedItemId);
});

const startMRZScanner = async () => {
    const mrzResult = await ScanbotSDKService.startMrzScanner();
    DataDetectorRepository.DataResult = JSON.stringify(mrzResult);
    await router.push('/mrz_result');
}

const startEHICScanner = async () => {
    const ehicResult = await ScanbotSDKService.startEHICScanner();
    DataDetectorRepository.DataResult = JSON.stringify(ehicResult);
    parseResult(ehicResult!);
    await router.push('/ehic_result');

}

const parseResult = (result: HealthInsuranceCardScannerResult) => {
    console.log('start');
    console.log(JSON.stringify(result));
    const newFields: { name: string, value: string }[] = []
    result.fields.map(item => {
        newFields.push({
            name: item.type,
            value: item.value
        });
    });
    DataDetectorRepository.EHICResult = newFields;
    console.log(JSON.stringify(newFields));
}

const startCheckScanner = async () => {
    const result = await ScanbotSDKService.startCheckRecognizer();

    DataDetectorRepository.parseResult(result!);

    await router.push('/check_result');
}

const detectCheckFromImage = async () => {
    try {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos,
        });

        const originalImageFileUri = image.path!;

        const result = await ScanbotSDKService.recognizeCheck(originalImageFileUri);
        DataDetectorRepository.parseResult(result!);
        await router.push('/check_result');

    } catch (error) {
        alert(JSON.stringify(error));
    }
}

const startLicensePlateScaner = async () => {
    try {
        const licensePlateResult = await ScanbotSDKService.startLicensePlateScanner();
        alert(JSON.stringify(licensePlateResult));
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

const startMedicalCertificateScanner = async () => {
    try {
        const medicalCertificateResult = await ScanbotSDKService.startMedicalCertificateRecognizer();
        alert(JSON.stringify(medicalCertificateResult));

    } catch (error) {
        alert(JSON.stringify(error));
    }
}

const startScanTextDataScaner = async () => {
    try {
        const textResult = await ScanbotSDKService.startTextDataScanner();
        alert(JSON.stringify(textResult));
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

const startGenericDocumentScaner = async () => {
    try {
        const genericDocumentResult = await ScanbotSDKService.startGenericDocumentRecognizer();
        alert(JSON.stringify(genericDocumentResult));
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

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
            //statements;
            break;
        }
    }
}
</script>