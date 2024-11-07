<script lang="ts">
    import type { Patient } from '$lib/server/db';
    import { runQuery, runStorageQuery } from '$lib/sqlite/dataApi';
    import { waitTillStroageReady } from '$lib/sqlite/initStorages';
    import { onMount } from 'svelte';

    let storageReady = false;
    let patients: Patient[] = [];
    let loading = false;
    let searchTerm = '';

    onMount(async () => {
		await waitTillStroageReady('patients_v1');
		storageReady = true;

    });
    const loadData = async () => {
		if (searchTerm === '') {
			alert('Add search term');
		} else {
			loading = true;
			patients = [];
			patients = (await runStorageQuery('patients_v1', {
				orderByCol: 'name',
				orderByDir: 'desc',
				searchTerm: searchTerm.trim()
			})) as Patient[];
			loading = false;
			console.log(patients);
		}
    }
</script>

<h1 class="text-5xl text-teal-500">SvelteKit Offline SQLite</h1>

<div>
    Storage Ready ===  {storageReady ? 'true' : 'false'}
</div>

<div class="flex items-center mb-4">
    <input type="text" bind:value={searchTerm} class="border px-2 py-1 rounded-l-full w-full h-[55px]" placeholder="Search by name, surname, cellphone, email, id number, dob...">
    <button class="bg-teal-500 hover:bg-blue-700 text-white text-[15px] font-bold py-2 px-4 rounded-r-full h-[55px]" on:click={loadData}>Load data</button>
</div>

{#if loading}
	<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
{:else}
    <div>
        <table class="w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Surname</th>
                    <th class="px-4 py-2">Cellphone</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">ID Number</th>
                    <th class="px-4 py-2">DOB</th>
                </tr>
            </thead>
            <tbody>
                {#each patients as patient}
                <tr>
                    <td class="border px-4 py-2">{patient.id}</td>
                    <td class="border px-4 py-2">{patient.name}</td>
                    <td class="border px-4 py-2">{patient.surname}</td>
                    <td class="border px-4 py-2">{patient.cellphone}</td>
                    <td class="border px-4 py-2">{patient.email}</td>
                    <td class="border px-4 py-2">{patient.idNumber}</td>
                    <td class="border px-4 py-2">{patient.dob}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}

<style>
	.lds-ellipsis,
	.lds-ellipsis div {
	box-sizing: border-box;
	color: teal;
	}
	.lds-ellipsis {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	left: 50%;
	}
	.lds-ellipsis div {

	position: absolute;
	top: 33.33333px;
	width: 13.33333px;
	height: 13.33333px;
	border-radius: 50%;
	background: currentColor;
	animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
	left: 8px;
	animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
	left: 8px;
	animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
	left: 32px;
	animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
	left: 56px;
	animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
	}
	@keyframes lds-ellipsis3 {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
	}
	@keyframes lds-ellipsis2 {
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(24px, 0);
	}
	}
</style>