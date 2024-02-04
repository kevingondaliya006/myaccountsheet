// script.js
let entries = [];

function showAddExpense() {
    document.getElementById('content').innerHTML = `
        <form id="addExpenseForm" onsubmit="addExpense(); return false;">
            <label for="description">Description:</label>
            <input type="text" id="description" required>
            
            <label for="amount">Amount:</label>
            <input type="number" id="amount" required>
            
            <button type="submit">Add Expense</button>
        </form>
    `;
}

function showAllEntries() {
    let entriesHTML = '<h2>All Entries</h2>';
    
    if (entries.length === 0) {
        entriesHTML += '<p>No entries yet.</p>';
    } else {
        entriesHTML += `
            <table>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
        `;
        entries.forEach((entry, index) => {
            const entryClass = entry.amount >= 0 ? 'green' : 'red';
            entriesHTML += `
                <tr class="${entryClass}">
                    <td>${entry.description}</td>
                    <td>${entry.amount}</td>
                    <td>
                        <button onclick="editEntry(${index})">Edit</button>
                        <button onclick="deleteEntry(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
        entriesHTML += '</table>';
    }

    document.getElementById('content').innerHTML = entriesHTML;
}

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    entries.push({ description, amount });
    showAllEntries();
}

function editEntry(index) {
    const updatedDescription = prompt('Enter updated description:', entries[index].description);
    const updatedAmount = parseFloat(prompt('Enter updated amount:', entries[index].amount));

    if (updatedDescription !== null && !isNaN(updatedAmount)) {
        entries[index] = { description: updatedDescription, amount: updatedAmount };
        showAllEntries();
    }
}

function deleteEntry(index) {
    const confirmation = confirm('Are you sure you want to delete this entry?');

    if (confirmation) {
        entries.splice(index, 1);
        showAllEntries();
    }
}

// Initial entry for testing
entries.push({ description: 'Salary', amount: 5000 });
entries.push({ description: 'Groceries', amount: -50.00 });

// Show initial content

showAllEntries();
