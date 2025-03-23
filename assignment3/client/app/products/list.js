import productservice from "../product.service.js";

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
        function addPage(number, text, style) {
            return `<li class="page-item ${style}">
              <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
            </li>`;
        }
        const pagination = document.createElement('div');
        if (pages > 1) {
            pagination.classList.remove('d-none');
        }
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

    function drawProductTable(products) {
        const eleTable = document.createElement('table');
        eleTable.classList.add('table', 'table-striped');

        // Create a <thead> element
        const thead = eleTable.createTHead();
        // Create a row in the <thead>
        const row = thead.insertRow();
        // Create and append header cells
        const headers = ['Name', 'Price', 'Stock', 'Description']; // Removed 'Sound'
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });

        // Create rows for each product
        for (let product of products) {
            const row = eleTable.insertRow();
            // Add product fields to the row
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.price;
            row.insertCell().textContent = product.stock;
            row.insertCell().textContent = product.description;

            // Create a cell to hold the buttons
            const eleBtnCell = row.insertCell();
            eleBtnCell.classList.add();

            // Create a delete button
            const eleBtnDelete = document.createElement('button');
            eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
            eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
            eleBtnDelete.addEventListener('click', onDeleteButtonClick(product));
            eleBtnCell.append(eleBtnDelete);

            // Create an edit button
            const eleBtnEdit = document.createElement('a');
            eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
            eleBtnEdit.innerHTML = `<i class="fa fa-edit"></i>`; // Changed icon to 'edit'
            eleBtnEdit.href = `./product.html?name=${product.name}`;
            eleBtnCell.append(eleBtnEdit);
        }
        return eleTable;
    }

    function onDeleteButtonClick(product) {
        return event => {
            productservice.deleteproduct(product.name)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    divMessage.innerHTML = "Failed to delete product. Please try again.";
                    divMessage.classList.remove('d-none');
                    divMessage.classList.add('alert-danger');
                });
        };
    }

    function createContent() {
        productservice.getproductPage(recordPage)
            .then((ret) => {
                let { records, pagination } = ret;
                divWaiting.classList.add('d-none');

                // Create header with title and pagination
                let header = document.createElement('div');
                header.classList.add('d-flex', 'justify-content-between');
                let h1 = document.createElement('h1');
                h1.innerHTML = 'Product List';
                header.append(h1);
                header.append(drawPagination(pagination));

                // Append header and table to the container
                container.append(header);
                container.append(drawProductTable(records));
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