// src/client/app/animals/Animal.js
export default class Animal {
    constructor({ name, breed, eyes, legs, sound }) {
      this.id = crypto.randomUUID(); // Generate a unique ID for each animal
      this.name = name;
      this.breed = breed;
      this.eyes = eyes;
      this.legs = legs;
      this.sound = sound;
    }
  
    // Human-readable description
    toString() {
      return `${this.name} is a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and it goes "${this.sound}"`;
    }
  
    // Returns a plain JavaScript object of the animal
    toObject() {
      return {
        id: this.id,
        name: this.name,
        breed: this.breed,
        eyes: this.eyes,
        legs: this.legs,
        sound: this.sound
      };
    }
  
    // Returns the animal as a JSON string
    toJSON() {
      return JSON.stringify(this.toObject());
    }
  }
  