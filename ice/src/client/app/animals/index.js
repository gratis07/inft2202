import animalService from "./animal.service.mock.js";

function animal() {
    const form = document.createElement('form');
    let description = 'Add Animal';

    function createContent() {
        // Main container for the form
        const container = document.createElement('div');
        container.classList.add('mb-2');

        // Create Name Field
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        mb3Name.innerHTML = `
            <label for="name" class="form-label">Animal Name</label>
            <input type="text" class="form-control" id="name" name="name">
            <p class="text-danger d-none">Name is required.</p>
        `;
        container.append(mb3Name);

        // Create Legs Field
        const mb3Leg = document.createElement('div');
        mb3Leg.classList.add('mb-3');
        mb3Leg.innerHTML = `
            <label for="legs" class="form-label">Number of Legs</label>
            <input type="number" class="form-control" id="legs" name="legs">
            <p class="text-danger d-none">Number of legs must be a positive number.</p>
        `;
        container.append(mb3Leg);

        // Create Breed Field
        const mb3Breed = document.createElement('div');
        mb3Breed.classList.add('mb-3');
        mb3Breed.innerHTML = `
            <label for="breed" class="form-label">Breed</label>
            <input type="text" class="form-control" id="breed" name="breed">
            <p class="text-danger d-none">Breed is required.</p>
        `;
        container.append(mb3Breed);

        // Create Sound Field
        const mb3Sound = document.createElement('div');
        mb3Sound.classList.add('mb-3');
        mb3Sound.innerHTML = `
            <label for="sound" class="form-label">Sound</label>
            <input type="text" class="form-control" id="sound" name="sound">
            <p class="text-danger d-none">Sound is required.</p>
        `;
        container.append(mb3Sound);

        // Add Submit Button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.classList.add('btn', 'btn-primary');
        submitBtn.textContent = 'Submit';
        container.append(submitBtn);

        form.append(container);
        return form;
    }

    function validate() {
        let valid = true;

        // Form field elements and their error messages
        const fields = [
            { id: 'name', errorMessage: 'Name is required.' },
            { id: 'legs', errorMessage: 'Number of legs must be a positive number.' },
            { id: 'breed', errorMessage: 'Breed is required.' },
            { id: 'sound', errorMessage: 'Sound is required.' },
        ];

        // Validate all fields
        fields.forEach(({ id, errorMessage }) => {
            const input = form.querySelector(`#${id}`);
            const error = input.nextElementSibling;

            error.classList.add('d-none'); // Reset error visibility

            if (id === 'legs') {
                const value = parseInt(input.value, 10);
                if (isNaN(value) || value <= 0) {
                    error.textContent = errorMessage;
                    error.classList.remove('d-none');
                    valid = false;
                }
            } else if (id === 'name' && !input.value.trim()) {
                error.textContent = errorMessage;
                error.classList.remove('d-none');
                valid = false;
            } else if (id === 'breed' && !input.value.trim()) {
                error.textContent = errorMessage;
                error.classList.remove('d-none');
                valid = false;
            } else if (id === 'sound' && !input.value.trim()) {
                error.textContent = errorMessage;
                error.classList.remove('d-none');
                valid = false;
            } else if (id !== 'legs' && input.value.trim().length < 2) {
                // Additional validation: if name, breed, or sound is too short
                error.textContent = `${id.charAt(0).toUpperCase() + id.slice(1)} must be at least 2 characters long.`;
                error.classList.remove('d-none');
                valid = false;
            }
        });

        return valid;
    }

    function submit() {
        if (validate()) {
            const name = form.querySelector('#name').value.trim();
            const legs = parseInt(form.querySelector('#legs').value, 10);
            const breed = form.querySelector('#breed').value.trim();
            const sound = form.querySelector('#sound').value.trim();

            // Add the animal using the mock service
            animalService.addAnimal({ name, legs, breed, sound });

            alert('Animal added successfully!');
            form.reset(); // Reset form fields
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        submit(); // Handle form submission
    });

    return {
        description,
        element: createContent(),
    };
}

export default animal;
