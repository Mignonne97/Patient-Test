/// <reference lib="webworker" />

self.addEventListener('message', async (event) => {
    if (event.data === 'loadPatients') {
      try {
        const response = await fetch('/api/patients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const patients = await response.json();
        self.postMessage({ status: 'success', data: patients });
      } catch (error) {
        self.postMessage({ status: 'error', error: error.message });
      }
    }
  });
  