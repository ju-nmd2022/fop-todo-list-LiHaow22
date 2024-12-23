// This was made thanks to https://www.youtube.com/watch?v=6eFwtaZf6zc Retrieved: April 2023
// and https://www.w3schools.com/howto/howto_js_todolist.asp Retrieved: April 2023
// and https://hackr.io/blog/how-to-create-a-javascript-to-do-list#step-2-building-the-to-do-list-structure-with-html Retrieved: 23-12/2024
// and https://www.geeksforgeeks.org/how-to-store-an-array-in-localstorage/ Retrieved: 23/12-2024
// and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/load_event Retrieved: 23/12-2024
// and https://blog.logrocket.com/localstorage-javascript-complete-guide/ Retrieved: 23/12-2024
// Code has also been reworked together with Thomas Halvarsson 23-12/2024

let tasks;

// ------ Add new item to the tasks list and save to local storage
window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Reads local storage file into tasks variable
  const newTaskForm = document.querySelector("#new-task-form"); // New task form where all tasks are written

  newTaskForm.addEventListener("submit", (e) => {
    // Waits for the event 'submit'
    e.preventDefault(); // e = event. Not to refresh the site by just clicking submit (add task)

    const task = {
      content: e.target.elements.content.value, // Sets task to what has been inputted into the text field
      done: false, // Checkbox for completing tasks, uses true or false
    };

    tasks.push(task); // Push the task data form into the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Saves to local storage
    e.target.reset(); // Resets the text box to "Write your task here..."

    ShowTasks(); // Refreshes the task list with the new data
  });

  ShowTasks(); // Loading the list for the first time (empty or filled from local storage)
});
// ------ Creating elements
function ShowTasks() {
  const taskList = document.querySelector("#task-list"); // Task list HTML element
  taskList.innerHTML = null; // Clears visual list with needing to refresh the page

  // ------ For each task in the tasks list do the following:
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div"); // List each task from the task array
    taskItem.classList.add("task-item"); // When creating new tasks, JS creates a new container based on the information given in the CSS file (task-item is found in the CSS)

    // Creates elements which can be styled with CSS (will show the content inputted into )
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const remove = document.createElement("button");

    input.type = "checkbox";
    input.checked = task.done; // Created opportunity to style when checked off and sets value to true when checked off

    // Add CSS classes to HTML element
    content.classList.add("task-content");
    actions.classList.add("actions");
    remove.classList.add("remove");

    content.innerHTML = `<input type="text" value="${task.content}" readonly>`; // The task written out (not editable)
    remove.innerHTML = "Remove"; // Removes a task from list

    // appendChild puts the (content) into the parent in HTML parent.appendchild(content);
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(remove);
    taskItem.appendChild(label);
    taskItem.appendChild(content);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);

    if (task.done) {
      taskItem.classList.add("done"); // Saves the variable to taskItem IF the task is marked as done
    }

    // Localstorage done/not done
    input.addEventListener("change", (e) => {
      task.done = e.target.checked; // If the task is done/checked off
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Sves the checked off task to local storage

      if (task.done) {
        taskItem.classList.add("done"); // Mark status as done
      } else {
        taskItem.classList.remove("done"); // Ability to remove done status
      }

      ShowTasks(); // Refresh the list
    });

    // Remove button
    remove.addEventListener("click", () => {
      tasks.splice(index, 1); // Removes task by index (by order in the list)
      localStorage.setItem("tasks", JSON.stringify(tasks));
      //console.log(index);
      ShowTasks(); // Automatic refresh the task list after clicking on remove button
    });
  });
}
