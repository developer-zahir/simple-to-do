const add_button = document.querySelector("button");
const input = document.querySelector(".box-body input");
const data_container = document.querySelector(".data-inner");
const clear_data_button = document.querySelector(".clear_add_data");
const reload_button = document.querySelector(".reload");
const error_message = document.querySelector(".error_message");

// store data
let foods = ["Regular class korte hobe. ", "Prochur practice korte hobe. ", " Protita class er note korete hobe", "Ekjon valo maner, developer hote hobe. ", "Ekjon valo mner manush hote hobe"];

// food processing from array
const food_processing = () => {
  let single_food = "";
  foods.map((food, index) => {
    single_food += `
    <li>
        <span class="sl_number">${index + 1 <= 9 ? `0${index + 1}` : index + 1}</span>
        <span class="food_name"> ${food}</span>
        <span class="remove_data"><img class="delete_icon" src="./assets/img/delete_btn.svg"</span>
   </li>
    `;
  });
  data_container.innerHTML = single_food;

  // Add event listeners to remove data when "sl" button is clicked
  const remove_data = document.querySelectorAll(".remove_data");
  remove_data.forEach((button) => {
    button.addEventListener("click", removeData);
  });
};

// save data on local storage
const saveDataToLocalStorage = () => {
  localStorage.setItem("foods", JSON.stringify(foods));
};

// get data from local storage and show it to frontend
const loadDataFromLocalStorage = () => {
  const storedFoods = localStorage.getItem("foods");
  if (storedFoods) {
    foods = JSON.parse(storedFoods);
    food_processing();
  }
};

// Clear all stored data
const clearData = () => {
  localStorage.removeItem("foods");
  foods.length = 0; // Clear the foods array
  food_processing();
};

// remove data whec click the remove button
const removeData = (event) => {
  const index = event.target.dataset.index;
  foods.splice(index, 1);
  food_processing();
  saveDataToLocalStorage();
};

clear_data_button.addEventListener("click", clearData);

// get user submitted data and store this data in the array
add_button.onclick = () => {
  let submitted_data = input.value;
  if (submitted_data.length >= 5) {
    foods.push(submitted_data);
    error_message.style.color = "green";
    error_message.style.visibility = "visible";
    error_message.innerHTML = `Task Added!`;
  } else {
    error_message.style.color = "red";
    error_message.style.visibility = "visible";
    error_message.innerHTML = `You must add a minimum of 5 characters for the task...`;
  }
  food_processing();
  saveDataToLocalStorage();
  input.value = "";
};
// when click the reload button then reload the browser
reload_button.onclick = () => {
  location.href = location.href;
};

loadDataFromLocalStorage();
food_processing();
