let globalEmployeeId = null;
const $EMPLOYEES_TABLE_BODY = document.querySelector("#employees-table tbody");

// create employee variables
const $CONFIRM_CREATE_BUTTON = document.querySelector("#confirm-create-button");
const $CREATE_EMPLOYEE_FIRST_NAME = document.querySelector("#firstName_create");
const $CREATE_EMPLOYEE_LAST_NAME = document.querySelector("#lastName_create")
const $CREATE_EMPLOYEE_EMAIL = document.querySelector("#email_create")

// update employee variables

// delete employee variables

async function fetchEmployees() {
  try {
    const employees = await getEmployees();

    let rowHTML = "";

    employees.forEach((employee) => {
      rowHTML += `
          <tr>
              <td>${employee.id}</td>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.email}</td>
              <td>
                <button data-employee-id=${employee.id} class="js-action btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateEmployeeModal">Edit</button>
                <button data-employee-id=${employee.id} class="js-action btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal">Delete</button>
              </td>
          </tr>
        `;
    });

    $EMPLOYEES_TABLE_BODY.innerHTML = rowHTML;

    const actionsButtons = document.querySelectorAll(".js-action");
    actionsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        globalEmployeeId = event.target.dataset.employeeId;
      });
    });
  } catch (e) {
    console.log(e);
    alert("Error getting employees");
  }
}

$CONFIRM_CREATE_BUTTON.addEventListener("click", async function() {
  try {
    await createEmployee($CREATE_EMPLOYEE_FIRST_NAME.value, $CREATE_EMPLOYEE_LAST_NAME.value, $CREATE_EMPLOYEE_EMAIL.value)
    alert("Success!")
    fetchEmployees();
  } catch (e) {
    alert("Error creating employee")
  }
})

window.onload = function () {
  fetchEmployees();
};
