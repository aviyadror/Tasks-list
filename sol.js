let toDoItem = document.querySelector('#todo-item');
let dellAll = document.querySelector('#todo-delall');
let dellComp = document.querySelector('#todo-delcom');
let todoList = document.querySelector('#todo-list');
let todoSave = document.querySelector('#todo-save');
let arrRemove = [];
let count = 0;
let arrTasks;
dellAll.addEventListener("click", deleteAll);
dellComp.addEventListener("click", deleteComp);
todoSave.addEventListener("click", addTask);
class Task {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.done = false;
    }
}
window.onload = () => {
    //take the arr from the storage
    //put every item in thte html
    // localStorage.clear();
    console.log(localStorage);
    console.log(!localStorage.getItem("tasks"));
    if (!localStorage.getItem("tasks")) {
        arrTasks = [];
        localStorage.setItem("tasks", JSON.stringify(arrTasks));
        console.log(localStorage);
    }
    else {
        arrTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    console.log("arr taks obj= ", JSON.parse(localStorage.getItem("tasks")));
    let arrTasksFromJson = JSON.parse(localStorage.getItem("tasks"));
    arrTasksFromJson.forEach((task) => {
        todoList.innerHTML += taskToHtml(task); //the arr from storage to HTML
    });
};
function taskToHtml(task) {
    let doneClass = 'todoVal';
    if (task.done) {
        doneClass = 'doneClass';
    }
    return `
        <div class="${doneClass}" id='task_${task.id}'>
            
            <span class="${doneClass}" id='span_${task.id}'>${task.text}</span><p class='btnDone' onclick='changeTask(${task.id})'>&#10004</p><br><br><br>
            
        </div>`;
}
function changeTask(id) {
    console.log(id);
    arrTasks = JSON.parse(localStorage.getItem("tasks"));
    console.log("arrTasks[id]= ", arrTasks[id]);
    console.log("arrTasks[id].done =", arrTasks[id].done);
    arrTasks[id].done = true;
    console.log("arrTasks[id].done =", arrTasks[id].done);
    arrStorageHtml();
}
function arrStorageHtml() {
    todoList.innerHTML = "";
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
    console.log("localStorage=", localStorage);
    let arrTasksFromJson = JSON.parse(localStorage.getItem("tasks"));
    arrTasksFromJson.forEach((task) => {
        todoList.innerHTML += taskToHtml(task); //the arr from storage to HTML
    });
    console.log("i did all");
    toDoItem.value = "";
}
function addTask() {
    // localStorage.clear();
    let val = toDoItem.value;
    if (!val)
        return; //disable task without value
    else {
        let id = arrTasks.length;
        let newTask = new Task(id, toDoItem.value);
        arrTasks.push(newTask);
        console.log("arrTasks ", arrTasks);
        arrStorageHtml();
    }
}
function deleteAll() {
    // localStorage.clear();
    if (confirm("Delete tasks?")) {
        // todoList.innerHTML=""
        arrTasks = [];
        arrStorageHtml();
        todoList.innerHTML = "";
    }
    arrRemove = [];
    console.log(localStorage);
}
function deleteComp() {
    console.log(localStorage);
    arrTasks = JSON.parse(localStorage.getItem("tasks"));
    arrTasks = arrTasks.filter((task) => (!task.done));
    console.log("arrTasks after fillter = ", arrTasks);
    arrStorageHtml();
}
