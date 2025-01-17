// tell us what page we're on
console.log('we are on the add page');

// assign a handler to the submit event
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// create a handler to deal with the submit event
async function submitAnimalForm(event) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const animalForm = event.target;
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('Form validation passed.');
        
        const formData = new FormData(animalForm);
        const animalObject = {};
        
        formData.forEach((value, key) => {
            // Check if the value should be converted to a number
            animalObject[key] = isNaN(Number(value)) ? value : Number(value);
        });

        const eleNameError = animalForm.name.nextElementSibling;
        try {
            await animalService.saveAnimal(animalObject);
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.error(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }
    } else {
        console.log('Form validation failed.');
    }
}

// validate the animal form
function validateAnimalForm(form) {
    console.log('Validating form...');
    let valid = true;

    // Validate that the name field is not empty
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;

    if (name.trim() === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Add validation for other fields if necessary

    // Return whether the form is valid or not
    return valid;
}
