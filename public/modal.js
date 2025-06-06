// Get the button and modal elements
const newRequestBtn = document.getElementById('newRequestBtn');
const modal = document.createElement('div');
const modalContent = `
    <div class="modal">
        <div class="modal-header">
            
            <button id="closeModalBtn">&times;</button>
        </div>
        <div class="modal-body">
            <form id="requestForm">
            <h2>Approval Forms</h2>
                <label for="customer">Select or enter Customer:</label>
                <input type="text" id="customer" required>

                <label for="cloud">Environment:</label>
                <select id="cloud" required>
                    <option value="">Select</option>
                    <option value="aws">Development</option>
                    <option value="azure">Validation</option>
                    <option value="azure">Production</option>
                </select>

                <label for="remarks">Remarks:</label>
                <textarea id="remarks" required>Please specify the reason for the access</textarea>

                <button type="submit">Save</button>
                <button type="button" id="closeModalBtn">Close</button>
            </form>
        </div>
    </div>
`;

// Append modal content to the body
modal.innerHTML = modalContent;
document.body.appendChild(modal);

// Show modal on button click
newRequestBtn.onclick = function() {
    modal.style.display = 'block';
};

// Close modal functionality
modal.onclick = function(event) {
    if (event.target.id === 'closeModalBtn' || event.target.className === 'modal') {
        modal.style.display = 'none';
    }
};

// Handle form submission
document.getElementById('requestForm').onsubmit = function(event) {
    event.preventDefault();
    // Handle form data here
    alert('Form submitted!');
    modal.style.display = 'none';
};

// Add some basic styles for the modal
const style = document.createElement('style');
style.innerHTML = `
    .modal {
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }
    .modal-header {
        background:rgb(205, 203, 221);
        color: white;
        padding: 10px;
        width: 20%;
        text-align: center; /* Center the title */
        position: relative;
    }
    .modal-header h2 {
        margin: 0;
    }
    .modal-header button {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
    .modal-header button:hover {
        background: none; /* Remove hover effect */
        color: white;
    }
    .modal-body {
        background: white;
        padding: 20px;
        border-radius: 5px;
        width: 300px;
    }
    .modal-body label {
        display: block;
        margin: 10px 0 5px;
    }
    .modal-body input, .modal-body select, .modal-body textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);

document.getElementById('requestForm').onsubmit = async function(event) {
    event.preventDefault();
    const formData = {
        customer: document.getElementById('customer').value,
        environment: document.getElementById('cloud').value,
        remarks: document.getElementById('remarks').value
    };

    try {
        const response = await fetch('http://localhost:3000/save_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            alert('Form submitted successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form.');
    }

    modal.style.display = 'none';
};
