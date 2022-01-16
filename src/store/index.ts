import {createStore} from 'vuex';

import classData from '@/classes.json'

const classes: Record<string, any> = {};
classData.forEach(c => {
    const {name, slots, bookedParticipants, maxParticipants} = c;
    const {startDateTime, endDateTime, employees} = slots[0];

    const start = new Date(startDateTime.split('[')[0]);
    const end = new Date(endDateTime.split('[')[0]);
    const trainer = employees.length === 0 ? 'N/A' :
            `${employees[0].firstname} ${employees[0].lastname}`;

    const dateKey = start.toDateString();
    if (typeof(classes[dateKey]) === 'undefined') {
        classes[dateKey] = [];
    }
    classes[dateKey].push({
        name,
        start,
        end,
        trainer,
        bookedParticipants,
        maxParticipants,
    });
})
console.log(classes);

(window as unknown as any).classes = classes;


const store = createStore({
    state() {
        return {
            classes,
        }
    },
    mutations: {

    },
    actions: {

    }
});

export default store;
