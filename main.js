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

    displayTodos();
  });
});

function displayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classlist.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const remove = document.createElement("button");
  });
}
