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

            <div class="container">
                <ion-grid id="hours">
                    <ion-row>
                        <ion-col>
                            <ion-list>
                                <ion-item class="hour" v-for="hour in hours" :key="hour">
                                    <ion-text class="hour-text">
                                        {{ hour }}
                                    </ion-text>
                                    <ion-text class="minute-text">
                                        00
                                    </ion-text>
                                </ion-item>
                            </ion-list>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-grid id="schedule">
<!--                    <ion-row>-->
<!--                        <ion-col v-for="day in dateRangeFrom(today, 5)" :key="day.getTime()"-->
<!--                                 class="ion-text-center" size="12">-->
<!--                            {{dayOfWeek(day)}}-->
<!--                        </ion-col>-->
<!--                    </ion-row>-->
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
            </div>
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
    IonText,
} from '@ionic/vue';
import {defineComponent} from "vue";
import {mapState} from "vuex";
import {addDays} from 'date-fns';
import CalDay from '@/components/CalDay.vue';
const today = new Date();

const weekDays = [
    'Montag',
    'Dienstag',
    'Mitwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonnetag',
];

export default defineComponent({
    computed: {
        ...mapState(['endDayHour', 'startDayHour']),
        hours(): string[] {
            const hours = new Array(this.endDayHour - this.startDayHour)
            for (let i = 0; this.startDayHour + i <= this.endDayHour; i++) {
                hours[i] = this.startDayHour + i;
            }
            return hours;
        },
    },
    methods: {
        dayOfWeek(date: Date): string {
            return weekDays[date.getDay()];
        },
        dateRangeFrom(date: Date, length: number): Date[] {
            const dates = new Array(length + 1);
            for (let i = 0; i <= length; i++) {
                dates[i] = addDays(date, i);
            }
            return dates;
        },
    },
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
        IonText,
        CalDay,
    },
    setup: () => {
        return {
            today,
            addDays,
        }
    }
})
</script>

<style scoped>
.container {
    display: flex;
}

.container, #schedule, #cal, #cal > ion-col {
    height: calc(100% - 2rem);
}

#schedule {
    flex-grow: 12;
}

.hour-text {
    width: auto;
    font-size: 1rem;
    /*transform: translateY(-10px);*/
}

.minute-text {
    width: auto;
    font-size: .75rem;
    /*transform: translateY(-15px);*/
}
</style>
