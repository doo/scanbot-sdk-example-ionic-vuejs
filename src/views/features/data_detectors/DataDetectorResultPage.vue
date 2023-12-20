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
        <ion-content color="light">
            <ion-list :inset="true">
                <ion-item v-for="item in props.dataList" :key="item.name">
                    <CommonLabel v-bind:title="item.name" v-bind:value="item.value" />
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/vue';
import CommonLabel from '@/views/common_views/CommonLabel.vue';

interface Props {
    title: string
    dataList: { name: any; value: any; }[]
}

const props = defineProps<Props>();
</script>

<style scoped>
ion-label {
    display: block;
    text-align: center;
}
</style>