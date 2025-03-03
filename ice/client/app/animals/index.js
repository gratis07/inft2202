import animalService from "../animal.service.js";

async function animal(name) {
    const form = document.createElement('form');
    let description = 'Add Animal';
    let animal = null;

    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        function createInput(id, label, type = "text", isReadOnly = false, value = "") {
            const div = document.createElement('div');
            div.classList.add('mb-3');

            const inputField = `<input type="${type}" class="form-control" id="${id}" name="${id}" 
                                value="${value}" ${isReadOnly ? "readonly" : ""}>`;
            div.innerHTML = `<label for="${id}" class="form-label">${label}</label>` +
                inputField +
                `<p class="text-danger d-none"></p>`;

            return div;
        }

        container.append(createInput("name", "Animal Name", "text", animal !== null, animal?.name || ""));
        container.append(createInput("breed", "Animal Breed", "text", false, animal?.breed || ""));
        container.append(createInput("legs", "Number of Legs", "text", false, animal?.legs || ""));
        container.append(createInput("eyes", "Number of Eyes", "text", false, animal?.eyes || ""));
        container.append(createInput("sound", "Sound this animal makes", "text", false, animal?.sound || ""));

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = `<button type="submit" class="btn btn-primary">
                                    Save Animal <i class="fa-solid fa-check"></i>
                               </button>`;
        container.append(submitBtn);
        form.append(container);

        return form;
    }

    function validate() {
        let valid = true;

        function validateField(id, message, isNumber = false) {
            const input = form[id];
            const errorMsg = input.nextElementSibling;
            if (!input.value.trim()) {
                errorMsg.classList.remove('d-none');
                errorMsg.textContent = message;
                valid = false;
            } else if (isNumber && isNaN(input.value)) {
                errorMsg.classList.remove('d-none');
                errorMsg.textContent = "This must be a number.";
                valid = false;
            } else {
                errorMsg.classList.add('d-none');
            }
        }

        validateField("name", "You must name this animal!");
        validateField("breed", "What type of animal is this?");
        validateField("legs", "How many legs does this animal have?", true);
        validateField("eyes", "How many eyes does this animal have?", true);

        return valid;
    }

    async function submit(action) {
        if (!validate()) {
            console.log("Validation failed");
            return;
        }

        const formData = new FormData(form);
        const animalObject = {};

        formData.forEach((value, key) => {
            animalObject[key] = key === "eyes" || key === "legs" ? Number(value) : value;
        });

        const nameError = form.name.nextElementSibling;
        try {
            if (action === "new") {
                await animalService.saveAnimal([animalObject]);
            } else {
                await animalService.updateAnimal(animalObject);
            }
            nameError.classList.add('d-none');
            form.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            nameError.classList.remove('d-none');
            nameError.textContent = "This animal already exists!";
        }
    }

    if (!name) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            submit("new");
        });
    } else {
        description = "Update Animal";
        try {
            let ret = await animalService.findAnimal(name);
            if (!ret.length) throw "No record";
            animal = ret[0];

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                submit("update");
            });
        } catch (err) {
            description = err;
        }
    }

    return {
        description,
        element: createContent(),
    };
}

export default animal;
