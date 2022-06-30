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
    const Iscompleteds = "test";


    const item = {
        entree: addentreeTextbox.value.trim(),
        plat: addplatTextbox.value.trim(),
        dessert: adddessertTextbox.value.trim(),
        drink: addDrinkTextbox.value.trim(),
        iscompleted: Iscompleteds.value
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
            addentreeTextbox.value = '';
            addplatTextbox.value = '';
            adddessertTextbox.value = '';
            addDrinkTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-Entree').value = item.Entree;
    document.getElementById('edit-Plat').value = item.Plat;
    document.getElementById('edit-Dessert').value = item.Dessert;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        Entree: document.getElementById('edit-Entree').value.trim(),
        Plat: document.getElementById('edit-Plat').value.trim(),
        Dessert: document.getElementById('edit-Dessert').value.trim(),
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
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
        if (this.isComplete == 0) {
            isCompleteCheckbox.value = 'Commande Enregistrée';

        }

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.entree);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode1 = document.createTextNode(item.plat);
        td3.appendChild(textNode1);

        let td4 = tr.insertCell(3);
        let textNode2 = document.createTextNode(item.dessert);
        td4.appendChild(textNode2);

        let td5 = tr.insertCell(4);
        let textNode3 = document.createTextNode(item.drink);
        td5.appendChild(textNode3);
    });

    todos = data;
}