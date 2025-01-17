console.log('We are on the list page');

/* Retrieve elements for the empty message and the table */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');

/* Get animal records from local storage using the AnimalService */
const records = animalService.getAnimals();

if (!records.length) {
    // Show the empty message if no records are available
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    // Show the table and populate it if records exist
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
}

/**
 * Draws the animal table.
 * @param {Array} animals - Array of animal objects to display in the table.
 */
function drawAnimalTable(animals) {
    // Clear the table and add the header row
    eleTable.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Eyes</th>
                <th>Legs</th>
                <th>Sound</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="animal-list-body"></tbody>
    `;

    const tableBody = document.getElementById('animal-list-body');

    // Iterate through each animal and create a row
    animals.forEach((animal) => {
        const row = document.createElement('tr');

        // Create a cell for each property
        Object.values(animal).forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Add action buttons
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
        editButton.addEventListener('click', () => editAnimal(animal));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteAnimal(animal));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

/**
 * Handles editing an animal.
 * @param {Object} animal - The animal object to edit.
 */
function editAnimal(animal) {
    const updatedName = prompt('Enter a new name for the animal:', animal.name);
    if (updatedName) {
        try {
            animalService.updateAnimal({ ...animal, name: updatedName });
            alert('Animal updated successfully!');
            location.reload(); // Reload the page to reflect changes
        } catch (error) {
            alert('Error updating animal: ' + error.message);
        }
    }
}

/**
 * Handles deleting an animal.
 * @param {Object} animal - The animal object to delete.
 */
function deleteAnimal(animal) {
    if (confirm(`Are you sure you want to delete "${animal.name}"?`)) {
        try {
            animalService.deleteAnimal(animal);
            alert('Animal deleted successfully!');
            location.reload(); // Reload the page to reflect changes
        } catch (error) {
            alert('Error deleting animal: ' + error.message);
        }
    }
}
