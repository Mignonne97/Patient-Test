<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let id: string;
    let name: string;
    let time: string;
    let status: string;
    let type: string;
    let age: string;
    let gender: string;
    let allergies: string;
    let img: string;
    let activeButton:any = null;
    let activeTab: string = 'Clinical Case'; // default active tab

    onMount(() => {
        const urlParams = new URLSearchParams($page.url.searchParams);
        id = urlParams.get('id') ?? '';
        name = urlParams.get('name') ?? '';
        time = urlParams.get('time') ?? '';
        status = urlParams.get('status') ?? '';
        type = urlParams.get('type') ?? '';
        age = urlParams.get('age') ?? '';
        gender = urlParams.get('gender') ?? '';
        allergies = urlParams.get('allergies') ?? '';
        img = urlParams.get('img') ?? '';
    });

    const toggleButton = (appointmentId:any) => {
        activeButton = activeButton === appointmentId ? null : appointmentId;
    };

    const setActiveTab = (tab:any) => {
        activeTab = tab;
    };

</script>

<style>
    .appointment-details {
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        background-color: #fff;
        margin: 1rem auto;
        height: 91.5dvh;
    }

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .headerIcon {
        transform: scale(1.5);
    }

    .header img {
        width: 64px;
        height: 64px;
        border-radius: 30%;
        object-fit: cover;
        margin-right: 1rem;
    }

    .header .info {
        flex: 1;
    }

    .header .info h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .header .info p {
        margin: 0.25rem 0;
        font-size: 0.875rem;
        color: #555;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }

    .tags span {
        background-color: #e0e0e0;
        color: #333;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
    }

    .tabs {
        display: flex;
        gap: 1rem;
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 1rem;
    }

    .tabs a {
        text-decoration: none;
        color: #333;
        padding: 0.5rem 0;
        font-size: 0.875rem;
    }

    .tabs a.active {
        color: #218e7b;
        border-bottom: 2px solid #218e7b;
    }

    .buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .active-forms {
        margin-top: 1rem;
    }

    .form-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f8f9fa;
        padding: 0.5rem;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
    }

    .form-card .info {
        flex: 1;
    }

    .form-card .info p {
        margin: 0;
        font-size: 0.875rem;
    }

    .form-card .actions {
        display: flex;
        gap: 0.5rem;
    }

    .btn-custom {
        background-color: white;
        color: #218e7b;
        border: 1px solid #218e7b;
        border-radius: 10px;
    }
    .btn-group {
        display: flex;
        gap: 0.5rem;
        margin-right: auto;
    }
    .btn-custom-active {
        background-color: #218e7b;
        color: white;
    }
    .appointment-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        background-color: #fff;
        margin-bottom: 1rem;
        transition-property: all;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
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
    .btn-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        width: 100dvw;
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
</style>

<div class="min-h-screen bg-[#218e7b]">
    <!-- Header -->
    <div class="bg-[#218e7b] p-4 flex justify-between items-center text-white">
        <button class="btn btn-circle bg-transparent border-none" on:click={() => goto(`/diary/`)}>
            <i class="fa-solid fa-arrow-left-long text-white headerIcon"></i>
        </button>
        <button class="btn btn-circle bg-transparent border-none">
            <i class="fa-solid fa-cloud-arrow-up text-white headerIcon"></i>
        </button>
    </div>

    <div class="appointment-details">
        <div class="header">
            <img src={img} alt={name}>
            <div class="info">
                <h3>{name}</h3>
                <p>{age} yo • {gender} • {allergies}</p>
            </div>
        </div>
        <div class="tags">
            <span>Diabetes</span>
            <span>Under Control</span>
            <span>HIV</span>
            <span>Controlled</span>
            <span>Timer Daily</span>
        </div>
        <div class="tabs">
            <a href="#" class:active={activeTab === 'Clinical Case'} on:click={() => setActiveTab('Clinical Case')}>Clinical Case</a>
            <a href="#" class:active={activeTab === 'Medical History'} on:click={() => setActiveTab('Medical History')}>Medical History</a>
            <a href="#" class:active={activeTab === 'Patient File'} on:click={() => setActiveTab('Patient File')}>Patient File</a>
        </div>

        {#if activeTab === 'Clinical Case'}
        <div>
            <div class="buttons">
                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                    <i class="fa-regular fa-note-sticky mr-2"></i>Quick Note
                </button>
                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                    <i class="fa-solid fa-notes-medical mr-2"></i>Sick Note
                </button>
                <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                    <i class="fa-solid fa-people-arrows mr-2"></i>Referral
                </button>
            </div>
            <div class="appointment-card">
                <div class="appointment-header">
                    <div>
                        <span class="mr-4">Quick Note</span>
                        <span class="mr-4">2024-04-01</span>
                        <button class="btn btn-circle bg-transparent border-none">
                            <i class="fa-solid fa-cloud-arrow-up text-[#218e7b] headerIcon"></i>
                        </button>
                    </div>
                    <button class="btn btn-ghost ml-auto" on:click={() => toggleButton(true)}>
                        {#if activeButton === true}
                        <i class="fa-solid fa-chevron-up"></i>
                        {:else}
                        <i class="fa-solid fa-chevron-down"></i>
                        {/if}
                    </button>
                </div>
                <!-- Additional Information -->
                {#if activeButton === true}
                <div class="additional-info m-4">
                    <div class="btn-container">
                        <button class="bg-white text-red-500 border border-red-500 mr-4 rounded-[10px] px-4 py-[0.6rem]">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <div class="btn-group">
                            <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                <i class="fa-regular fa-eye"></i>
                            </button>
                            <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                <i class="fa-solid fa-download"></i>
                            </button>
                            <button class="btn-custom-active rounded-[10px] px-4 py-[0.6rem]">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/if}
            </div>
        </div>
        {/if}

        {#if activeTab === 'Medical History'}
        <h1>Test</h1>
        {/if}

        {#if activeTab === 'Patient File'}
        <h1>Test 2</h1>
        {/if}
    </div>
</div>
