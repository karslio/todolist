//Tüm elementleri secme
const form  = document.querySelector("#todo-form");
const todoInput  = document.querySelector("#todo");
const todoList  = document.querySelector(".list-group");
const firstCardBody  = document.querySelectorAll(".card-body")[0];
const secondCardBody  = document.querySelectorAll(".card-body")[1];
const filter  = document.querySelector("#filter");
const clearButton  = document.querySelector("#clear-todos");

eventListeners();
function eventListeners(){ // tüm event listener
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === ""){
        /* <div class="alert alert-danger" role="alert">This is a danger alert—check it out!</div> */
        showAlert("danger","Lutfen bir todo girin");
    }
    else{
        adTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success",`${newTodo} basarıyla eklendi`);
    }
    e.preventDefault();
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);    
    setTimeout(function(){
        alert.remove();
    },1000);
}

function adTodoUI(newTodo){//string elementini list item olarak UI ya ekeleyecegiz
    /*
    <li class="list-group-item d-flex justify-content-between"> Todo 1
     <a href = "#" class ="delete-item"><i class = "fa fa-remove"></i> </a>
     </li>
     */
 // list İtem olusturma
 const listItem = document.createElement("li");
 // link olusturma
 const link =document.createElement("a");
 link.href ="#";
 link.className = "delete-item";
 link.innerHTML = "<i class = 'fa fa-remove' ></i>";
 
 listItem.className = "list-group-item d-flex justify-content-between";
 
 // text Node olusturma
 
 listItem.appendChild(document.createTextNode(newTodo));
 listItem.appendChild(link);
 
 
 // todo List e List  İtem ı ekleme 
 
 todoList.appendChild(listItem);
 
 todoInput.value = "";
}

function addTodoToStorage (newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodosFromStorage(){
    let todos ;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;

}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        adTodoUI(todo);
    })
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){   
        e.target.parentElement.parentElement.remove();
        deleteTodofromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success",`${e.target.parentElement.parentElement.textContent} basarıyla silindi` );       
    }  
}

function deleteTodofromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            //bulamadı
            listItem.setAttribute("style", "display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })

}

function clearAllTodos(){
    if(confirm("Tümünü silmek istediğinizden eminmisiniz ?")){
        //arayuzden todo ları silme
       // todoList.innerHTML = "" // yavas
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
    
}

console.log("merhaba");


// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/karslio/listeleme-.git
// git push -u origin master */