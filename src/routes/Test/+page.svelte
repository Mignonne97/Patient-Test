<!-- <script>
    import { ScheduleXCalendar } from '@schedule-x/svelte';
    import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
    import { createEventsServicePlugin } from '@schedule-x/events-service';
    import '@schedule-x/theme-default/dist/index.css';

    const eventsServicePlugin = createEventsServicePlugin();
    const calendarApp = createCalendar({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        events: [],
        plugins: [eventsServicePlugin]
    });

    let showModal = false;
    let newEventTitle = '';
    let newEventStart = '';
    let newEventEnd = '';

    function convertISOToReadable(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function handleCreateAppointment() {
        if (newEventTitle && newEventStart && newEventEnd) {
            const startDate = convertISOToReadable(newEventStart);
            const endDate = convertISOToReadable(newEventEnd);
            eventsServicePlugin.add({
                title: newEventTitle,
                start: startDate,
                end: endDate,
                id: Math.random().toString(36).substr(2, 9),
            })
            showModal = false;
            newEventTitle = '';
            newEventStart = '';
            newEventEnd = '';
        } else {
            alert('Please fill in all fields.');
        }
    }
</script>

<style>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 300px;
        max-width: 90%;
        box-sizing: border-box;
    }
    .modal-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    .modal-header button {
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }
    .modal-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal-body input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .modal-footer button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .modal-footer .create-btn {
        background-color: #4CAF50;
        color: white;
    }
    .modal-footer .cancel-btn {
        background-color: #f44336;
        color: white;
    }
</style>

<div>
    <ScheduleXCalendar calendarApp={calendarApp} />
    <button on:click={() => showModal = true}>Create Appointment</button>
</div>

