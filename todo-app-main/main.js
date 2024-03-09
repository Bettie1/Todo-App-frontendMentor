//import the HTML Elements
const ul = document.getElementById("todo-list");
const input = document.getElementById("input");
const img = document.getElementById("sun");
const todoList = document.getElementById("page");
const bgImg = document.getElementById("bg-img");
const body = document.querySelector("body");
const lis = document.querySelectorAll("#todo-list li");
const summaryDiv = document.getElementById("summary");
let image = document.getElementById("bgImg");
const allTasks = document.getElementById("All");
const activeTasks = document.getElementById("Active");
const completedTasks = document.getElementById("Completed");
const clearCompletedBtn = document.getElementById("clearCompleted");
const itemsLeft = document.getElementById("items-left");

let LiDivs = [];

//Event listeners

//add to do after pressing ented
input.addEventListener("keypress", addTodo);
//change mode after clicking moon/sun img
img.addEventListener("click", changeMode);

//add to do
function addTodo(e) {
  if (e.key == "Enter") {
    const li = document.createElement("li");
    const check = document.createElement("div");
    const lidiv = document.createElement("div");
    const cancel = document.createElement("div");

    li.innerText = e.target.value;
    li.classList = "li";

    lidiv.appendChild(check);
    lidiv.appendChild(li);
    lidiv.appendChild(cancel);

    cancel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
    cancel.classList = "cancel";
    cancel.addEventListener("click", () => {
      lidiv.remove();
      let arrayFromNodeList = Array.from(ul.childNodes);
      itemsLeft.innerText = `${arrayFromNodeList.length} items left`;
    });

    check.innerHTML = `<img class="check" src="images/icon-check.svg" />`;
    check.classList = "circle";
    check.addEventListener("click", () => {
      li.classList.toggle("done");
      lidiv.classList.toggle("done");
    });

    if (isSunImage1) {
      lidiv.className = "todo-li";
    } else if (!isSunImage1) {
      lidiv.className = "todo-li lightMode";
      check.classList = "circle darkMode";
    }

    ul.appendChild(lidiv);
    updateTasksLeft();
    LiDivs.push(lidiv);
    input.value = "";
  }
}

//Update tasks left
function updateTasksLeft() {
  let arrayFromNodeList = Array.from(ul.childNodes);
  itemsLeft.innerText = `${arrayFromNodeList.length} items left`;
}

//Display all tasks
allTasks.addEventListener("click", () => {
  let arrayFromNodeList = Array.from(ul.childNodes);
  arrayFromNodeList.forEach((todo) => {
    todo.style.display = "flex";
  });
});

//Display completed tasks
completedTasks.addEventListener("click", () => {
  let arrayFromNodeList = Array.from(ul.childNodes);
  arrayFromNodeList.filter((todo) => {
    if (!todo.classList.contains("done")) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
});

//Display active tasks
activeTasks.addEventListener("click", () => {
  let arrayFromNodeList = Array.from(ul.childNodes);
  arrayFromNodeList.filter((todo) => {
    if (todo.classList.contains("done")) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
});
//clear Completed Tasks
clearCompletedBtn.addEventListener("click", () => {
  let arrayFromNodeList = Array.from(ul.childNodes);
  arrayFromNodeList.forEach((todo) => {
    if (todo.classList.contains("done")) {
      todo.parentNode.removeChild(todo);
    }
  });
  updateTasksLeft();
});

//change background image
let isImage1 = true;
function toggleBackgroundImage() {
  if (isImage1) {
    image.src = "images/bg-desktop-light.jpg";
    isImage1 = false;
  } else {
    image.src = "images/bg-desktop-dark.jpg";
    isImage1 = true;
  }
}

//change sun/moon image
let isSunImage1 = true;
function toggleButtonImage() {
  if (isSunImage1) {
    img.src = "images/icon-moon.svg";
    isSunImage1 = false;
  } else {
    img.src = "images/icon-sun.svg";
    isSunImage1 = true;
  }
}

//change list mode
function toggleListMode() {
  if (!isSunImage1) {
    LiDivs.forEach((item) => {
      item.classList.add("lightMode");
    });
  } else {
    LiDivs.forEach((item) => {
      item.classList.remove("lightMode");
    });
  }
}

//change Mode to dark or light
function changeMode() {
  input.classList.toggle("lightMode");
  body.classList.toggle("lightMode");
  summaryDiv.classList.toggle("lightMode");

  toggleBackgroundImage();
  toggleButtonImage();
  toggleListMode();
}
