let taskinput = document.getElementById("taskInput");
let addtaskbtn = document.getElementById("addTaskBtn");
let tasklist = document.getElementById("taskList");

// load task from local storage on page load
document.addEventListener("DOMContentLoaded", load_task);

// Add Event listner to Add task Button
addtaskbtn.addEventListener("click", add_task)

// add event listner for eter key

taskinput.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
    
        add_task()
    }
})

// Add Event Lsitner to task List to handle delete and update actions
tasklist.addEventListener("click", handle_task_actions)

tasks = [];

function load_task(){
    let stored_tasks = localStorage.getItem("tasks");
    if(stored_tasks){
        tasks = JSON.parse(stored_tasks);
        tasks.forEach(task => {
            create_task_item(task.text,task.datetime);
            
        });
    }
}

function save_task_to_localstorage(){
localStorage.setItem("tasks", JSON.stringify(tasks))
}

function add_task(){
    let task_text = taskinput.value.trim();

    if(task_text ){
        let taskdatetime = getCurrent_DateTime()
        create_task_item(task_text,taskdatetime);
        tasks.push({"text":task_text, "datetime":taskdatetime});
        save_task_to_localstorage();
        taskinput.value = "";
    }
}

function create_task_item(task_text, taskDateTime){
    let task_item   = document.createElement("li");
    let task_text_element = document.createElement("span")
    // task_text_element.classList.add("marg")
    task_text_element.innerText = task_text;

    let delete_btn = document.createElement("span")
    delete_btn.innerHTML = "&#10006;" ;
    delete_btn.classList.add("deleteBtn")

    let update_btn = document.createElement("span");
    update_btn.innerHTML = "&#9998;";
    update_btn.classList.add("updateBtn");
     
   
    let date_time = document.createElement("span");
    date_time.classList.add("date-time")
    date_time.innerHTML = taskDateTime;

    tasklist.appendChild(task_item);
    task_item.appendChild(task_text_element)
    task_item.appendChild(delete_btn);
    task_item.appendChild(update_btn);
    task_item.appendChild(date_time);
}
function getCurrent_DateTime() {
    const currentDate = new Date();
    return currentDate.toLocaleString(); // Convert the date to a string representation
  }
function handle_task_actions(event){
    if(event.target.classList.contains("deleteBtn")){
     let taskitem = event.target.parentElement;
     let tasktext  = taskitem.querySelector("span").innerText;
     let taskindex = tasks.indexOf(tasktext)
     tasks.splice(taskindex,1)
     taskitem.remove()
     save_task_to_localstorage()
    
    }
    if(event.target.classList.contains("updateBtn")){
        let taskitem = event.target.parentElement;
        console.log(taskitem)
        let tasktextelement = taskitem.querySelector("span");
        let datetimelement = taskitem.querySelector(".date-time")
        let tasktext = tasktextelement.innerText;
        let  updatetasktext = prompt("Update-Text ",tasktext)

        if(updatetasktext){
            tasktextelement.innerText = updatetasktext;
            datetimelement.innerText = getCurrent_DateTime()
            let taskindex = Array.from(taskList.children).indexOf(taskitem);
            // console.log(Array.from(tasklist.children).indexOf(taskitem))
            // let taskindex = tasks.indexOf(tasktext);
            console.log(taskindex)
            tasks[taskindex].text= updatetasktext;
            tasks[taskindex].datetime= getCurrent_DateTime();
            console.log(tasks)
            save_task_to_localstorage()


        }
    }
}

