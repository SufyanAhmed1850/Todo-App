function theme() {
    var element = document.body
    var themeIcon = document.getElementById('themeIcon')
    element.classList.toggle("lightTheme")
    if (element.classList == 'lightTheme') {
        themeIcon.src = './images/icon-moon.svg'
        themeIcon.style.filter = 'invert(50%)'
    } else {
        themeIcon.src = './images/icon-sun.svg'
        themeIcon.style.filter = 'invert(0%)'
    }
}
// -----------------------------------------------------------------------------Get Todo Container
var todoContainer = document.getElementById('todoContainer')
// -----------------------------------------------------------------------------Get User Input
var userTodo = document.getElementById('userTodo')
// -----------------------------------------------------------------------------Get Submit Btn
var submit = document.getElementById("submit")
// -----------------------------------------------------------------------------Get left Count Element
var leftItems = document.getElementById("leftItems")
// -----------------------------------------------------------------------------Get All TodoItem
var allTodo = []
// -----------------------------------------------------------------------------Get Active TodoItem
var activeTodo = []
// -----------------------------------------------------------------------------Get Completed TodoItem
var completedTodo = []
// -----------------------------------------------------------------------------Set Old Todo If Todo Is Null
var oldTodo = ""
// -----------------------------------------------------------------------------Creates A TodoItem---------------------------------------------------------------------------//
function setTodo(inputLocal) {
    showAll()
    if (inputLocal || (!inputLocal && userTodo.value)) {
        // -------------------------------------------------------------------------Create Parent Todo
        var todo = document.createElement('div')
        // -------------------------------------------------------------------------Create Parent Raido
        var radioP = document.createElement('div')
        // -------------------------------------------------------------------------Create Raido
        var radio = document.createElement('div')
        // -------------------------------------------------------------------------Create Input Field
        var input = document.createElement('input')
        // -------------------------------------------------------------------------Create Parent Img Btn
        var edits = document.createElement('div')
        // -------------------------------------------------------------------------Create Img Pencil
        var img1 = document.createElement('img')
        // -------------------------------------------------------------------------Create Img Cross
        var img2 = document.createElement('img')
        // -------------------------------------------------------------------------Set Parent Todo Attributes
        todo.setAttribute('id', 'todo')
        todo.setAttribute('class', 'todo')
        todo.setAttribute('onmouseover', "changesBtn(this, 'over')")
        todo.setAttribute('onmouseout', "changesBtn(this, 'out')")
        // -------------------------------------------------------------------------Set Radio Attributes
        radio.setAttribute('class', 'radio')
        radio.setAttribute('onclick', 'toggleRadio(this)')
        // -------------------------------------------------------------------------Set Input Field Attributes
        input.setAttribute('id', 'todoItem')
        input.setAttribute('class', 'todoItem')
        input.setAttribute('type', 'text')
        input.setAttribute('disabled', 'true')
        if (inputLocal) {
            input.setAttribute('value', inputLocal)
            var val = 'local'
        } else {
            input.setAttribute('value', userTodo.value)
            var val = 'user'
        }
        input.setAttribute('onblur', "diableField(this)")
        input.setAttribute('autocomplete', "off")
        input.setAttribute('spellcheck', "false")
        // -------------------------------------------------------------------------Set Parent Img Attributes
        edits.setAttribute('id', 'edits')
        edits.setAttribute('class', 'edits')
        // -------------------------------------------------------------------------Set Pencil Attributes
        img1.setAttribute('id', 'editBtn')
        img1.setAttribute('src', './images/icon-pencil.svg')
        img1.setAttribute('width', '20px')
        img1.setAttribute('onclick', 'runEdit(this)')
        // -------------------------------------------------------------------------Set Cross Attributes
        img2.setAttribute('id', 'delBtn')
        img2.setAttribute('src', './images/icon-cross.svg')
        img2.setAttribute('width', '26px')
        img2.setAttribute('onclick', 'del(this)')
        // -------------------------------------------------------------------------Append Radio To RadioP
        radioP.appendChild(radio)
        // -------------------------------------------------------------------------Append Img1 To edits
        edits.appendChild(img1)
        // -------------------------------------------------------------------------Append Img2 To edits
        edits.appendChild(img2)
        // -------------------------------------------------------------------------Append radioP To Parent (Todo)
        todo.appendChild(radioP)
        // -------------------------------------------------------------------------Append Input To Parent (Todo)
        todo.appendChild(input)
        // -------------------------------------------------------------------------Append Edits To Parent (Todo)
        todo.appendChild(edits)
        // -------------------------------------------------------------------------Reset Value Of UserInput
        userTodo.value = ""
        // -------------------------------------------------------------------------Append Parent (Todo) To TodoContainer
        todoContainer.insertBefore(todo, todoContainer.firstChild)
        getActiveAndCompleted()
        // -------------------------------------------------------------------------Set Length Of TodoList
        leftItems.innerHTML = activeTodo.length + ' items left'
        // -------------------------------------------------------------------------Calls Function That Sets todoItem To Local
        switch (val) {
            case 'user':
                toLocal()
                console.log('user')
                break
            default:
                console.log('local')
                break
        }
    } else if (!userTodo.value) {
        return
    }
}
// -----------------------------------------------------------------------------Calls setTodo Function On Click
submit.addEventListener('click', setTodo)
// -----------------------------------------------------------------------------Calls setTodo Function On Pressing Enter
userTodo.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        setTodo()
    }
});
// -----------------------------------------------------------------------------Gets All && Active && Completed TodoItems----------------------------------------------------//
function getActiveAndCompleted() {
    allTodo = []
    activeTodo = []
    completedTodo = []
    var chk = todoContainer.querySelectorAll('.todoItem')
    var chkArr = [...chk]
    for (i = 0; i < chkArr.length; i++) {
        allTodo.push(chkArr[i])
        if (chkArr[i].style.textDecoration === 'line-through') {
            completedTodo.push(chkArr[i])
        } else {
            activeTodo.push(chkArr[i])
        }
    }
}
// -----------------------------------------------------------------------------Handles Img On Hover (Pencil <---> Check)----------------------------------------------------//
function changesBtn(element, mouse) {
    // -------------------------------------------------------------------------Targets Parent Of Edits Div Of Hovered Todo Item
    var edits = element.querySelector('.edits')
    // -------------------------------------------------------------------------Targets Edit Btn Of Hovered Todo Item
    var editBtn = element.querySelector('#editBtn')
    // -------------------------------------------------------------------------If Todo Input Is Disabled
    if (element.querySelector('#todoItem').hasAttribute('disabled')) {
        if (mouse === 'over') {
            edits.style.display = 'flex'
        } else {
            edits.style.display = 'none'
        }
        // ---------------------------------------------------------------------If Todo Input Is Enabled
    } else {
        if (mouse === 'over') {
            edits.style.display = 'flex'
            editBtn.setAttribute('src', './images/icon-check.svg')
        } else {
            edits.style.display = 'none'
        }
    }
}
// -----------------------------------------------------------------------------Enables/Disables Editing On Todo Item--------------------------------------------------------//
function runEdit(editBtn) {
    // -------------------------------------------------------------------------Targets Todo Item Input
    var todoItem = editBtn.parentElement.parentElement.querySelector('#todoItem')
    // -------------------------------------------------------------------------If Todo Input Is Disabled
    if (editBtn.src.includes('/images/icon-pencil.svg')) {
        oldTodo = todoItem.value
        todoItem.removeAttribute('disabled')
        todoItem.focus()
        todoItem.setSelectionRange(todoItem.value.length, todoItem.value.length)
        editBtn.setAttribute('src', './images/icon-check.svg')
        // ---------------------------------------------------------------------If Todo Input Is Enabled
    } else {
        if (!todoItem.value) {
            todoItem.value = oldTodo
            todoItem.setAttribute('disabled', 'true')
        } else {
            todoItem.setAttribute('disabled', 'true')
        }
        editBtn.setAttribute('src', './images/icon-pencil.svg')
    }
}
// -----------------------------------------------------------------------------On Blur Enables/Disables Editing On Todo Item------------------------------------------------//
function diableField(element) {
    var todoItem = element
    var Todo = element.parentNode
    var editBtn = Todo.querySelector('#editBtn')
    if (!todoItem.value) {
        todoItem.value = oldTodo
    }
    // -------------------------------------------------------------------------Delay Added To Prevent Calling Both runEdit & diableField Run At The Same Time
    setTimeout(function disableAndSrc() {
        todoItem.setAttribute('disabled', 'true')
        editBtn.src = './images/icon-pencil.svg'
    }, 100)
}
// -----------------------------------------------------------------------------Deletes A Todo Item & Updates Length Of Todo Items-------------------------------------------//
function del(element) {
    // -------------------------------------------------------------------------Deletes A Todo Item
    var todo = element.parentElement.parentElement
    todo.remove()
    getActiveAndCompleted()
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
    // -------------------------------------------------------------------------Calls Function That Sets todoItem To Local
    toLocal()
}
// -----------------------------------------------------------------------------Adds Checked Class On Radio------------------------------------------------------------------//
function toggleRadio(element) {
    // -------------------------------------------------------------------------Targetting Radio Btn
    var radio = element
    var todo = radio.parentNode.parentNode
    var input = todo.querySelector('#todoItem')
    // -------------------------------------------------------------------------Removes/Add Checked Class To Radio Btn
    if (radio.classList.contains('checked')) {
        radio.classList.remove('checked')
        input.style.textDecoration = 'none'
        input.style.color = 'var(--clr-txt)'
    } else {
        radio.classList.add('checked')
        input.style.textDecoration = 'line-through'
        input.style.color = '#4D5067'
    }
    getActiveAndCompleted()
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
    // -------------------------------------------------------------------------Calls Function That Sets todoItem To Local
    toLocal()
}
// -----------------------------------------------------------------------------Deletes Completed Todo Items-----------------------------------------------------------------//
function delCompleted() {
    for (i = 0; i < completedTodo.length; i++) {
        completedTodo[i].parentNode.remove()
    }
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
    getActiveAndCompleted()
    // -------------------------------------------------------------------------Calls Function That Sets todoItem To Local
    toLocal()
}
// -----------------------------------------------------------------------------Shows Only Completed TodoItems---------------------------------------------------------------//
function showCompleted() {
    var all = document.getElementById('all')
    var active = document.getElementById('active')
    var completed = document.getElementById('completed')
    all.classList.remove('focus')
    active.classList.remove('focus')
    completed.classList.add('focus')
    todoContainer.innerHTML = ''
    for (var i = 0; i < completedTodo.length; i++) {
        var completedTodoParent = completedTodo[i].parentNode
        todoContainer.appendChild(completedTodoParent)
    }
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
}
// -----------------------------------------------------------------------------Shows Only Active TodoItems------------------------------------------------------------------//
function showActive() {
    var all = document.getElementById('all')
    var active = document.getElementById('active')
    var completed = document.getElementById('completed')
    all.classList.remove('focus')
    active.classList.add('focus')
    completed.classList.remove('focus')
    todoContainer.innerHTML = ''
    for (var i = 0; i < activeTodo.length; i++) {
        var activeTodoParent = activeTodo[i].parentNode
        todoContainer.appendChild(activeTodoParent)
    }
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
}
// -----------------------------------------------------------------------------Shows All TodoItems--------------------------------------------------------------------------//
function showAll() {
    var all = document.getElementById('all')
    var active = document.getElementById('active')
    var completed = document.getElementById('completed')
    all.classList.add('focus')
    active.classList.remove('focus')
    completed.classList.remove('focus')
    todoContainer.innerHTML = ''
    for (var i = 0; i < allTodo.length; i++) {
        var allTodoParent = allTodo[i].parentNode
        todoContainer.appendChild(allTodoParent)
    }
    // -------------------------------------------------------------------------Updates Length Of TodoList
    leftItems.innerHTML = activeTodo.length + ' items left'
}
// -----------------------------------------------------------------------------Sets todoItems to Local Storage---------------------------------------------------------------//
function toLocal() {
    var childTodoItems = todoContainer.querySelectorAll('.todoItem')
    var childTodoItemsArr = [...childTodoItems]
    var childTodoValueArr = []
    for (var i = 0; i < childTodoItemsArr.length; i++) {
        childTodoValueArr.unshift(childTodoItemsArr[i].value)
    }
    var strChildTodoItemsArr = JSON.stringify(childTodoValueArr)
    localStorage.setItem('localTodoItems', strChildTodoItemsArr)
}
// -----------------------------------------------------------------------------Gets todoItems From Local Storage---------------------------------------------------------------//
function getLocal() {
    var getFromLocal = localStorage.getItem('localTodoItems')
    var localParse = JSON.parse(getFromLocal)
    // -------------------------------------------------------------------------If Local Have todoItemsValue Then It Append todoItem with Value From Local
    if (localParse) {
        for (var i = 0; i <= localParse.length; i++) {
            setTodo(localParse[i])
        }
    }
} getLocal()