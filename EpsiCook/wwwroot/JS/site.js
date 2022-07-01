const uri = 'api/CommandeItems';
let todos = [];

function getItems() {
    console.log("test")
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function isEmpty(value) {
    return (value == null || value.length === 0);
}

function addItem() {
    const addentreeTextbox = document.getElementById('add-Entree');
    const addplatTextbox = document.getElementById('add-Plat');
    const adddessertTextbox = document.getElementById('add-Dessert');
    const addDrinkTextbox = document.getElementById('add-Drink');
    const addNumberTableTextbox = document.getElementById('add-NumberTable');
    const IsCompleted = 0;
    const itemId = 0;


    const item = {
        id: parseInt(itemId, 10),
        numbertable: addNumberTableTextbox.value.trim(),
        entree: addentreeTextbox.value.trim(),
        plat: addplatTextbox.value.trim(),
        dessert: adddessertTextbox.value.trim(),
        drink: addDrinkTextbox.value.trim(),
        isCompleted: IsCompleted,
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNumberTableTextbox.value = '';
            addentreeTextbox.value = '';
            addplatTextbox.value = '';
            adddessertTextbox.value = '';
            addDrinkTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}


function updateItem() {
    IsCompleted=1
    const itemId = document.getElementById('edit-id').value;
    const item = {
        isComplete: IsCompleted,
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => {
            getItems();
            document.getElementById('edit-id').value = "";
        })
        .catch(error => console.error('Unable to update item.', error));
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}


function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);


    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        if (item.isCompleted == 0) {
            isCompleteCheckbox.value = 'Commande Enregistrée';
        }
        else if (item.isCompleted == 1) {
            isCompleteCheckbox.value = 'En préparation';
        }
        else if (item.isCompleted == 2) {
            isCompleteCheckbox.value = 'Livré';
        }

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.id);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode1 = document.createTextNode(item.numberTable);
        td3.appendChild(textNode1);

        let td4 = tr.insertCell(3);
        let textNode2 = document.createTextNode(item.entree);
        td4.appendChild(textNode2);

        let td5 = tr.insertCell(4);
        let textNode3 = document.createTextNode(item.plat);
        td5.appendChild(textNode3);

        let td6 = tr.insertCell(5);
        let textNode4 = document.createTextNode(item.dessert);
        td6.appendChild(textNode4);

        let td7 = tr.insertCell(6);
        let textNode5 = document.createTextNode(item.drink);
        td7.appendChild(textNode5);

    });

    todos = data;
}