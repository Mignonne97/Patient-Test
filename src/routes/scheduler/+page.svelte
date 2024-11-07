<script>
    import { onMount } from 'svelte';
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import { writable } from 'svelte/store';
    import { runStorageQuery } from '$lib/sqlite/dataApi';

    // Sample data for the calendar
    let appointments = writable([]);

    export const loadData = async () => {
    const bookings = await runStorageQuery('bookings_v1', {
        orderByCol: 'idNumber',
        orderByDir: 'desc',
        searchTerm: ''
    });

    const updatedAppointments = bookings.map(person => {
        return {
            ...person,
            age: calculateAgeFromIdNumber(person.idNumber)
        };
    }).map(appointment => {
        // Extract the time range from the time key
        const timeRange = appointment.time;
        
        // Split the time range into start and end times
        const [startTime, endTime] = timeRange.split(' - ');

        // Combine date and time to create ISO 8601 format
        const startDateTime = `${appointment.date}T${startTime}:00`;
        const endDateTime = `${appointment.date}T${endTime}:00`;

        // Assign the new keys with the formatted ISO 8601 strings
        appointment.time = startDateTime;
        appointment.endTime = endDateTime;
        appointment.id = parseInt(appointment.id);

        return appointment;
    });
    appointments.set(updatedAppointments);
};


    const calculateAgeFromIdNumber = (idNumber) => {
        const yearPrefix = parseInt(idNumber.substring(0, 2), 10) >= 0 && parseInt(idNumber.substring(0, 2), 10) <= 21 ? '20' : '19';
        const year = parseInt(yearPrefix + idNumber.substring(0, 2), 10);
        const month = parseInt(idNumber.substring(2, 4), 10);
        const day = parseInt(idNumber.substring(4, 6), 10);
        const birthDate = new Date(year, month - 1, day);

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    onMount(async () => {
        await loadData();
        const calendarEl = document.getElementById('calendar');
        const calendar = new Calendar(calendarEl, {
            dayMaxEventRows: true,
            plugins: [dayGridPlugin],
            initialView: 'dayGridWeek',
            events: $appointments.map(event => ({
                title: event.name,
                start: event.time,
                end: event.endTime,
                id: event.id
            })),
            views: {
                timeGrid: {
                    dayMaxEventRows: 4
                }
            },
            eventClick: function(info) {
                console.log('Event: ' + info.event.title);
            }
        });
        calendar.render();
    });
</script>

<style>
    .calendar-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>

<div class="calendar-container">
    <div id="calendar"></div>
</div>
