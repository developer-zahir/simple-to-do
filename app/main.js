const todo_submite_field = document.querySelector(".todo_submite_field");
const todo_submite_button = document.querySelector(".todo_submite_button");
const todo_data_list_container = document.querySelector(".todo_data_list_container");
const error_message = document.querySelector(".error_message");
const clear_all_data = document.querySelector(".clear_all_data");
const reload = document.querySelector(".reload");

//  show todos data
const show_todso_data = () => {
  let todos_data = [];
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }

  // show data
  let content = "";
  todos_data.map((item, index) => {
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
show_todso_data();

// get user submite data and send it to ls
todo_submite_button.onclick = () => {
  let todos_data = [];
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }
  const user_submite_data = todo_submite_field.value;
  if (user_submite_data.trim()) {
    todos_data.push(user_submite_data);
    todo_submite_field.value = "";
    error_message.innerHTML = "Task added";
    error_message.style.visibility = "visible";
    error_message.style.color = "green";
  } else {
    error_message.innerHTML = "Todos can not be empty";
    error_message.style.visibility = "visible";
    error_message.style.color = "red";
  }

  // send data ls
  localStorage.setItem("todos_data", JSON.stringify(todos_data));
  show_todso_data();
};

// delete todo and send updat data ls
const delete_todo = (index) => {
  let todos_data = [];
  if (localStorage.getItem("todos_data")) {
    todos_data = JSON.parse(localStorage.getItem("todos_data"));
  }
  // ignore delete/match todo data/item
  const update_todos_data = todos_data.filter((item, idx) => idx != index);
  // send update todos data ls
  localStorage.setItem("todos_data", JSON.stringify(update_todos_data));
  show_todso_data();
};

// Reload button
reload.addEventListener("click", () => {
  location.reload();
});

// Clear all data button
clear_all_data.addEventListener("click", () => {
  let todos_data;
  if (!localStorage.getItem("todos_data")) {
    error_message.innerHTML = "No data to clear";
    error_message.style.visibility = "visible";
    error_message.style.color = "red";
    return;
  }
  todos_data = JSON.parse(localStorage.getItem("todos_data"));
  localStorage.clear("todos_data");
  todos_data = [];
  error_message.innerHTML = "All data is cleared";
  error_message.style.visibility = "visible";
  error_message.style.color = "green";
  show_todso_data();
});
