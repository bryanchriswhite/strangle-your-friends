<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Schedule</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Schedule</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-grid>
                <ion-row>
                    <!--                date picker-->
                    <ion-col class="ion-text-center" size="12">
                        date picker
                    </ion-col>
                </ion-row>
                <ion-row id="cal">
                    <!--                calendar-->
                    <ion-col size-xs="6" size-sm="4" size-md="3" size-lg="2">
                        <CalDay :date="today"></CalDay>
                    </ion-col>
                    <ion-col class="ion-hide-xs-down"
                             size-sm="4" size-md="3" size-lg="2">
                        <CalDay :date="addDays(today, 1)"></CalDay>
                    </ion-col>
                    <ion-col class="ion-hide-sm-down"
                             size-sm="4" size-md="3" size-lg="2">
                        <CalDay :date="addDays(today, 2)"></CalDay>
                    </ion-col>
                    <ion-col class="ion-hide-md-down" size-lg="2">
                        <CalDay :date="addDays(today, 3)"></CalDay>
                    </ion-col>
                    <ion-col class="ion-hide-lg-down" size="2">
                        <CalDay :date="addDays(today, 4)"></CalDay>
                    </ion-col>
                    <ion-col class="ion-hide-lg-down" size="2">
                        <CalDay :date="addDays(today, 5)"></CalDay>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/vue';
import {addDays} from 'date-fns';
import CalDay from '@/components/CalDay.vue';
const today = new Date();

export default {
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonGrid,
        IonRow,
        IonCol,
        CalDay,
    },
    setup: () => {
        return {
            today,
            addDays,
        }
    }
}
</script>

<style scoped>
ion-grid, #cal, #cal > ion-col {
    height: calc(100% - 2rem);
}
</style>
