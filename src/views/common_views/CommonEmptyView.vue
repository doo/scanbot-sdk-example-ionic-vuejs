<template>
    <div id="container">
        <ion-label> {{ props.message }} </ion-label>
    </div>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';

interface Props {
    message: string
}
const props = defineProps<Props>()
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>