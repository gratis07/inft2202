// animal.service.mock.js
const animals = [];

function saveAnimal(animal) {
  if (animals.find(a => a.name === animal.name)) {
    throw new Error('An animal with that name already exists!');
  }
  animals.push(animal);
}

function getAnimalById(id) {
  return animals.find(a => a.id === id);
}

function updateAnimal(updatedAnimal) {
  const index = animals.findIndex(a => a.id === updatedAnimal.id);
  if (index !== -1) {
    animals[index] = updatedAnimal;
  }
}

// Export as named exports
export { saveAnimal, getAnimalById, updateAnimal };