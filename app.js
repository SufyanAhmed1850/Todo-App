// -----------------------------------------------------------------------------Get Todo Container
var todoContainer = document.getElementById('todoContainer')
// -----------------------------------------------------------------------------Get User Input
var userTodo = document.getElementById('userTodo')
// -----------------------------------------------------------------------------Get Submit Btn
var submit = document.getElementById("submit")
// -----------------------------------------------------------------------------Get left Count Element
var leftItems = document.getElementById("leftItems")
// -----------------------------------------------------------------------------Set Old Todo If Todo Is Null
var oldTodo = ""

function setTodo() {
    if (!userTodo.value) {
        return
    }
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
    input.setAttribute('value', userTodo.value)
    input.setAttribute('onblur', "diableField(this)")
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
    // -------------------------------------------------------------------------Get Length Of TodoList
    var left = todoContainer.children.length
    // -------------------------------------------------------------------------Set Length Of TodoList
    leftItems.innerHTML = left + ' items left'
}
// -----------------------------------------------------------------------------Calls setTodo Function On Click
submit.addEventListener('click', setTodo)
// -----------------------------------------------------------------------------Calls setTodo Function On Pressing Enter
userTodo.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        setTodo()
    }
});
// -----------------------------------------------------------------------------Handles Img On Hover (Pencil <---> Check)
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
// -----------------------------------------------------------------------------Enables/Disables Editing On Todo Item
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
// -----------------------------------------------------------------------------On Blur Enables/Disables Editing On Todo Item
oldTodo = todoItem.value
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
// -----------------------------------------------------------------------------Deletes A Todo Item & Updates Length Of Todo Items
function del(element) {
    // -------------------------------------------------------------------------Deletes A Todo Item
    var todo = element.parentElement.parentElement
    todo.remove()
    // -------------------------------------------------------------------------Upates Length Of Todo Items
    var left = todoContainer.children.length
    leftItems.innerHTML = left + ' items left'
}
// -----------------------------------------------------------------------------Adds Checked Class On Radio
function toggleRadio(element) {
    // -------------------------------------------------------------------------Targetting Radio Btn
    var radio = element.parentElement.querySelector('.radio')
    // -------------------------------------------------------------------------Removes/Add Checked Class To Radio Btn
    if (radio.classList.contains('checked')) {
        radio.classList.remove('checked')
    } else {
        radio.classList.add('checked')
    }
}
// -----------------------------------------------------------------------------Deletes Completed Todo Items
function delAll() {
    todoContainer.innerHTML = ''
    var left = todoContainer.children.length
    leftItems.innerHTML = left + ' items left'
}