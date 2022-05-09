let addTaskButton = document.querySelector("form button");
let formText = document.querySelector(".form-text");
let formDate = document.querySelector(".form-date");
let todosArea = document.querySelector(".todos");
let body = document.querySelector("body");





//creating a task
addTaskButton.addEventListener("click", (event) => {

    event.preventDefault();


// // div for dragging
//     const dragContainer = document.createElement("div");
//     dragContainer.classList.add("drag-container")
    

//new task card
    const newTask = document.createElement("div");
    newTask.classList.add("new-task", "uncompleted-task");


//task info div
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info")

//due date
    const taskDate = document.createElement("div");
    taskDate.classList.add("task-date");



//task title
    const taskText = document.createElement("div");
    taskText.classList.add("task-text");

//task comment
    const taskComment = document.createElement("div");
    taskComment.classList.add("task-comment", "disappear");

// task comment x
    const taskCommentClose = document.createElement("button");
    taskCommentClose.classList.add("comment-close", "task-button", "fa", "fa-close");


//task comment text
    const taskCommentText = document.createElement("textarea");
    taskCommentText.classList.add("task-comment-text");
    taskCommentText.placeholder = "type your comment here and press enter or x"

//top div 
    const taskTopDiv = document.createElement("div");
    taskTopDiv.classList.add("task-top-div");
    

//task buttons div
    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    const taskButtonsTop = document.createElement("div");
    taskButtonsTop.classList.add("task-buttons-top");

//comment button 
    const commentButton = document.createElement("button");
    commentButton.classList.add("comment-button", "task-button", "fa", "fa-file");

//complete task button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete", "task-button", "fa", "fa-check");

//important task buttons
    const flagButton = document.createElement("button");
    flagButton.classList.add("flag-button", "task-button", "fa", "fa-flag");

//edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button", "task-button", "fa", "fa-edit");

//remove task button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button", "task-button", "fa", "fa-close");

//task text
    taskText.innerText = formText.value;
    taskDate.innerText = formDate.value;
    formText.value ="";


//appending elements
    
    taskButtonsTop.appendChild(editButton);
    taskButtonsTop.appendChild(removeButton);
    taskButtons.appendChild(commentButton);
    taskButtons.appendChild(flagButton);
    taskButtons.appendChild(completeButton)
   
    // taskInfo.appendChild(taskDate);
    taskInfo.appendChild(taskText);
    
    taskTopDiv.appendChild(taskDate);
    taskTopDiv.appendChild(taskButtonsTop);
    
    newTask.appendChild(taskTopDiv);
    newTask.appendChild(taskInfo);
    newTask.appendChild(taskButtons);

    todosArea.appendChild(newTask);


    taskComment.appendChild(taskCommentClose);
    taskComment.appendChild(taskCommentText);
    taskButtons.appendChild(taskComment);
   
   
//commentbuttonlistener
        commentButton.addEventListener("click", (e) => {
            taskComment.classList.remove("disappear", "comment-closer");
            taskComment.classList.add("comment-opener");
            taskComment.addEventListener("animationend" ,(e) => {
            taskComment.classList.remove("disappear");
            })
        })

        const commentCLoser = () => {
            taskComment.classList.remove("comment-opener");
            taskComment.classList.add("comment-closer");
            taskComment.addEventListener("animationend" ,(e) => {
                taskComment.classList.add("disappear");
            })
            if (taskCommentText.textLength > 0) {
                commentButton.style.background = "red"
            }
            else {
                commentButton.style.background = "white"
            }
        }

        taskCommentText.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if(e.shiftKey){}
                else{
                console.log("Enter");
                commentCLoser();
                }
            }
        });

        taskCommentClose.addEventListener("click", commentCLoser)

      
//completeButtonListener
        completeButton.addEventListener("click", (e) => {
            newTask.classList.toggle("completed-task");
            newTask.classList.toggle("uncompleted-task");    
        })

//flagButtonListener
        flagButton.addEventListener("click", (e) => {
            newTask.classList.toggle("important-task");
        })

//edit button listener
        editButton.addEventListener("click", (e) => {
           
            if(taskText.contentEditable === "true") {
                   taskText.contentEditable ="false";
                   taskDate.contentEditable ="false";
            }
            
            else {
                taskText.contentEditable = "true";
                taskDate.contentEditable = "true";
                taskText.focus();
                taskText.click();
            }

            taskText.addEventListener("keypress", (e) => {
                if (e.key === 'Enter') {
                    if(e.shiftKey){}
                    else{
                    taskText.contentEditable = "false";
                    }
                }
            })          
        })
//remove button listener
        removeButton.addEventListener("click", (e) => {
            newTask.classList.add("delete-task");
            newTask.addEventListener("transitionend", (e) => {
                newTask.remove();
            })
            
        })



  

})



//filtering

let filterCompleted = document.querySelector(".filter-completed");
let filterUncompleted = document.querySelector(".filter-uncompleted");
let filterImportant = document.querySelector(".filter-important");
let filterAll= document.querySelector(".filter-all");
let filterToday = document.querySelector(".filter-today")

//active filter button
const activeFilter = (filterType) => {
    let filters = document.querySelectorAll(".filter-button");
    filters.forEach(filter => {
        filter.classList.remove("active-filter");
    });
    filterType.classList.add("active-filter");

}


    //completed
filterCompleted.addEventListener("click", (e) => {
    activeFilter(filterCompleted);
    let todos = document.querySelectorAll(".new-task");
    todos.forEach(todo => {
        if (todo.classList.contains("completed-task")) {
            todo.style.display= "flex";
        }
        else {
            todo.style.display = "none";
        }
    });
})

    //uncompleted
filterUncompleted.addEventListener("click", (e) => {
    activeFilter(filterUncompleted);
    let todos = document.querySelectorAll(".new-task");
    todos.forEach(todo => {
        if (todo.classList.contains("uncompleted-task")) {
            todo.style.display= "flex";
        }
        else {
            todo.style.display = "none";
        }
    });
})

    //important
filterImportant.addEventListener("click", (e) => {
    activeFilter(filterImportant);
    let todos = document.querySelectorAll(".new-task");
    todos.forEach(todo => {
        if (todo.classList.contains("important-task")) {
            todo.style.display= "flex";
        }
        else {
            todo.style.display = "none";
        }
    });
})

    //all
filterAll.addEventListener("click", (e) => {
    activeFilter(filterAll);
    let todos = document.querySelectorAll(".new-task");
    todos.forEach(todo => {
        todo.style.display = "flex";
        })
    });

    //today
filterToday.addEventListener("click", (e) => {
    activeFilter(filterToday);
    let today = new Date().toISOString().slice(0, 10);
    let taskDates = document.querySelectorAll(".task-date");
    taskDates.forEach(taskDate => {
        if(taskDate.textContent == today) {
            taskDate.parentElement.parentElement.style.display = "flex";
        }
        else {
            taskDate.parentElement.parentElement.style.display = "none";
        }
    })

 
})



    