const todo_submite_field = document.querySelector(".todo_submite_field");
const todo_submite_button = document.querySelector(".todo_submite_button");
const todo_data_list_container = document.querySelector(".todo_data_list_container");
const error_message = document.querySelector(".error_message");
const clear_all_data = document.querySelector(".clear_all_data");
const reload = document.querySelector(".reload");

// get usr submite data start
todo_submite_button.onclick = () => {
  const user_submite_value = todo_submite_field.value;
  // set validation for user submite value
  if (user_submite_value) {
    todos_data.push(user_submite_value);
    todo_submite_field.value = "";

    // task add success message
    error_message.innerHTML = `Task added!`;
    error_message.style.visibility = "visible";
    error_message.style.color = "green";
  } else {
    error_message.innerHTML = `Todo must not be empty`;
    error_message.style.visibility = "visible";
  }
  todos_processing();
};
// get usr submite data end

// todos processing start
const todos_processing = () => {
  let todo_data = "";
  todos_data.forEach((item, index) => {
    todo_data += `
    <li>
      <span class="sl_number">${index + 1 <= 9 ? `0${index + 1}` : index + 1}</span>
      <span class="food_name"> ${item}</span>
      <span class="remove_data" onclick="delete_todo('${item}', '${index}')"><img class="delete_icon" src="./assets/img/delete_btn.svg"></span>
    </li>
    `;
  });
  todo_data_list_container.innerHTML = todo_data;
};
todos_processing();
// todos processing start

// delete doto when click the delete button || start
const delete_todo = (item, index) => {
  let update_todos_data = todos_data.filter((data) => data != item);
  todos_data = update_todos_data;
  todos_processing();
  console.log(todos_data);

};
// delete doto when click the delete button || end

// clear all data when click the ( clear all data button ) || start
clear_all_data.onclick = () => {
  todos_data = [];
  todos_processing();
};
// clear all data when click the ( clear all data button ) || end

// reload when click the reload button
reload.onclick = () => {
  location.reload();
};
