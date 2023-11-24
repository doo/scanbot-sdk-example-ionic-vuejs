<template>
    <ion-modal ref="modal" :trigger=props.trigger :initial-breakpoint="0.3" :breakpoints="[0, 0.25, 0.5, 0.75, 1]"
        @willDismiss="onWillDismiss">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ props.title }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="cancel()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item :button="true" v-for="item in props.optionList" :key="item['key']" @click="onItemClick(item['key'])">
                    <ion-label>{{ item.value }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonItem, IonLabel, IonList } from '@ionic/vue';
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';

const modal = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
    }
};

interface Props {
    trigger: string
    title: string
    optionList: { key: any; value: any; }[]
    onItemClick: Function
}
const props = defineProps<Props>()
</script>