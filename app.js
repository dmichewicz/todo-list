let addTaskButton = document.querySelector(".add-button");
let formText = document.querySelector(".form-text");
let formDate = document.querySelector(".form-date");
let todosArea = document.querySelector(".todos");
let body = document.querySelector("body");



document.addEventListener('DOMContentLoaded', getFromLocal);

let indexCounter;

if(JSON.parse(localStorage.getItem('todos')) === null) {
    indexCounter = -1;
} else {
    indexCounter = JSON.parse(localStorage.getItem('todos')).length - 1;

}

formText.addEventListener('keypress', (e) => {

    if(e.key === 'Enter') {
        e.preventDefault()
        addTaskButton.click();
    }
})

//creating a task
addTaskButton.addEventListener("click", (event) => {

    event.preventDefault();
indexCounter++
let index = indexCounter


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
    saveToLocal(formText.value, formDate.value, taskCommentText.value, "uncompleted-task", "notimportant-task");
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

        const saveComment = (comment) => {
            let comments = JSON.parse(localStorage.getItem('comments'));
            comments[index] = comment;
            localStorage.setItem("comments", JSON.stringify(comments));
            }
      
        const commentCLoser = () => {

            
            saveComment(taskCommentText.value);
          
            taskComment.classList.remove("comment-opener");
            taskComment.classList.add("comment-closer");
            taskComment.addEventListener("animationend" ,(e) => {
                taskComment.classList.add("disappear");
            })
            if (taskCommentText.textLength > 0) {
                commentButton.classList.add("active-comment")
            }
            else {
                commentButton.classList.remove("active-comment");
            }
        }
       

        taskCommentText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if(e.shiftKey){}
                else{
                    
                commentCLoser();
                
                }
            }
        });


        taskCommentClose.addEventListener("click", commentCLoser)

       
      
//completeButtonListener

        const saveCompleted = () => {
            let completes = JSON.parse(localStorage.getItem('completes'));

                        
                        if (newTask.classList.contains("completed-task")) {
                            completes[index] = "completed-task";
                            
                        } else {
                            completes[index] = "uncompleted-task";
                        }
                        localStorage.setItem("completes", JSON.stringify(completes));
                        
        

        }


        completeButton.addEventListener("click", (e) => {
            newTask.classList.toggle("completed-task");
            newTask.classList.toggle("uncompleted-task");
            saveCompleted();    
        })

//flagButtonListener

        const saveImportant = () => {
            let importants = JSON.parse(localStorage.getItem('importants'));
        
                        if (newTask.classList.contains("important-task")) {
                            importants[index] = "important-task";
                            
                        } else {
                            importants[index] = "notimportant-task";
                        }
                        localStorage.setItem("importants", JSON.stringify(importants));
                        
                    }

        flagButton.addEventListener("click", (e) => {
            newTask.classList.toggle("important-task");
            saveImportant();
        })

//edit button listener

    

  


        const saveEdit = (text, date) => {
            let todos = JSON.parse(localStorage.getItem('todos'));
            let dates = JSON.parse(localStorage.getItem('dates'));

            todos[index] = text;
            dates[index] = date;
            
        
            localStorage.setItem("todos", JSON.stringify(todos));
            localStorage.setItem("dates", JSON.stringify(dates));
                        
            

            }




        editButton.addEventListener("click", (e) => {


            
           
            if(taskText.contentEditable === "true") {
                   taskText.contentEditable ="false";
                   taskDate.contentEditable ="false";
                   saveEdit(taskText.textContent, taskDate.textContent);
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
                    taskDate.contentEditable = "false"
                    saveEdit(taskText.textContent, taskDate.textContent);
                    }
                }
            })          
        })

            taskDate.addEventListener("keypress", (e) => {
                if (e.key === 'Enter') {
                    if(e.shiftKey){}
                    else{
                    taskText.contentEditable = "false";
                    taskDate.contentEditable = "false";
                    saveEdit(taskText.textContent, taskDate.textContent);
                    }
                }
            })          
        