{#if showModal}
    <div class="modal">
        <div class="modal-header">
            <button on:click={() => showModal = false}>×</button>
        </div>
        <div class="modal-body">
            <input type="text" bind:value={newEventTitle} placeholder="Title" />
            <input type="datetime-local" bind:value={newEventStart} />
            <input type="datetime-local" bind:value={newEventEnd} />
        </div>
        <div class="modal-footer">
            <button class="create-btn" on:click={handleCreateAppointment}>Create</button>
            <button class="cancel-btn" on:click={() => showModal = false}>Cancel</button>
        </div>
    </div>
{/if} -->

<!-- 

<script>
    import { ScheduleXCalendar } from '@schedule-x/svelte';
    import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
    import { createEventsServicePlugin } from '@schedule-x/events-service';
    import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
    import { createEventModalPlugin } from '@schedule-x/event-modal';
    import '@schedule-x/theme-default/dist/index.css';

    const eventsServicePlugin = createEventsServicePlugin();
    const calendarApp = createCalendar({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        events: [],
        plugins: [eventsServicePlugin, createDragAndDropPlugin(), createEventModalPlugin()]
    });

    let showModal = false;
    let newEventTitle = '';
    let newEventStart = '';
    let newEventEnd = '';

    function convertISOToReadable(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function handleCreateAppointment() {
        if (newEventTitle && newEventStart && newEventEnd) {
            const startDate = convertISOToReadable(newEventStart);
            const endDate = convertISOToReadable(newEventEnd);
            eventsServicePlugin.add({
                title: newEventTitle,
                start: startDate,
                end: endDate,
                id: Math.random().toString(36).substr(2, 9),
            })
            showModal = false;
            newEventTitle = '';
            newEventStart = '';
            newEventEnd = '';
        } else {
            alert('Please fill in all fields.');
        }
    }
</script>

<style>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 300px;
        max-width: 90%;
        box-sizing: border-box;
    }
    .modal-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    .modal-header button {
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }
    .modal-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal-body input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .modal-footer button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .modal-footer .create-btn {
        background-color: #4CAF50;
        color: white;
    }
    .modal-footer .cancel-btn {
        background-color: #f44336;
        color: white;
    }
</style>

<div>
    <ScheduleXCalendar calendarApp={calendarApp} />
    <button on:click={() => showModal = true}>Create Appointment</button>
</div>

{#if showModal}
    <div class="modal">
        <div class="modal-header">
            <button on:click={() => showModal = false}>×</button>
        </div>
        <div class="modal-body">
            <input type="text" bind:value={newEventTitle} placeholder="Title" />
            <input type="datetime-local" bind:value={newEventStart} />
            <input type="datetime-local" bind:value={newEventEnd} />
        </div>
        <div class="modal-footer">
            <button class="create-btn" on:click={handleCreateAppointment}>Create</button>
            <button class="cancel-btn" on:click={() => showModal = false}>Cancel</button>
        </div>
    </div>
{/if} 
 -->

 <!-- <script>
    import { ScheduleXCalendar } from '@schedule-x/svelte';
    import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
    import { createEventsServicePlugin } from '@schedule-x/events-service';
    import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
    import { createEventModalPlugin } from '@schedule-x/event-modal';
    import '@schedule-x/theme-default/dist/index.css';

    const eventsServicePlugin = createEventsServicePlugin();
    const calendarApp = createCalendar({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        events: [],
        plugins: [eventsServicePlugin, createDragAndDropPlugin()]
    });

    let showModal = false;
    let showEventOptions = false;
    let isEditing = false;
    let currentEventId = null;
    let newEventTitle = '';
    let newEventStart = '';
    let newEventEnd = '';
    let currentEvent = null;

    function convertISOToReadable(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function handleCreateOrUpdateAppointment() {
        if (newEventTitle && newEventStart && newEventEnd) {
            const startDate = convertISOToReadable(newEventStart);
            const endDate = convertISOToReadable(newEventEnd);

            if (isEditing && currentEventId !== null) {
                eventsServicePlugin.update({
                    title: newEventTitle,
                    start: startDate,
                    end: endDate,
                    id: currentEventId
                });
            } else {
                eventsServicePlugin.add({
                    title: newEventTitle,
                    start: startDate,
                    end: endDate,
                    id: Math.random().toString(36).substr(2, 9),
                });
            }

            showModal = false;
            newEventTitle = '';
            newEventStart = '';
            newEventEnd = '';
            isEditing = false;
            currentEventId = null;
            currentEvent = null;
        } else {
            alert('Please fill in all fields.');
        }
    }

    function handleDateClick(date) {
        newEventStart = date.toISOString().slice(0, 16);
        newEventEnd = new Date(date.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
        showModal = true;
        isEditing = false;
        currentEventId = null;
    }

    function handleEventClick(event) {
        currentEventId = event.id;
        currentEvent = eventsServicePlugin.get(event.id);
        if (currentEvent) {
            newEventTitle = currentEvent.title;
            newEventStart = new Date(currentEvent.start).toISOString().slice(0, 16);
            newEventEnd = new Date(currentEvent.end).toISOString().slice(0, 16);
            isEditing = true;
            showModal = true;
        }
    }

    function handleRemoveEvent() {
        if (confirm('Are you sure you want to remove this event?')) {
            eventsServicePlugin.remove(currentEventId);
            showModal = false;
            currentEventId = null;
            currentEvent = null;
        }
    }

    // Example of how to use event hooks
    function onEventClick(event) {
        handleEventClick(event);
    }

    function onDateClick(date) {
        handleDateClick(date);
    }

    // Hook up the event handlers after the component mounts
    $: calendarApp, () => {
        calendarApp.setEventClickHandler(onEventClick);
        calendarApp.setDateClickHandler(onDateClick);
    };
</script>

<style>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 300px;
        max-width: 90%;
        box-sizing: border-box;
    }
    .modal-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    .modal-header button {
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }
    .modal-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal-body input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .modal-footer button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .modal-footer .create-btn {
        background-color: #4CAF50;
        color: white;
    }
    .modal-footer .delete-btn {
        background-color: #f44336;
        color: white;
    }
    .modal-footer .cancel-btn {
        background-color: #ccc;
        color: black;
    }
</style>

<div>
    <ScheduleXCalendar calendarApp={calendarApp} />
    <button on:click={() => {
        showModal = true;
        isEditing = false;
        currentEventId = null;
    }}>Create Appointment</button>
</div>

{#if showModal}
    <div class="modal">
        <div class="modal-header">
            <button on:click={() => showModal = false}>×</button>
        </div>
        <div class="modal-body">
            <input type="text" bind:value={newEventTitle} placeholder="Title" />
            <input type="datetime-local" bind:value={newEventStart} />
            <input type="datetime-local" bind:value={newEventEnd} />
        </div>
        <div class="modal-footer">
            {#if isEditing}
                <button class="delete-btn" on:click={handleRemoveEvent}>Delete</button>
            {/if}
            <button class="create-btn" on:click={handleCreateOrUpdateAppointment}>
                {isEditing ? 'Update' : 'Create'}
            </button>
            <button class="cancel-btn" on:click={() => showModal = false}>Cancel</button>
        </div>
    </div>
{/if}

 -->



 <script>
    import { ScheduleXCalendar } from '@schedule-x/svelte';
    import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
    import { createEventsServicePlugin } from '@schedule-x/events-service';
    import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
    import { createEventModalPlugin } from '@schedule-x/event-modal';
    import '@schedule-x/theme-default/dist/index.css';
  
    const eventsServicePlugin = createEventsServicePlugin();
    const calendarApp = createCalendar({
      views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
      events: [],
      plugins: [eventsServicePlugin, createDragAndDropPlugin()]
    });
  
    let showModal = false;
    let showEventOptions = false;
    let isEditing = false;
    let currentEventId = null;
    let newEventTitle = '';
    let newEventStart = '';
    let newEventEnd = '';
    let currentEvent = null;
  
    function convertISOToReadable(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  
    function handleCreateOrUpdateAppointment() {
      if (newEventTitle && newEventStart && newEventEnd) {
        const startDate = convertISOToReadable(newEventStart);
        const endDate = convertISOToReadable(newEventEnd);
  
        if (isEditing && currentEventId !== null) {
          eventsServicePlugin.update({
            title: newEventTitle,
            start: startDate,
            end: endDate,
            id: currentEventId
          });
        } else {
          eventsServicePlugin.add({
            title: newEventTitle,
            start: startDate,
            end: endDate,
            id: Math.random().toString(36).substr(2, 9),
          });
        }
  
        showModal = false;
        newEventTitle = '';
        newEventStart = '';
        newEventEnd = '';
        isEditing = false;
        currentEventId = null;
        currentEvent = null;
      } else {
        alert('Please fill in all fields.');
      }
    }
  
    function handleDateClick(date) {
      newEventStart = date.toISOString().slice(0, 16);
      newEventEnd = new Date(date.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
      showModal = true;
      isEditing = false;
      currentEventId = null;
    }
  
    function handleEventClick(event) {
      currentEventId = event.id;
      currentEvent = eventsServicePlugin.get(event.id);
      if (currentEvent) {
        newEventTitle = currentEvent.title;
        newEventStart = new Date(currentEvent.start).toISOString().slice(0, 16);
        newEventEnd = new Date(currentEvent.end).toISOString().slice(0, 16);
        isEditing = true; // Set editing flag to true
        showModal = true;
      }
    }
  
    function handleRemoveEvent() {
      if (confirm('Are you sure you want to remove this event?')) {
        eventsServicePlugin.remove(currentEventId);
        showModal = false;
        currentEventId = null;
        currentEvent = null;
      }
    }
  
    // Example of how to use event hooks
    function onEventClick(event) {
        console.log('event ==', event);
      handleEventClick(event);
    }
  
    function onDateClick(date) {
      handleDateClick(date);
    }
  
    // Hook up the event handlers after the component mounts
    $: calendarApp, () => {
      calendarApp.setEventClickHandler(onEventClick);
      calendarApp.setDateClickHandler(onDateClick);
    };
  </script>
  
  <style>
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 20px;
      width: 300px;
      max-width: 90%;
      box-sizing: border-box;
    }
    .modal-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    }
    .modal-header button {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .modal-body input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .modal-footer button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .modal-footer .create-btn {
      background-color: #4CAF50;
      color: white;
    }
    .modal-footer .delete-btn {
      background-color: #f44336;
      color: white;
    }
    .modal-footer .cancel-btn {
      background-color: #ccc;
      color: black;
    }
  </style>
  
  <div>
    <ScheduleXCalendar calendarApp={calendarApp} />
    <button on:click={() => {
      showModal = true;
      isEditing = false;
      currentEventId = null;
    }}>Create Appointment</button>
  </div>
  
  {#if showModal}
    <div class="modal">
      <div class="modal-header">
        <button on:click={() => showModal = false}>×</button>
      </div>
      <div class="modal-body">
        <input type="text" bind:value={newEventTitle} placeholder="Title" />
        <input type="datetime-local" bind:value={newEventStart} />
        <input type="datetime-local" bind:value={newEventEnd} />
      </div>
      <div class="modal-footer">
        {#if isEditing}
          <button class="delete-btn" on:click={handleRemoveEvent}>Delete</button>
        {/if}
        <button class="create-btn" on:click={handleCreateOrUpdateAppointment}>
          {isEditing ? 'Update' : 'Create'}
        </button>
        <button class="cancel-btn" on:click={() => showModal = false}>Cancel</button>
      </div>
    </div>
  {/if}
  