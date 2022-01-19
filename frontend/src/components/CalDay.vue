<template>
    <div class="cal-day">
        <ScheduledClass v-for="course in daysClasses(date)"
                        :key="course.id"
                        :course="course"
        ></ScheduledClass>
        <ion-grid class="hours">
            <ion-row>
                <ion-col>
                    <ion-list>
                        <ion-item class="hour" v-for="hour in hours" :key="hour">
                            <div v-show="show_hours" >
                                <ion-text class="hour-text">
                                    {{ hour }}
                                </ion-text>
                                <ion-text class="minute-text">
                                    00
                                </ion-text>
                            </div>
                        </ion-item>
                    </ion-list>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";
import {
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonList,
} from "@ionic/vue";
import ScheduledClass from '@/components/ScheduledClass.vue';

export default defineComponent({
    name: 'CalDay',
    props: ['show_hours', 'date'],
    computed: {
        ...mapState(['courses', 'endDayHour', 'startDayHour']),
        hours(): string[] {
            const hours = new Array(this.endDayHour - this.startDayHour)
            for (let i = 0; this.startDayHour + i <= this.endDayHour; i++) {
                hours[i] = this.startDayHour + i;
            }
            return hours;
        },
    },
    methods: {
        daysClasses(date: Date): Record<string, any>[] {
            return this.courses[date.toDateString()];
        },
    },
    components: {
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonList,
        ScheduledClass,
    },
});
</script>

<style scoped>
.cal-day {
    height: 100%;
}

.day {
    position: relative;
    /*border: 1px solid red;*/
    /*background: var(--ion-color-light);*/
    height: calc(100% - 2rem);
}

.hour {
    border-top: 1px solid var(--ion-color-light-contrast);
}

ion-text {
    width: 100%;
}

.hours, .hours ion-col {
    padding: 0;
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
