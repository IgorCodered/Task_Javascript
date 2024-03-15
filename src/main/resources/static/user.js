document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('bodyAllUserTable');
    const editModal = new bootstrap.Modal(document.getElementById('edit'));
    const deleteModal = new bootstrap.Modal(document.getElementById('delete'));

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

    function fillEditModal(user) {
        const idEdit = document.getElementById('idEdit');
        const nameEdit = document.getElementById('nameEdit');
        const surnameEdit = document.getElementById('surnameEdit');
        const emailEdit = document.getElementById('emailEdit');
        const passwordEdit = document.getElementById('passwordEdit');
        const editRolesUser = document.getElementById('editRolesUser');

        idEdit.value = user.id;
        nameEdit.value = user.firstName;
        surnameEdit.value = user.lastName;
        emailEdit.value = user.email;
        editRolesUser.innerHTML = '';

        user.roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.name;
            option.textContent = role.name;
            editRolesUser.appendChild(option);
        });
    }

    function fillDeleteModal(user) {
        const deleteID = document.getElementById('deleteID');
        const nameDelete = document.getElementById('nameDelete');
        const surnameDelete = document.getElementById('surnameDelete');
        const emailDelete = document.getElementById('emailDelete');
        const deleteRolesUser = document.getElementById('deleteRolesUser');

        deleteID.value = user.id;
        nameDelete.value = user.firstName;
        surnameDelete.value = user.lastName;
        emailDelete.value = user.email;
        deleteRolesUser.value = user.roles;
    }

    tableBody.addEventListener('click', function (event) {

        const target = event.target;
        if (target.tagName === 'BUTTON' && target.classList.contains('btn-primary')) {
            const selectedRow = target.closest('tr');
            const userId = selectedRow.cells[0].textContent;

            fetch(`api/find/${userId}`)
                .then(response => response.json())
                .then(user => {
                    fillEditModal(user);
                    editModal.show();
                })
                .catch(error => {
                    console.error('Ошибка получения данных пользователя:', error);
                });

            const editButton = document.getElementById('editButton');
            editButton.addEventListener('click', function () {
                const form = document.getElementById('formEditUser');
                const formData = new FormData(form);

                fetch(`api/edit/`, {
                    method: 'PUT',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        $('#edit').modal('hide');
                    })
                    .catch(error => {
                        console.error('Ошибка при редактировании пользователя:', error);
                    });
            })
        }
    });

    tableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (target.tagName === 'BUTTON' && target.classList.contains('btn-danger')) {
            const selectedRow = target.closest('tr');
            const userId = selectedRow.cells[0].textContent;

            fetch(`api/find/${userId}`)
                .then(response => response.json())
                .then(user => {
                    fillDeleteModal(user);
                    deleteModal.show();
                })
                .catch(error => {
                    console.error('Ошибка получения данных пользователя:', error);
                })

            const deleteButton = document.getElementById('deleteUserButton');
            deleteButton.addEventListener('click', function () {
                fetch(`api/delete/${userId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            $('#deleteModal').modal('hide');
                        } else {
                            console.error('Ошибка при удалении пользователя:', response.status);
                        }
                    })
                    .catch(error => console.error('Ошибка при удалении пользователя:', error));
            });
        }
    })
})



