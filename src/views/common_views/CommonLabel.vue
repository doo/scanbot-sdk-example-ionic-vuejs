<template>
    <ion-label>
        <h3>{{ props.title }}</h3>
        <p>{{ props.value }}</p>
    </ion-label>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';

interface Props {
    title: string
    value: string
}
const props = defineProps<Props>()
</script>