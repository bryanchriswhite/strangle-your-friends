import {createStore} from 'vuex';

import courseData from '@/courses.json'

export type Course = Record<string, any>;
export type Courses = Record<string, Course>;

declare interface RootState {
    startDayHour: number,
    endDayHour: number,
    courses: Courses
}

const defaultStartDayHour = 11
const defaultEndDayHour = 22

const courses: Courses = {};
courseData.forEach(c => {
    const {id, name, slots, bookedParticipants, maxParticipants} = c;
    const {startDateTime, endDateTime, employees} = slots[0];

    const start = new Date(startDateTime.split('[')[0]);
    const end = new Date(endDateTime.split('[')[0]);
    const trainer = employees.length === 0 ? 'N/A' :
            `${employees[0].firstname} ${employees[0].lastname}`;

    const dateKey = start.toDateString();
    if (typeof(courses[dateKey]) === 'undefined') {
        courses[dateKey] = [];
    }
    courses[dateKey].push({
        id,
        name,
        start,
        end,
        trainer,
        bookedParticipants,
        maxParticipants,
    });
})
console.log(courses);


const store = createStore({
    state(): RootState {
        return {
            courses,
            endDayHour: defaultEndDayHour,
            startDayHour: defaultStartDayHour,
        }
    },
    getters: {
        dayLengthHours: (state: RootState): number => {
            return state.endDayHour - state.startDayHour;
        },
        dayLengthSeconds: (state: RootState): number => {
            return (state.endDayHour - state.startDayHour) * 60 * 60;
        },
    },
    mutations: {

    },
    actions: {

    }
});

export default store;