//remove button listener
        const removeFromLocal = () => {
            todos = JSON.parse(localStorage.getItem('todos'));
            dates = JSON.parse(localStorage.getItem('dates'));
            comments = JSON.parse(localStorage.getItem('comments'));
            completes = JSON.parse(localStorage.getItem('completes'));
            importants = JSON.parse(localStorage.getItem('importants'));


        todos.splice(todos.index);
        dates.splice(todos.index);
        comments.splice(todos.index);
        completes.splice(todos.index);
        importants.splice(todos.index);

        localStorage.setItem("todos", JSON.stringify(todos))
        localStorage.setItem("dates", JSON.stringify(dates))
        localStorage.setItem("comments", JSON.stringify(comments))
        localStorage.setItem("completes", JSON.stringify(completes))
        localStorage.setItem("importants", JSON.stringify(importants))

        }


        removeButton.addEventListener("click", (e) => {
            removeFromLocal()
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










function saveToLocal(todo, date, comment, completed, important){
    let todos;
    let dates;
    let comments;
    let completes; 
    let importants;
    if(localStorage.getItem('todos') === null || localStorage.getItem('dates') === null) {
        todos = []
        dates = []
        comments = []
        completes = []
        importants = []
    
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        dates = JSON.parse(localStorage.getItem('dates'));
        comments = JSON.parse(localStorage.getItem('comments'));
        completes = JSON.parse(localStorage.getItem('completes'));
        importants = JSON.parse(localStorage.getItem('importants'));


    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    dates.push(date);
    localStorage.setItem("dates", JSON.stringify(dates));

    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));

    completes.push(completed);
    localStorage.setItem("completes", JSON.stringify(completes));

    importants.push(important);
    localStorage.setItem("importants", JSON.stringify(importants));


}





function getFromLocal() {
    let todos;
    let dates;
    let comments;
    let completes;
    let importants;

    if(localStorage.getItem('todos') === null || localStorage.getItem('dates') === null || localStorage.getItem('comments') === null || localStorage.getItem('completes') === null || localStorage.getItem('importants') === null) {
        todos = []
        dates = []
        comments = []
        completes = []
        importants = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        dates = JSON.parse(localStorage.getItem('dates'));
        comments = JSON.parse(localStorage.getItem('comments'));
        completes = JSON.parse(localStorage.getItem('completes'));
        importants = JSON.parse(localStorage.getItem('importants'));
    }




    for (let index = 0; index < todos.length; index++) {
        
    // }
    // todos.forEach((todo) => {
        //new task card
    const newTask = document.createElement("div");
    newTask.classList.add("new-task");







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
    taskText.innerText = todos[index];

    //dates from local
    
    taskDate.innerText = dates[index];
    


    // //comments from local
    
     taskCommentText.innerText = comments[index]; 
     


            //coloring active comment button or not coloring
            if (taskCommentText.textLength > 0) {
                commentButton.classList.add("active-comment")
            }
          



            /////TUTAJ WALCZ

        //completes from local


        newTask.classList.add(completes[index])
        
      

           
        // //importantss from local

        

        newTask.classList.add(importants[index])
      
                  
       ////DOTAD     



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
      
        const saveComment = (comment) => {
            let comments = JSON.parse(localStorage.getItem('comments'));
            comments[index] = comment;
            localStorage.setItem("comments", JSON.stringify(comments));
            }
       

        const commentCLoser = () => {
            saveComment(taskCommentText.value)
            taskComment.classList.remove("comment-opener");
            taskComment.classList.add("comment-closer");
            taskComment.addEventListener("animationend" ,(e) => {
                taskComment.classList.add("disappear");
            })
            if (taskCommentText.textLength > 0) {
                commentButton.classList.add("active-comment")
            }
            else {
                commentButton.classList.remove("active-comment");
            }
        }

        taskCommentText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if(e.shiftKey){}
                else{
             
                commentCLoser();
                }
            }
        });


        taskCommentClose.addEventListener("click", commentCLoser)

       
      
    //completeButtonListener

        const saveCompleted = () => {
            let completes = JSON.parse(localStorage.getItem('completes'));
      
                        
                        if (newTask.classList.contains("completed-task")) {
                            completes[index] = "completed-task";
                            
                        } else {
                            completes[index] = "uncompleted-task";
                        }
                        localStorage.setItem("completes", JSON.stringify(completes));
                        
          

        }


        completeButton.addEventListener("click", (e) => {
            newTask.classList.toggle("completed-task");
            newTask.classList.toggle("uncompleted-task");
            saveCompleted();    
        })

        //flagButtonListener

        const saveImportant = () => {
            let importants = JSON.parse(localStorage.getItem('importants'));
          
                        if (newTask.classList.contains("important-task")) {
                            importants[index] = "important-task";
                            
                        } else {
                            importants[index] = "notimportant-task";
                        }
                        localStorage.setItem("importants", JSON.stringify(importants));
                        
                    }
            
            

        
        flagButton.addEventListener("click", (e) => {
            newTask.classList.toggle("important-task");
            saveImportant();
        })

