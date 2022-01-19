<template>
    <div class="cal-day">
        <ScheduledClass v-for="course in daysClasses(date)"
                        :key="course.id"
                        :course="course"
        ></ScheduledClass>
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
            </ion-row>
        </ion-grid>
        <ion-list class="day">
            <ion-item class="hour" v-for="hour in hours" :key="hour">
            </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";
import {IonList} from "@ionic/vue";
import ScheduledClass from '@/components/ScheduledClass.vue';

export default defineComponent({
    name: 'CalDay',
    props: ['date'],
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
</style>
