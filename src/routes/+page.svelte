<script lang="ts">
	import { syncToServer } from '$lib/sync';
	import type { Patient } from '../lib/types';
	import { onMount, onDestroy } from 'svelte';
	import Spinner from './Spinner.svelte';
	import Login from './login/+page.svelte';

	let patients: Patient[] = [];
	let loadTime: number | null = null;
	let loading = false;
	let worker: Worker | null = null;

	function handleWorkerMessage(event: MessageEvent) {
		patients = [];
		const { status, data, error } = event.data;
		if (status === 'success') {
		patients = data;
		} else {
		console.error('Worker error:', error);
		}
	//	console.log(data);
		loading = false;
		loadTime = performance.now() - start;
	}

	let start: number; // Move the declaration of the start variable here
	
	async function loadData() {
		if (!worker) {
		console.error('Worker is not initialized');
		return;
		}
	
		loading = true;
		start = performance.now(); // Assign the value to the start variable
		worker.postMessage('loadPatients');
	}

	function handleButtonClick() {
		loadData();
	}

	async function triggerSync() {
			syncToServer();
	}

	onMount(() => {
		worker = new Worker(new URL('../workers/patientWorker.ts', import.meta.url));
		worker.addEventListener('message', handleWorkerMessage);
	});

	onDestroy(() => {
		if (worker) {
		worker.terminate();
		worker = null;
		}
	});
</script>


<style>
	.container {
		padding: 1rem;
		width: 100%;
		min-width: 100%;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		font-weight: 600;
		text-align: center;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.btn-primary {
		background-color: #3b82f6;
		color: white;
	}

	.btn-primary:hover {
		background-color: #2563eb;
	}

	.btn-secondary {
		background-color: #14b8a6;
		color: white;
	}

	.btn-secondary:hover {
		background-color: #0d9488;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		padding: 0.75rem;
		text-align: left;
	}

	th {
		background-color: #f3f4f6;
		color: #4b5563;
		font-weight: 600;
		border-bottom: 2px solid #e5e7eb;
	}

	td {
		border-bottom: 1px solid #e5e7eb;
		color: #6b7280;
	}

	@media (max-width: 600px) {
		table {
			display: block;
			overflow-x: auto;
		}
	
		thead {
			display: none;
		}
	
		tbody {
			display: block;
		}
	
		tr {
			display: flex;
			flex-direction: column;
			margin-bottom: 1rem;
		}
	
		td {
			display: block;
			text-align: right;
			position: relative;
			padding-left: 50%;
			border: none;
		}
	
		td::before {
			content: attr(data-label);
			position: absolute;
			left: 0;
			width: 50%;
			padding-right: 0.5rem;
			white-space: nowrap;
			font-weight: 600;
			color: #4b5563;
		}
	}
</style>

<!-- <div class="container">
	{#if loadTime !== null}
	    <p class="mt-2 text-gray-700">Load time: {loadTime.toFixed(2)} ms</p>
	{/if}

	<div class="mb-4">
	  <button on:click={triggerSync} class="btn btn-secondary">
		<i class="fa-solid fa-sync mr-2"></i>
		Sync with PostgreSQL
	  </button>
	  <button 
		on:click={handleButtonClick} 
		class="btn btn-primary"
		disabled={loading}
	  >
	  <i class="fa-solid fa-user mr-2"></i>
		{loading ? 'Loading...' : 'Load Patients'}
	  </button>
	</div>
  
	{#if loading}
	  <div class="flex justify-center items-center h-32">
		<Spinner size="3rem" />
		</div>
		{:else}
		<div class="overflow-x-auto">
			<table>
			<thead>
				<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Surname</th>
				<th>Email</th>
				<th>Cellphone</th>
				<th>ID Number</th>
				<th>DOB</th>
				</tr>
			</thead>
			<tbody>
				{#each patients as patient}
				<tr>
					<td data-label="ID">{patient.id}</td>
					<td data-label="Name">{patient.name}</td>
					<td data-label="Surname">{patient.surname}</td>
					<td data-label="Email">{patient.email}</td>
					<td data-label="Cellphone">{patient.cellphone}</td>
					<td data-label="ID Number">{patient.idNumber}</td>
					<td data-label="DOB">{patient.dob}</td>
				</tr>
				{/each}
			</tbody>
			</table>
		</div>
	{/if}
</div> -->

<Login />