<template>
  <CoreFeatureItemsView title="Data Detectors" v-bind:coreItems="coreItems" :onItemClick="onItemClick"/>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

import {GetItemList} from '@/utils/data_util';
import {CoreFeatureIdEnum} from '@/enums/core_feature_id_enum';
import {CoreFeatureEnum} from '@/enums/core_feature_enum';
import CoreFeatureItemsView from '../../common_views/CoreFeatureItemsView.vue';

import {ScanbotSDKService} from '@/services/scanbot-service';
import {DataDetectorRepository} from '@/utils/data_detector_repository';
import {ShowAlert} from '@/services/alert_service';
import {onBeforeMount} from "vue";

const router = useRouter();
let coreItems: { key: CoreFeatureEnum; value: string; }[] | undefined = [];
const selectedItemId = router.currentRoute.value.params.selectedItem as unknown as CoreFeatureIdEnum;

onBeforeMount(() => {
  coreItems = GetItemList(selectedItemId);
});

/** Detect MRZ data */
const startMRZScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const mrzResult = await ScanbotSDKService.startMrzScanner();
    if (mrzResult.status == 'OK') {
      DataDetectorRepository.GenerateMRZResult(mrzResult);
      await router.push('/mrz_result');
    } else {
      await ShowAlert('Information', 'MRZ detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect MRZ data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Detect EHIC data */
const startEHICScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const ehicResult = await ScanbotSDKService.startEHICScanner();
    if (ehicResult.status == 'OK') {
      DataDetectorRepository.GenerateEHICResult(ehicResult!);
      await router.push('/ehic_result');
    } else {
      await ShowAlert('Information', 'EHIC detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect EHIC data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Detect data from a check */
const startCheckScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const checkResult = await ScanbotSDKService.startCheckRecognizer();
    if (checkResult.status == 'OK') {
      DataDetectorRepository.GenerateCheckResult(checkResult!);
      await router.push('/check_result');
    } else {
      await ShowAlert('Information', 'Check data detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect Check data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Detect license plate data */
const startLicensePlateScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const licensePlateResult = await ScanbotSDKService.startLicensePlateScanner();
    if (licensePlateResult.status == 'OK') {
      alert(JSON.stringify(licensePlateResult));
    } else {
      await ShowAlert('Information', 'License plate data detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect license plate data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Detect medical certificate data */
const startMedicalCertificateScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const medicalCertificateResult = await ScanbotSDKService.startMedicalCertificateRecognizer();
    if (medicalCertificateResult.status == 'OK') {
      await DataDetectorRepository.GenerateMedData(medicalCertificateResult);
      await router.push('/medical_certificate');
    } else {
      await ShowAlert('Information', 'Medical certificate data detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect Medical data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Detect text data */
const startScanTextDataScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const textResult = await ScanbotSDKService.startTextDataScanner();
    if (textResult.status == 'OK') {
      alert(JSON.stringify(textResult));
    } else {
      await ShowAlert('Information', 'Text data detector has been cancelled.', ['OK']);
    }
  } catch (error) {
    await ShowAlert('Detect text data Failed', JSON.stringify(error), ['OK']);
  }
}

/** Open generic document scanner */
const startGenericDocumentScanner = async () => {
  if (!(await ScanbotSDKService.validateLicense())) {
    return;
  }

  try {
    const genericDocumentResult = await ScanbotSDKService.startGenericDocumentRecognizer();
    if (genericDocumentResult.status == 'OK') {
      alert(JSON.stringify(genericDocumentResult));
    } else {
      await ShowAlert('Information', 'Generic document scanner has been cancelled.', ['OK']);
    }
  } catch (error) {
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
    case CoreFeatureEnum.LicensePlate: {
      await startLicensePlateScanner();
      break;
    }
    case CoreFeatureEnum.MedicalCertificate: {
      await startMedicalCertificateScanner();
      break;
    }
    case CoreFeatureEnum.TextData: {
      await startScanTextDataScanner();
      break;
    }
    case CoreFeatureEnum.GenericDocument: {
      await startGenericDocumentScanner();
      break;
    }
    default: {
      await ShowAlert('Selected item is wrong', 'Please try again!', ['OK']);
      break;
    }
  }
}
</script>
