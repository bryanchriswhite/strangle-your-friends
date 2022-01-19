<template>
    <div class="scheduled-class"
         :style="{top: top, height: height}">
        <ion-text>
            {{ course.name }}
        </ion-text>
        <br>
        <ion-text>
            {{ timeRange(course) }}
        </ion-text>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IonText} from "@ionic/vue";
import {mapGetters, mapState} from "vuex";
import {format} from 'date-fns';
import {Course} from "@/store";

export default defineComponent({
    name: 'ScheduledClass',
    props: ['course'],
    computed: {
        ...mapState(['startDayHour']),
        ...mapGetters(['dayLengthHours', 'dayLengthSeconds']),
        dayBeginUnix(): number {
            const now = new Date();
            const dayBegin  =new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    this.startDayHour
            );
            return dayBegin.getTime();
        },
        top(): string {
            console.log(`this.course.start.getTime(): ${this.course.start.getTime()}`)
            console.log(`this.dayLengthSeconds: ${this.dayLengthSeconds}`)
            return `${(this.course.start.getTime() - this.dayBeginUnix + 0.0001) / 10 / this.dayLengthSeconds}%`;
            // return `${this.course.start.getHours() / this.dayLengthHours * 100}%`;
        },
        height(): string {
            console.log(`this.course.start.getTime(): ${this.course.start.getTime()}`)
            console.log(`this.course.end.getTime(): ${this.course.end.getTime()}`)
            console.log(`this.dayLengthSeconds: ${this.dayLengthSeconds}`)
            return `${(this.course.end.getTime() - this.course.start.getTime() + 0.0001) / 10 / this.dayLengthSeconds}%`;
        }
    },
    methods: {
        timeRange(course: Course): string {
            const startTime = format(course.start, 'HH:mm');
            const endTime = format(course.end, 'HH:mm');
            return `${startTime}-${endTime}`;
        }
    },
    components: {
        IonText,
    },
})
</script>

<style scoped>
.scheduled-class {
    position: absolute;
    background: var(--ion-color-primary);
    border: 1px solid var(--ion-color-dark);
    border-radius: 10px;
    padding: 5px;
    z-index: 100;
    right: 0;
    /*width: 75%;*/
}
</style>
