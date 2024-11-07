

export async function syncToServer() {
    try {
        const appointments = [
            {
                "name": "testing 02",
                "surname": "9:00AM",
                "email": "9:30AM",
                "celphone": "",
                "id": 1,
                "dob": "July_25_2024"
            }
        ]
        
        // const response = await fetch('/api/sync', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ appointments }),
        // });

        const response = await fetch('/api/sync', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        //console.log(result);
        if (result.success) {
            alert(' successful!');
        } else {
            alert(' failed: ' + result.error);
        }
    } catch (error) {
        alert('Error  data: ' + (error as Error).message);
    }
}
