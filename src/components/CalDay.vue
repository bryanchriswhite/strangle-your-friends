<template>
    <div class="day">
        <ion-list>
            <ion-list-header>
                <ion-text>
                    {{ dayOfWeek }}
                </ion-text>
            </ion-list-header>
            <ion-item v-for="c in classes[todayKey]" :key="c.start">
                <ion-text>
                    {{c.name}}
                </ion-text>
            </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";
import {IonList, IonListHeader, IonText} from "@ionic/vue";

const weekDays = [
    'Montag',
    'Dienstag',
    'Mitwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonnetag',
]

export default defineComponent({
    name: 'CalDay',
    props: ['date'],
    computed: {
        ...mapState({
            classes: (state) => (state as any).classes,
        }),
        todayKey(): string {
            return this.date.toDateString();
        },
        dayOfWeek(): string {
            return weekDays[this.date.getDay()];
        }
    },
    components: {
        IonList,
        IonListHeader,
        IonText,
    }
});
</script>

<style scoped>
    .day {
        border: 1px solid red;
        height: 100%;
    }
    ion-text {
        width: 100%;
    }
</style>
