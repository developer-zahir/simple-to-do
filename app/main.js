const todo_submite_field = document.querySelector(".todo_submite_field");
const todo_submite_button = document.querySelector(".todo_submite_button");
const todo_data_list_container = document.querySelector(".todo_data_list_container");
const error_message = document.querySelector(".error_message");
const clear_all_data = document.querySelector(".clear_all_data");
const reload = document.querySelector(".reload");

// get user submit data
todo_submite_button.onclick = () => {
  const user_submit_value = todo_submite_field.value;

  // check todos_data in local storage
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }

  // set validation for user submit value
  if (user_submit_value) {
    todos_data.push(user_submit_value);
    todo_submite_field.value = "";

    // task add success message
    error_message.innerHTML = "Task added!";
    error_message.style.visibility = "visible";
    error_message.style.color = "green";
  } else {
    error_message.innerHTML = "Todo must not be empty";
    error_message.style.visibility = "visible";
    error_message.style.color = "red";
  }

  // store data in local storage
  localStorage.setItem("todos_data", JSON.stringify(todos_data));
  show_todos();
};

// show todos from local storage
const show_todos = () => {
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }
  let content = "";
  todos_data.forEach((item, index) => {
    content += `
    <li>
      <span class="sl_number">${index + 1 <= 9 ? `0${index + 1}` : index + 1}</span>
      <span class="food_name">${item}</span>
      <span class="remove_data" onclick="delete_todo(${index})"><img class="delete_icon" src="./assets/img/delete_btn.svg"></span>
    </li>
    `;
  });
  todo_data_list_container.innerHTML = content;
};
show_todos();
// delete todo when click the delete button
const delete_todo = (index) => {
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }

  let update_todos_data = todos_data.filter((item, idx) => idx !== index);

  localStorage.setItem("todos_data", JSON.stringify(update_todos_data));
  show_todos();
};

// Reload button
reload.addEventListener("click", () => {
  location.reload();
});

// Clear all data button
clear_all_data.addEventListener("click", () => {
  localStorage.removeItem("todos_data");
  todos_data = [];
  error_message.innerHTML = "All data is cleared";
  error_message.style.visibility = "visible";
  error_message.style.color = "green";
  show_todos();
});
