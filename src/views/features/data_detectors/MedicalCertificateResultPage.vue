<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title> Medical Certificate Result </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" color="light">
            <ion-list :inset="true">
                <ion-item-group v-for="medItem in medicalCertifacteResult" :key="medItem.title">
                    <ion-list-header color="primary">
                        <ion-label>{{ medItem.title }}</ion-label>
                    </ion-list-header>

                    <ion-item v-for="item in medItem.items" :key="item.key">
                        <ion-label>
                            <h3>{{ item.key }}</h3>
                            <p>{{ item.value }}</p>
                        </ion-label>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemGroup, IonItem, IonLabel, IonList, IonListHeader, onIonViewWillEnter } from '@ionic/vue';
import { DataDetectorRepository } from '@/utils/data_detector_repository';

let medicalCertifacteResult: { title: string; items: { key: string; value: string; }[]; }[] = [];

onIonViewWillEnter(async () => {
    const medData = DataDetectorRepository.MedResult;
    if (!isObjectEmpty(medData.formType)) {
        medicalCertifacteResult.push(
            {
                title: 'General Information',
                items: [
                    { key: 'FormType', value: medData.formType },
                    { key: 'Captured Image', value: medData.imageFileUri! }
                ]
            }
        )
    }
    if (!isObjectEmpty(medData.patientData)) {
        medicalCertifacteResult.push(
            {
                title: 'Patient Data',
                items: [
                    { key: 'Insuarance Provider', value: medData.patientData.insuranceProvider! },
                    { key: 'Full Name', value: medData.patientData.firstName! + medData.patientData.lastName! },
                    { key: 'Address', value: medData.patientData.address1! + medData.patientData.address2! },
                    { key: 'Diagnose', value: medData.patientData.diagnose! },
                ]
            }
        )
    }
    if (!isObjectEmpty(DataDetectorRepository.MedResult.dates)) {
        medicalCertifacteResult.push(
            {
                title: 'Dates',
                items: [
                    { key: 'Date of Birth', value: DataDetectorRepository.MedResult.dates.birthDate?.dateString! },
                    { key: 'Diagnose On', value: DataDetectorRepository.MedResult.dates.diagnosedOn?.dateString! },
                    { key: 'Document Date', value: DataDetectorRepository.MedResult.dates.documentDate?.dateString! },
                    { key: 'Incapable of work since', value: DataDetectorRepository.MedResult.dates.incapableOfWorkSince?.dateString! },
                    { key: 'Incapable of work until', value: DataDetectorRepository.MedResult.dates.incapableOfWorkUntil?.dateString! },
                ]
            }
        )
    }
    if (!isObjectEmpty(DataDetectorRepository.MedResult.checkboxes)) {
        medicalCertifacteResult.push(
            {
                title: 'CheckBoxes',
                items: [
                    { key: 'Accident Number', value: DataDetectorRepository.MedResult.checkboxes.accidentNo?.isChecked ? 'True' : 'False' },
                    { key: 'Accident', value: DataDetectorRepository.MedResult.checkboxes.accident?.isChecked ? 'True' : 'False' },
                    { key: 'Assigned to Doctor', value: DataDetectorRepository.MedResult.checkboxes.assignedToAccidentInsuranceDoctor?.isChecked ? 'True' : 'False' },
                    { key: 'Work Accident', value: DataDetectorRepository.MedResult.checkboxes.workAccident?.isChecked ? 'True' : 'False' },
                    { key: 'Insured Pay Case', value: DataDetectorRepository.MedResult.checkboxes.insuredPayCase?.isChecked ? 'True' : 'False' },
                ]
            }
        )
    }
});

/** check the provided object is null */
const isObjectEmpty = (objectName: any) => {
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    );
};
</script>