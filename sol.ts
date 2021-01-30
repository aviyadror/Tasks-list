
let toDoItem:any =<HTMLInputElement>document.querySelector('#todo-item');
let dellAll:any = <HTMLInputElement>document.querySelector('#todo-delall');
let dellComp:any= <HTMLInputElement>document.querySelector('#todo-delcom');
let todoList:any = <HTMLInputElement>document.querySelector('#todo-list');
let todoSave = document.querySelector('#todo-save');
let arrRemove:Array<Task> = []
let count:number = 0;
let arrTasks:Array<Task>; 
dellAll.addEventListener("click",deleteAll)
dellComp.addEventListener("click",deleteComp)
todoSave.addEventListener("click",addTask)
class Task{
    public id;
    public text;
    public done;
    

    constructor(id,text){
        this.id = id;
        this.text = text;
        this.done = false;

    }

}
window.onload=()=>{
    
//take the arr from the storage
//put every item in thte html
// localStorage.clear();
console.log(localStorage)
console.log(!localStorage.getItem("tasks"));
if(!localStorage.getItem("tasks")){
    arrTasks=[];
    localStorage.setItem("tasks",JSON.stringify(arrTasks))
    console.log(localStorage);
}
else{
    arrTasks= JSON.parse(localStorage.getItem("tasks"))
}

console.log("arr taks obj= ",JSON.parse(localStorage.getItem("tasks")))
let arrTasksFromJson:Array<Task> = JSON.parse(localStorage.getItem("tasks"))
arrTasksFromJson.forEach((task:Task)=>{
   
    todoList.innerHTML +=  taskToHtml(task); //the arr from storage to HTML

})
}





function taskToHtml(task:Task) {
    let doneClass= 'todoVal'
    if(task.done){
        doneClass='doneClass';
    }
    
    return `
        <div class="${doneClass}" id='task_${task.id}'>
            
            <span class="${doneClass}" id='span_${task.id}'>${task.text}</span><p class='btnDone' onclick='changeTask(${task.id})'>&#10004</p><br><br><br>
            
        </div>`;
}

function changeTask(id:number):void {
    console.log(id)
    arrTasks= JSON.parse(localStorage.getItem("tasks"))
    console.log("arrTasks[id]= ",arrTasks[id])
    console.log("arrTasks[id].done =",arrTasks[id].done)
    arrTasks[id].done = true
    console.log("arrTasks[id].done =",arrTasks[id].done)
    arrStorageHtml()
    
}

function arrStorageHtml(){
    todoList.innerHTML=""
    localStorage.setItem("tasks",JSON.stringify(arrTasks))
    console.log("localStorage=",localStorage)
    let arrTasksFromJson:Array<Task> = JSON.parse(localStorage.getItem("tasks"))
    arrTasksFromJson.forEach((task:Task)=>{
        todoList.innerHTML +=  taskToHtml(task); //the arr from storage to HTML

})
console.log("i did all")
toDoItem.value =""

}

function addTask():void {

    // localStorage.clear();
    let val:string = (<HTMLInputElement>toDoItem).value
    if(!val) return //disable task without value
    else{
    let id:number=arrTasks.length
    let newTask = new Task(id,(<HTMLInputElement>toDoItem).value)
    arrTasks.push(newTask);
    console.log("arrTasks ", arrTasks)
    arrStorageHtml()
    }
} 


function deleteAll():void{
    // localStorage.clear();
    if(confirm("Delete tasks?")){
        // todoList.innerHTML=""
        arrTasks = []
        arrStorageHtml()
        todoList.innerHTML=""

    }
    arrRemove=[]
    console.log(localStorage);
}

function deleteComp():void{

    console.log(localStorage)
    arrTasks= JSON.parse(localStorage.getItem("tasks"))
    arrTasks = arrTasks.filter((task:Task)=>(!task.done))
    console.log("arrTasks after fillter = ",arrTasks);
    arrStorageHtml()


}
