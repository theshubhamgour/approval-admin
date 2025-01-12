document.getElementById('allRequestBtn').onclick = async function() {
    console.log('All Request button clicked'); // Debugging: Check if the button click is registered

    try {
        const response = await fetch('http://localhost:3000/get_requests');
        console.log('Response:', response); // Debugging: Check the response

        const data = await response.json();
        console.log('Data:', data); // Debugging: Check the fetched data

        if (data.success) {
            displayRequests(data.requests);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Failed to fetch requests.');
    }
};

function displayRequests(requests) {
    console.log('Requests:', requests); // Debugging: Check the requests data
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    requests.forEach((request) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.customer}</td>
            <td>${request.environment}</td>
            <td>${request.remarks}</td>
            <td>${request.created_at}</td>
        `;
        tbody.appendChild(row);
    });
}