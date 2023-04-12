window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = {
      content: e.target.elements.content.value,
      done: false,
    };
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  });
  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classlist.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const remove = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;

    content.classList.add("todo-content");
    actions.classlist.add("actions");
    edit.classlist.add("edit");
    remove.classlist.add("remove");

    content.innerHTML = `<input type= "text" value= "${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    remove.innerHTML = "Remove";

    label.appendChild(input);
    actions.appendChild(edit);
    actions.appendChild(remove);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoItem.appendChild(todoItem);
  });
}
