<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ props.title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item :button="true" v-for="item in props.coreItems" :key="item['key']">
                    <ion-label> {{ item["value"] }} </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonList, } from '@ionic/vue';
import { CoreFeatureEnum } from '@/enums/core_feature_enum';

interface Props {
  title: string
  coreItems: { key: CoreFeatureEnum; value: string; }[]
}
const props = defineProps<Props>()
</script>