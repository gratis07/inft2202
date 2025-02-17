
export default new AnimalService({
  host: 'https://inft2202-server.onrender.com/',
  // host: 'http://localhost:3090',
  user: 'your student id'
});

/*
*  Constructor
*/
function AnimalService({ host, user }) {
  this.host = host;
  this.headers = new Headers({
      user
  });
}

/*
*
*/
/*
* Find an animal by name
*/
AnimalService.prototype.findAnimal = async function(name) {
  const url = new URL(`/api/animals/${name}`, this.host);
  const req = new Request(url, {
      headers: this.headers,
      method: 'GET',
  });

  try {
      const res = await fetch(req);
      return res.json();
  } catch (err) {
      console.error("Error finding animal:", err);
      return false;
  }
}

/*
*
*/
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 8 }) 
{
  const params = new URLSearchParams({ page, perPage });
  const url = new URL(`/api/animals?${params.toString()}`, this.host);
  const req = new Request(url, {
      headers: this.headers,
      method: 'GET',
  });
  try {
      const res = await fetch(req);
      return res.json();
  } catch (err) {
      return false;
  }
}

/*
*
*/
/*
* Save a new animal or multiple animals
*/
AnimalService.prototype.saveAnimal = async function(animals) {
  const url = new URL(`/api/animals`, this.host);
  const req = new Request(url, {
      headers: {
          ...this.headers,
          "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(animals),
  });

  try {
      const res = await fetch(req);
      return res.json();
  } catch (err) {
      console.error("Error saving animal:", err);
      return false;
  }
}

/*
* Update an existing animal
*/
AnimalService.prototype.updateAnimal = async function(animal) {
  const url = new URL(`/api/animals/${animal.name}`, this.host);
  const req = new Request(url, {
      headers: {
          ...this.headers,
          "Content-Type": "application/json",
      },
      method: 'PUT',
      body: JSON.stringify(animal),
  });

  try {
      const res = await fetch(req);
      return res.json();
  } catch (err) {
      console.error("Error updating animal:", err);
      return false;
  }
}

/*
* Delete an animal by name
*/
AnimalService.prototype.deleteAnimal = async function(name) {
  console.log("Deleting animal:", name);
  const url = new URL(`/api/animals/${name}`, this.host);
  const req = new Request(url, {
      headers: this.headers,
      method: 'DELETE',
  });

  try {
      const res = await fetch(req);
      return res.json();
  } catch (err) {
      console.error("Error deleting animal:", err);
      return false;
  }
}