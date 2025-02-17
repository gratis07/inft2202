import animalService from './animal.service.mock.js';

document.addEventListener('DOMContentLoaded', () => {
  const animalFormContainer = document.getElementById('animal-form-container');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  const animalForm = createAnimalForm();

  animalFormContainer.append(animalForm.element);

  // Handle form submission
  animalForm.element.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(animalForm.element);
    const animalObject = {};

    formData.forEach((value, key) => {
      animalObject[key] = value;
    });

    try {
      animalService.saveAnimal(animalObject);
      successMessage.classList.remove('d-none');
      errorMessage.classList.add('d-none');
      animalForm.element.reset();
    } catch (error) {
      errorMessage.classList.remove('d-none');
      successMessage.classList.add('d-none');
    }
  });
});

// Create animal form
function createAnimalForm() {
  const form = document.createElement('form');
  form.classList.add('needs-validation');

  const formContent = `
    <div class="mb-3">
      <label for="name" class="form-label">Animal Name</label>
      <input type="text" class="form-control" id="name" name="name" required>
      <div class="invalid-feedback">Please provide a name for the animal.</div>
    </div>

    <div class="mb-3">
      <label for="breed" class="form-label">Animal Breed</label>
      <input type="text" class="form-control" id="breed" name="breed" required>
      <div class="invalid-feedback">Please provide a breed for the animal.</div>
    </div>

    <div class="mb-3">
      <label for="legs" class="form-label">Number of Legs</label>
      <input type="number" class="form-control" id="legs" name="legs" required>
      <div class="invalid-feedback">Please provide the number of legs.</div>
    </div>

    <div class="mb-3">
      <label for="eyes" class="form-label">Number of Eyes</label>
      <input type="number" class="form-control" id="eyes" name="eyes" required>
      <div class="invalid-feedback">Please provide the number of eyes.</div>
    </div>

    <div class="mb-3">
      <label for="sound" class="form-label">Sound this animal makes</label>
      <input type="text" class="form-control" id="sound" name="sound" required>
      <div class="invalid-feedback">Please provide the sound.</div>
    </div>

    <button type="submit" class="btn btn-primary">Save Animal</button>
  `;

  form.innerHTML = formContent;

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  });

  return {
    element: form
  };
}
