/*
 *  Service constructor
 */
function AnimalService() {
    // Check if animals exist in local storage, initialize if not
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

/*
 * Fetch all animals from local storage
 */
AnimalService.prototype.getAnimals = function() {
    return JSON.parse(localStorage.getItem('animals')) || [];
};

/*
 * Save a new animal
 */
AnimalService.prototype.saveAnimal = function(animal) {
    // Get the current list of animals
    const animals = this.getAnimals();
    // Check if the animal already exists
    if (animals.find(a => a.name === animal.name)) {
        throw new Error('An animal with that name already exists!');
    }
    // Add the new animal to the array
    animals.push(animal);
    // Save the updated array back to local storage
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

/*
 * Find an animal by its name
 */
AnimalService.prototype.findAnimal = function(animalName) {
    const animals = this.getAnimals();
    const animal = animals.find(a => a.name === animalName);
    if (!animal) {
        throw new Error('That animal does not exist!');
    }
    return animal;
};

/*
 * Update an existing animal
 */
AnimalService.prototype.updateAnimal = function(updatedAnimal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name === updatedAnimal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    // Update the animal's details
    animals[idx] = updatedAnimal;
    // Save the updated array back to local storage
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

/*
 * Delete an animal
 */
AnimalService.prototype.deleteAnimal = function(animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name === animal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    // Remove the animal from the array
    animals.splice(idx, 1);
    // Save the updated array back to local storage
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

// Create an instance of AnimalService
const animalService = new AnimalService();
