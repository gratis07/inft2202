import animalService from "../animal.service.js";

function list(recordPage) {
    const container = document.createElement('div');
    container.classList.add('container');

    const divWaiting = document.createElement('div');
    divWaiting.classList.add('text-center');
    divWaiting.innerHTML = '<i class="fa fa-5x fa-spinner fa-spin"></i>';
    container.append(divWaiting);

    const divMessage = document.createElement('div');
    divMessage.classList.add('alert', 'text-center', 'd-none');
    container.append(divMessage);

    function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
        if (pages <= 1) return document.createElement('div'); // Hide pagination if unnecessary

        function addPage(number, text, style) {
            return `<li class="page-item ${style}">
              <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
            </li>`;
        }

        const pagination = document.createElement('nav');
        const ul = document.createElement("ul");
        ul.classList.add('pagination');

        ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : ''));
        for (let i = 1; i <= pages; i++) {
            ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
        }
        ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''));

        pagination.append(ul);
        return pagination;
    }

    function drawAnimalTable(animals) {
        const eleTable = document.createElement('table');
        eleTable.classList.add('table', 'table-striped');

        // Create Table Head
        const thead = eleTable.createTHead();
        const row = thead.insertRow();
        const headers = ['Name', 'Breed', 'Legs', 'Eyes', 'Sound', 'Actions'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });

        // Create Table Rows
        animals.forEach(animal => {
            const row = eleTable.insertRow();
            row.insertCell().textContent = animal.name;
            row.insertCell().textContent = animal.breed;
            row.insertCell().textContent = animal.legs;
            row.insertCell().textContent = animal.eyes;
            row.insertCell().textContent = animal.sound;

            // Actions Cell
            const eleBtnCell = row.insertCell();
            
            // Delete Button
            const eleBtnDelete = document.createElement('button');
            eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
            eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
            eleBtnDelete.addEventListener('click', () => onDeleteButtonClick(animal));

            // Edit Button
            const eleBtnEdit = document.createElement('a');
            eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
            eleBtnEdit.innerHTML = `<i class="fa fa-edit"></i>`;
            eleBtnEdit.href = `./animal.html?name=${animal.name}`;

            eleBtnCell.append(eleBtnEdit, eleBtnDelete);
        });

        return eleTable;
    }

    function onDeleteButtonClick(animal) {
        return async () => {
            if (confirm(`Are you sure you want to delete ${animal.name}?`)) {
                try {
                    await animalService.deleteAnimal(animal.name);
                    window.location.reload();
                } catch (error) {
                    console.error("Error deleting animal:", error);
                    alert("Failed to delete the animal. Please try again.");
                }
            }
        };
    }

    function createContent() {
        animalService.getAnimalPage(recordPage)
            .then((ret) => {
                const { records, pagination } = ret;
                divWaiting.classList.add('d-none');

                const header = document.createElement('div');
                header.classList.add('d-flex', 'justify-content-between');

                const h1 = document.createElement('h1');
                h1.innerHTML = 'Animal List';
                header.append(h1);
                header.append(drawPagination(pagination));

                container.append(header);
                container.append(drawAnimalTable(records));
            })
            .catch(err => {
                divWaiting.classList.add('d-none');
                divMessage.innerHTML = err;
                divMessage.classList.remove('d-none');
                divMessage.classList.add('alert-danger');
            });

        return container;
    }

    return {
        element: createContent()
    };
}

export default list;
