document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('bodyAllUserTable')

    function createTableRow(user) {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = user.firstName;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = user.lastName;
        row.appendChild(lastNameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const role = user.roles.length > 0 ? user.roles[0].name : '';
        const roleCell = document.createElement('td');
        roleCell.textContent = role;
        row.appendChild(roleCell);

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';

        const buttonCell = document.createElement('td');
        buttonCell.appendChild(editButton);
        row.appendChild(buttonCell);

        const buttonCell1 = document.createElement('td');
        buttonCell1.appendChild(deleteButton);
        row.appendChild(buttonCell1);

        return row;
    }

    fetch('api/allUsers')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const tableRow = createTableRow(user);
                tableBody.appendChild(tableRow);
            });
        })
        .catch(error => {
            console.error('Ошибка получения данных пользователей:', error);
        })
})


