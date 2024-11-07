<script>
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { runStorageQuery } from '$lib/sqlite/dataApi';
    import { waitTillStroageReady } from '$lib/sqlite/initStorages';

    let selectedDate = new Date().toISOString().split('T')[0]; // Default to today's date
    let activeButton = null;
    let isMenuOpen = false; // Track the state of the side menu
    let bookings = [];
    let appointments = [];
    let filteredAppointments = [];
    let calendarIcon;
    let dateInput;
    let cmpDatePicker;
    let viewCalendar = false;

    onMount(async () => {
        await waitTillStroageReady('bookings_v1');
        loadData();
        calendarIcon = document.getElementById('calendarIcon');
        dateInput = document.getElementById('myDate');

        if (calendarIcon) {
        calendarIcon.addEventListener('click', () => {
            console.log('calendarIcon clicked');
            viewCalendar = true;
            dateInput.showPicker();
        });
        } else {
        console.error('calendarIcon element not found');
        }
    });

    const loadData = async () => {
        bookings = (await runStorageQuery('bookings_v1', {
            orderByCol: 'idNumber',
            orderByDir: 'desc',
            searchTerm: ''
        }));
        appointments = bookings.map(person => {
            return {
                ...person,
                age: calculateAgeFromIdNumber(person.idNumber)
            };
        });
        console.log(appointments);
        // Initial filtering based on today's date
        filterAppointments();
    }

    function datepicked (e) {
        viewCalendar = false;
		console.log(e.detail.datepicked)
	}

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

    // Reactive statement to filter appointments whenever selectedDate changes
    $: filteredAppointments = appointments.filter(appointment => appointment.date === selectedDate);

    // Sort appointments by time
    filteredAppointments = filteredAppointments.sort((a, b) => new Date(`1970/01/01 ${a.time.split(' - ')[0]}`) - new Date(`1970/01/01 ${b.time.split(' - ')[0]}`));

    const toggleButton = (appointmentId) => {
        console.log('test ', appointmentId);
        if (appointmentId === 'calendar') {
            goto(`/scheduler`);
        } else if (appointmentId === 'user') {
            // go to users
        } else if (appointmentId === 'list') {
            // go to list
        } else {
            activeButton = activeButton === appointmentId ? null : appointmentId;
        }
    };

    const viewBooking = (appointment) => {
        const query = new URLSearchParams(appointment).toString();
        goto(`/bookings/${appointment.id}?${query}`);
    };

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const closeMenu = () => {
        isMenuOpen = false;
    };

    // Filter appointments when the selectedDate changes
    const filterAppointments = () => {
        filteredAppointments = appointments.filter(appointment => appointment.date === selectedDate);
        console.log(filteredAppointments);
    };
</script>

<style>
    .appointment-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        background-color: #fff;
        margin-bottom: 1rem;
        transition: all 0.3s ease-in-out;
    }

    .appointment-header {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .additional-info {
        margin: 0.5rem;
    }

    .expanded {
        border: 1px solid gray;
    }

    .customCard {
        height: 100%;
        min-height: 92.5dvh;
        background: white;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        border: 1px solid white;
    }

    .headerIcon {
        transform: scale(1.5);
    }

    .btn-custom {
        background-color: white;
        color: #218e7b;
        border: 1px solid #218e7b;
        border-radius: 10px;
    }

    .btn-custom {
        background-color: white;
        color: #218e7b;
        border: 1px solid #218e7b;
        border-radius: 10px;
    }

    .btn-custom2 {
        background-color: #218e7b;
        color: white;
        border: 1px solid white;
        border-radius: 10px;
    }

    .btn-custom:hover {
        background-color: #218e7b;
        color: white;
    }

    .btn-custom-active:hover {
        background-color: white;
        color: #218e7b;
        border: 1px solid #218e7b;
    }

    .btn-custom-active {
        background-color: #218e7b;
        color: white;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        background: white;
        border-radius: 50%;
        padding: 5px;
    }

    .btn-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        width: 100%;
    }

    .btn-group {
        display: flex;
        gap: 0.5rem;
        margin-right: auto;
    }

    /* Side Menu Styles */
    .side-menu {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background-color: white;
        color: #218e7b;
        overflow-x: hidden;
        transition: 0.3s;
        z-index: 1000;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        box-shadow: 4px 0 6px rgba(0, 0, 0, 0.2);
    }

    .side-menu.open {
        width: 60%;
    }

    .side-menu .close-btn {
        position: absolute;
        top: 10px;
        right: 25px;
        font-size: 36px;
        color: red;
        cursor: pointer;
    }

    .side-menu a {
        padding: 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #218e7b;
        display: block;
        transition: 0.3s;
    }

    .side-menu a:hover {
        color: #ddd;
        background: #218e7b;
    }
    ::-webkit-calendar-picker-indicator {
        filter: invert(59%) sepia(100%) saturate(341%) hue-rotate(120deg) brightness(90%) contrast(84%);
    }
</style>


