<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons>
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title> Medical Certificate Result </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" color="light">
            <ion-card>
                <ion-img v-bind:src="imageURL" />
            </ion-card>

            <ion-label>Form Type: </ion-label>

            <ion-list :inset="true">
                <ion-list-header>
                    <ion-label>Patient Data</ion-label>
                </ion-list-header>
                <ion-item>
                    <ion-label>
                        <h3>Insurance Provider</h3>
                        <p></p>
                        <!-- <h2>Insurance Provider: {{ medicalCertifacteResult?.patientData?.insuranceProvider }}</h2>
                    <h3>Name: {{ medicalCertifacteResult?.patientData?.firstName + " " +
                        medicalCertifacteResult?.patientData?.lastName }}</h3>
                    <h3>HINR: {{ medicalCertifacteResult?.patientData?.healthInsuranceNumber }}</h3>
                    <h3>IPNR: {{ medicalCertifacteResult?.patientData?.insuredPersonNumber }}</h3> -->
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Mega Man X</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>The Legend of Zelda</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Pac-Man</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Super Mario World</ion-label>
                </ion-item>
            </ion-list>

            <!-- <h2>Dates Data:</h2>
				<ion-label>
					<h3>Incapable of work since: {{ medicalCertifacteResult?.dates?.incapableOfWorkSince?.dateString ?? "Unknown date" }}</h3>
					<h3>Incapable of work until: {{ medicalCertifacteResult?.dates?.incapableOfWorkUntil?.dateString ?? "Unknown date" }}</h3>
					<h3>Diagnosed on: {{ medicalCertifacteResult?.dates?.diagnosedOn?.dateString ?? "Unknown date" }}</h3>
					<h3>Document Date: {{ medicalCertifacteResult?.dates?.documentDate?.dateString ?? "Unknown date" }}</h3>
				</ion-label>
				<h2>Checkbox Data:</h2>
				<ion-label>
					<h3>Initial Certificate: {{ (medicalCertifacteResult?.checkboxes?.initialCertificate?.isChecked ?? false) ? "Yes" : "No" }}</h3>
					<h3>Renewed Certificate: {{ (medicalCertifacteResult?.checkboxes?.renewedCertificate?.isChecked ?? false) ? "Yes" : "No" }}</h3>
					<h3>Work Accident: {{ (medicalCertifacteResult?.checkboxes?.workAccident?.isChecked ?? false) ? "Yes" : "No" }}</h3>
					<h3>Accident: {{ (medicalCertifacteResult?.checkboxes?.accident?.isChecked ?? false) ? "Yes" : "No" }}</h3>
				</ion-label> -->
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, IonImg, IonCard, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue';
import { ref } from 'vue';

import { MedicalCertificateScannerResult } from 'capacitor-plugin-scanbot-sdk';
import { DataDetectorRepository } from '@/utils/data_detector_repository';
import { ScanbotSDKService } from '@/services/scanbot-service';
import { stringLiteral } from '@babel/types';

let imageURL = ref<string>();
let medicalCertifacteResult: { title: string; items: { key: string; value: string; }[]; }[] = [];

onIonViewDidEnter(async () => {
    // medicalCertifacteResult = DataDetectorRepository.MedResult;
    // imageURL.value = await ScanbotSDKService.getImageData(medicalCertifacteResult.imageFileUri!);
    // alert(JSON.stringify(medicalCertifacteResult));
    // alert(medicalCertifacteResult.patientData.insuranceProvider);
    // alert(medicalCertifacteResult.patientData.firstName);

    

    medicalCertifacteResult = [
        {
            title: 'General Data',
            items: [
                { key: '', value: "Scan Document" },
                { key: '', value: "View Image Results" },
            ],
        },
    ]
});
</script>