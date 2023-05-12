// -------------------------------------------------------------------------Get Todo Container
var todoContainer = document.getElementById('todoContainer')
// -------------------------------------------------------------------------Get User Input
var userTodo = document.getElementById('userTodo')
// -------------------------------------------------------------------------Get Submit Btn
var submit = document.getElementById("submit")
// -------------------------------------------------------------------------Get left Count Element
var leftItems = document.getElementById("leftItems")
// -------------------------------------------------------------------------Set Old Todo If Todo Is Null
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
function changesBtn(element, mouse) {
    var edits = element.querySelector('.edits')
    var editBtn = element.querySelector('#editBtn')
    if (element.querySelector('#todoItem').hasAttribute('disabled')) {
        if (mouse === 'over') {
            edits.style.display = 'flex'
        } else {
            edits.style.display = 'none'
        }
    } else {
        if (mouse === 'over') {
            edits.style.display = 'flex'
            editBtn.setAttribute('src', './images/icon-check.svg')
        } else {
            edits.style.display = 'none'
        }
    }
}
function runEdit(editBtn) {
    var todoItem = editBtn.parentElement.parentElement.querySelector('#todoItem')
    if (editBtn.src.includes('/images/icon-pencil.svg')) {
        oldTodo = todoItem.value
        todoItem.removeAttribute('disabled')
        todoItem.focus()
        todoItem.setSelectionRange(todoItem.value.length, todoItem.value.length)
        editBtn.setAttribute('src', './images/icon-check.svg')
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
function del(element) {
    var todo = element.parentElement.parentElement
    todo.remove()
    var left = todoContainer.children.length
    leftItems.innerHTML = left + ' items left'
}
function delAll() {
    todoContainer.innerHTML = ''
    var left = todoContainer.children.length
    leftItems.innerHTML = left + ' items left'
}
function toggleRadio(element) {
    var radio = element.parentElement.querySelector('.radio')
    if (radio.classList.contains('checked')) {
        radio.classList.remove('checked')
    } else {
        radio.classList.add('checked')
    }
}
submit.addEventListener('click', setTodo)
userTodo.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        setTodo()
    }
});


