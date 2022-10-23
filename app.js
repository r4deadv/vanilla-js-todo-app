const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("input");
const todoCollection = document.querySelector(".todo-collection");

// document.addEventListener("DOMContentLoaded", getTodosFromLS);

todoForm.addEventListener("submit", addTodo);

function checkIfExist(text) {
  const items = [
    ...document.querySelectorAll(".todo-collection__item__title"),
  ].map((element) => element.textContent);

  return items.includes(text);
}

function addTodo(e) {
  e.preventDefault();

  const isExist = checkIfExist(todoInput.value);

  if (isExist) {
    alert(`"${todoInput.value}" is already exist inside the todos`);
    return; // stop execution of the function
  }

  if (todoInput.value === "") {
    // shake form to indicate that the user must input something
    todoForm.classList.toggle("shake-horizontal");
    setTimeout(() => {
      todoForm.classList.toggle("shake-horizontal");
    }, 500);
  } else {
    // create elements
    const li = document.createElement("li");
    const todoTitle = document.createElement("span");
    const editableInput = document.createElement("input");
    const editButton = document.createElement("button");
    const saveButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    li.classList.add("todo-collection__item");

    todoTitle.classList.add("todo-collection__item__title");
    todoTitle.innerText = todoInput.value;
    todoTitle.style.color = todoInput.value.length % 2 === 0 ? "red" : "pink";

    editableInput.classList.add("input");
    editableInput.classList.add("input--todo");
    editableInput.classList.add("hidden");
    editableInput.type = "text";
    editableInput.value = todoInput.value;

    editButton.classList.add("button");
    editButton.classList.add("button--todo");
    editButton.classList.add("button--edit");
    editButton.innerText = "Edit";

    saveButton.classList.add("button");
    saveButton.classList.add("button--todo");
    saveButton.classList.add("button--save");
    saveButton.classList.add("hidden");
    saveButton.innerText = "Save";

    deleteButton.classList.add("button");
    deleteButton.classList.add("button--todo");
    deleteButton.classList.add("button--delete");
    deleteButton.innerText = "Delete";

    // add elements to todo list
    li.appendChild(todoTitle);
    li.appendChild(editableInput);

    if (!todoInput.value.includes("(r)")) {
      li.appendChild(editButton);
    }

    li.appendChild(saveButton);
    li.appendChild(deleteButton);
    todoCollection.appendChild(li);

    function toggleTodoEditForm() {
      todoTitle.classList.toggle("hidden");
      editableInput.classList.toggle("hidden");
      editButton.classList.toggle("hidden");
      saveButton.classList.toggle("hidden");
    }

    // button event listeners
    editButton.addEventListener("click", () => {
      toggleTodoEditForm();
      editableInput.focus();
    });

    saveButton.addEventListener("click", () => {
      const alreadyExist = checkIfExist(editableInput.value);

      if (!alreadyExist) {
        todoTitle.style.color =
          editableInput.value.length % 2 === 0 ? "pink" : "red";
        todoTitle.innerText = editableInput.value; // this is the change
        toggleTodoEditForm(); // we want to keep the edit mode state
      } else {
        alert(`"${editableInput.value}" already exist`);
      }

      // nothing here
    });

    deleteButton.addEventListener("click", () => {
      setTimeout(() => {
        const sure = window.confirm("Are you sure");

        if (sure) {
          // Real deletation
          todoCollection.removeChild(li);
        }
      }, 100);
    });
  }

  // clear input
  todoInput.value = "";
}
