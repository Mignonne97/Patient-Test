

<script lang="ts">
    import type { Patient } from '../../lib/types';
  
    // Define state variables
    let patients: Patient[] = [];
    let loadTime: number | null = null;
    let page = 1;
    let totalPages = 1; // Assume at least one page
    let loading = false;
  
    // Function to fetch data
    async function fetchPatients(pageNumber: number) {
      if (loading) return; // Prevent multiple concurrent fetches
      loading = true;
  
      const start = performance.now();
  
      try {
        const limit = 50; // Number of records per page
        const offset = (pageNumber - 1) * limit;
        const response = await fetch(`/api/patients?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        patients = data;
        //console.log(patients);
        // Update totalPages based on the total number of records
        const totalRecords = await fetchTotalRecords();
        totalPages = Math.ceil(totalRecords / limit);
  
        const end = performance.now();
        loadTime = end - start;
      } catch (error) {
        console.error('Error loading patients:', error);
      } finally {
        loading = false;
      }
    }
  
    // Function to fetch the total number of records
    async function fetchTotalRecords(): Promise<number> {
      try {
        const response = await fetch('/api/total-records');
        const data = await response.json();
        return data.total;
      } catch (error) {
        console.error('Error fetching total records:', error);
        return 0;
      }
    }

    function getVisiblePages() {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(totalPages, page + halfVisible);

    // Adjust startPage if there are not enough pages before the current page
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  }
  
    // Function to handle button click for loading more data
    function handlePageChange(newPage: number) {
      if (newPage > 0 && newPage <= totalPages) {
        page = newPage;
        fetchPatients(page);
      }
    }
  
  </script>
   <div class="p-4">
    <button 
      on:click={() => fetchPatients(page)} 
      class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      Load Patients
    </button>
   </div>

<!-- Pagination controls -->
<div class="flex justify-center mt-4">
    <button on:click={() => handlePageChange(page - 1)} 
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
            disabled={page <= 1}>
      Previous
    </button>
    
    {#each Array(getVisiblePages().endPage - getVisiblePages().startPage + 1) as _, i}
      {#if page > getVisiblePages().startPage - 1 && page <= getVisiblePages().endPage}
        <button on:click={() => handlePageChange(getVisiblePages().startPage + i)}
                class={`px-4 py-2 rounded ${page === getVisiblePages().startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition`}>
          {getVisiblePages().startPage + i}
        </button>
      {/if}
    {/each}
  
    <button on:click={() => handlePageChange(page + 1)}
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 transition"
            disabled={page >= totalPages}>
      Next
    </button>
  </div>
  
  <!-- Load time -->
  {#if loadTime !== null}
    <p class="mt-2">Load time: {loadTime.toFixed(2)} ms</p>
  {/if}
  
  <!-- Data table -->
  <table class="table-auto w-full mt-4 border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class="px-4 py-2 border-b">ID</th>
        <th class="px-4 py-2 border-b">Name</th>
        <th class="px-4 py-2 border-b">Surname</th>
        <th class="px-4 py-2 border-b">Email</th>
        <th class="px-4 py-2 border-b">Cellphone</th>
        <th class="px-4 py-2 border-b">ID Number</th>
        <th class="px-4 py-2 border-b">DOB</th>
      </tr>
    </thead>
    <tbody>
      {#each patients as patient}
        <tr>
          <td class="border px-4 py-2">{patient.id}</td>
          <td class="border px-4 py-2">{patient.name}</td>
          <td class="border px-4 py-2">{patient.surname}</td>
          <td class="border px-4 py-2">{patient.email}</td>
          <td class="border px-4 py-2">{patient.cellphone}</td>
          <td class="border px-4 py-2">{patient.idNumber}</td>
          <td class="border px-4 py-2">{patient.dob}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  