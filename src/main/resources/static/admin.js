const aboutUserInfo = "/userInfo";

fetch(aboutUserInfo)
    .then(response => response.json())
    .then(data => {
        document.getElementById("userId").textContent = data.id;
        document.getElementById("firstNameID").textContent = data.firstName;
        document.getElementById("lastNameID").textContent = data.lastName;
        document.getElementById("email").textContent = data.email;

        document.getElementById("headerUserName").textContent = data.email;
        const rolesArray = data.roles;
        let rolesString = "";
        rolesArray.forEach(role => {
            rolesString += role.name + ", ";
        });
        rolesString = rolesString.slice(0, -2);
        document.getElementById("role").textContent = rolesString;
        document.getElementById("headerRolesName").textContent = rolesString;

    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

