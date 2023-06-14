const addBtn = document.querySelector(".button-add-expense button");
const tableBody = document.querySelector('tbody');

let cellVals = [];
let amountVal;

function saveElementsToLocalStorage() {
    const rows = tableBody.querySelectorAll('tr');
    const elementsData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        const elementData = {
            name: cells[0].textContent,
            date: cells[1].textContent,
            amount: cells[2].textContent
        };

        elementsData.push(elementData);
    });

    const elementsJSON = JSON.stringify(elementsData);
    console.log(elementsJSON);
    localStorage.setItem('savedElements', elementsJSON);
}

function createRowElement() {
    const inputName = document.querySelector(".input-first");
    const inputDate = document.querySelector(".date-input");
    const inputAmount = document.querySelector(".amount-input");

    amountVal = '-' + inputAmount.value + '$';

    if (!inputAmount.value.match(/^\d+(\.\d+)?$/)) {
        alert('Please make sure that \'Amount:\' is a number');
        inputAmount.value = '';
        return;
    }

    if (inputName.value && inputDate.value && inputAmount.value) {
        const tableRow = document.createElement('tr');
        cellVals = [inputName.value, inputDate.value, amountVal];

        for (let i = 0; i < cellVals.length + 1; i++) {
            const newCell = document.createElement('td');
            newCell.textContent = cellVals[i];
            newCell.className = 'table-cell';
            tableRow.appendChild(newCell);

            if (i == cellVals.length) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                newCell.appendChild(deleteBtn);

                deleteBtn.addEventListener('click', () => {
                    tableBody.removeChild(tableRow);
                    saveElementsToLocalStorage();
                });
            }
        }

        if (tableBody.firstChild) {
            tableBody.insertBefore(tableRow, tableBody.firstChild);
        } else{
            tableBody.appendChild(tableRow);
        }

        inputName.value = '';
        inputDate.value = '';
        inputAmount.value = '';

        saveElementsToLocalStorage(); 
    } else{
        alert("Please complete all fields");
    }
}

function loadElementsFromLocalStorage() {
    const elementsJSON = localStorage.getItem('savedElements');
  
    if(elementsJSON){
        const elementsData = JSON.parse(elementsJSON);
  
        elementsData.forEach(elementData => {
            const tableRow = document.createElement('tr');
    
            Object.entries(elementData).forEach(([key, value]) => {
                const newCell = document.createElement('td');
                newCell.textContent = value;
                newCell.className = 'table-cell';
                tableRow.appendChild(newCell);
            });
            
            const deleteBtnCell = document.createElement('td');
            deleteBtnCell.className = 'table-cell';
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtnCell.appendChild(deleteBtn);
            tableRow.appendChild(deleteBtnCell);
    
            deleteBtn.addEventListener('click', () => {
                tableBody.removeChild(tableRow);
                saveElementsToLocalStorage();
            });
    
            tableBody.appendChild(tableRow);
      });
    }
}

addBtn.addEventListener('click', createRowElement);
loadElementsFromLocalStorage();