<div class="min-h-screen bg-[#218e7b]">
    <!-- Header -->
    <div class="bg-[#218e7b] p-4 flex justify-between items-center text-white">
        <button class="btn btn-circle bg-transparent border-none" on:click={toggleMenu}>
            <i class="fas fa-bars text-white headerIcon"></i>
        </button>
        <div class="relative mx-auto">
            <input 
                type="date" 
                id="myDate"
                bind:value={selectedDate} 
                class="pl-5 pr-2 py-[0.6rem] text-white text-center bg-transparent sm:text-sm" 
            /> 
            <i id="calendarIcon" class="fa-regular fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-white"></i>
        </div>
    </div>

    <!-- Side Menu -->
    <div class="side-menu {isMenuOpen ? 'open' : ''}">
        <!-- Side Menu -->
        <div class="flex justify-end p-4">
            <button class="text-2xl text-gray-600" on:click={closeMenu}>&times;</button>
        </div>
        <nav class="flex flex-col p-4">
            <button class="flex items-center p-2 text-lg text-[#218e7b] hover:bg-gray-200 rounded-md mb-2">
                <i class="fa-regular fa-calendar mr-2"></i> Diary
            </button>
            <button class="flex items-center p-2 text-lg text-[#218e7b] hover:bg-gray-200 rounded-md mb-2">
                <i class="fa-solid fa-people-group mr-2"></i> Debtors
            </button>
            <button class="flex items-center p-2 text-lg text-[#218e7b] hover:bg-gray-200 rounded-md mb-2">
                <i class="fa-solid fa-cloud-arrow-up mr-2"></i> Sync
            </button>
            <button class="flex items-center p-2 text-lg text-[#218e7b] hover:bg-gray-200 rounded-md mb-2">
                <i class="fa-solid fa-gear mr-2"></i> Settings
            </button>
            <button class="flex items-center p-2 text-lg text-[#218e7b] hover:bg-gray-200 rounded-md mb-2">
                <i class="fa-solid fa-circle-question mr-2"></i> Help
            </button>
            <button class="w-full text-left p-2 text-lg text-black hover:bg-gray-200 rounded-md" on:click={() => goto(`/login`)}>
                Logout
            </button>
        </nav>
    </div>

    <!-- Content -->
    <div class="p-4 customCard">
        <div class="flex items-center mb-4">
            <button 
                class="btn-custom mr-auto {activeButton === 'user' ? 'btn-custom-active' : ''}" 
                on:click={() => toggleButton('user')}>
                <i class="fa-solid fa-filter m-[1rem]"></i>
            </button>
            <div class="flex space-x-2 ml-auto">
                <button class="p-3 btn-custom2 mr-auto">
                    <i class="fa-solid fa-book-medical text-white mr-2"></i>
                    New Booking
                </button>
            </div>
        </div>
        
        <!-- Appointments -->
        <div>
            <h2 class="text-xl font-bold mb-2">Appointments</h2>
            {#if filteredAppointments.length === 0}
                <p class="text-center text-gray-500">No appointments found for today</p>
            {/if}
            {#each filteredAppointments as appointment}
                <div class="appointment-card {activeButton === appointment.id ? 'expanded' : ''}">
                    <div class="appointment-header">
                        <img src="{appointment.img}" alt="{appointment.name}" class="w-[4rem] h-[4rem] mr-4 rounded-[30%]">
                        <div>
                            <h3 class="text-lg font-semibold">{appointment.name}</h3>
                            <p class="text-sm">{appointment.time}</p>
                            <p class="text-sm flex items-center">
                                <span class="badge badge-warning mr-2">{appointment.status}</span>
                                <span class="badge badge-secondary">{appointment.type}</span>
                            </p>
                        </div>
                        <button class="btn btn-ghost ml-auto" on:click={() => toggleButton(appointment.id)}>
                            {#if activeButton === appointment.id}
                                <i class="fa-solid fa-chevron-up"></i>
                            {:else}
                                <i class="fa-solid fa-chevron-down"></i>
                            {/if}
                        </button>
                    </div>

                    <!-- Additional Information -->
                    {#if activeButton === appointment.id}
                    <div class="additional-info m-4">
                        <h3 class="font-bold my-4">Appointment Details</h3>
                        <p><strong>Age:</strong> {appointment.age}</p>
                        <p><strong>Allergies:</strong> {appointment.allergies}</p>
                        <p><strong>Gender:</strong> {appointment.gender}</p>
                        <p><strong>Status/Type:</strong>
                            <span class="badge badge-warning mr-2">{appointment.status}</span>
                            <span class="badge badge-secondary">{appointment.type}</span>
                        </p>
                        <div class="btn-container">
                            <button class="p-2 btn-custom mr-2" on:click={() => viewBooking(appointment)}>
                                View Booking
                            </button>
                            <div class="btn-group">
                                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                    <i class="fa-solid fa-book-medical"></i>
                                </button>
                                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                    <i class="fa-solid fa-notes-medical"></i>
                                </button>
                                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>