//edit button listener

    


        const saveEdit = (text, date) => {
            let todos = JSON.parse(localStorage.getItem('todos'));
            let dates = JSON.parse(localStorage.getItem('dates'));

            todos[index] = text;
            dates[index] = date;
            
          
            localStorage.setItem("todos", JSON.stringify(todos));
            localStorage.setItem("dates", JSON.stringify(dates));
                        
            

            }
            




        editButton.addEventListener("click", (e) => {


            
           
            if(taskText.contentEditable === "true") {
                   taskText.contentEditable ="false";
                   taskDate.contentEditable ="false";
                   saveEdit(taskText.textContent, taskDate.textContent);
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
                    taskDate.contentEditable = "false"
                    saveEdit(taskText.textContent, taskDate.textContent);
                    }
                }
            })          
        })

            taskDate.addEventListener("keypress", (e) => {
                if (e.key === 'Enter') {
                    if(e.shiftKey){}
                    else{
                    taskText.contentEditable = "false";
                    taskDate.contentEditable = "false";
                    saveEdit(taskText.textContent, taskDate.textContent);
                    }
                }
            })     
//remove button listener

        const removeFromLocal = () => {
            todos = JSON.parse(localStorage.getItem('todos'));
            dates = JSON.parse(localStorage.getItem('dates'));
            comments = JSON.parse(localStorage.getItem('comments'));
            completes = JSON.parse(localStorage.getItem('completes'));
            importants = JSON.parse(localStorage.getItem('importants'));
    
  
        todos.splice(todos.index, 1);
        dates.splice(todos.index, 1);
        comments.splice(todos.index, 1);
        completes.splice(todos.index, 1);
        importants.splice(todos.index, 1);
    
        localStorage.setItem("todos", JSON.stringify(todos))
        localStorage.setItem("dates", JSON.stringify(dates))
        localStorage.setItem("comments", JSON.stringify(comments))
        localStorage.setItem("completes", JSON.stringify(completes))
        localStorage.setItem("importants", JSON.stringify(importants))
    
    }

        removeButton.addEventListener("click", (e) => {
            removeFromLocal(taskText);
            newTask.classList.add("delete-task");
            newTask.addEventListener("transitionend", (e) => {
                newTask.remove();
            })
            
        })



  

}
// )

    }


// function removeFromLocal(todoTitle) {

//     let todos;
//     let dates;
//     let comments;
//     let completes;
//     let importants;

// if (localStorage.getItem("todos") === null) {
//     todos = []
// } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//         dates = JSON.parse(localStorage.getItem('dates'));
//         comments = JSON.parse(localStorage.getItem('comments'));
//         completes = JSON.parse(localStorage.getItem('completes'));
//         importants = JSON.parse(localStorage.getItem('importants'));
// }
//     const todoIndex = todoTitle.innerText;
//     todos.splice(todos.indexOf(todoIndex), 1);
//     dates.splice(todos.indexOf(todoIndex), 1);
//     comments.splice(todos.indexOf(todoIndex), 1);
//     completes.splice(todos.indexOf(todoIndex), 1);
//     importants.splice(todos.indexOf(todoIndex), 1);

//     localStorage.setItem("todos", JSON.stringify(todos))
//     localStorage.setItem("dates", JSON.stringify(dates))
//     localStorage.setItem("comments", JSON.stringify(comments))
//     localStorage.setItem("completes", JSON.stringify(completes))
//     localStorage.setItem("importants", JSON.stringify(importants))

// }

