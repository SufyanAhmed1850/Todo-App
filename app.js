var todoContainer = document.getElementById('todoContainer')
var userTodo = document.getElementById('userTodo')
var submit = document.getElementById("submit")
var leftItems = document.getElementById("leftItems")
var oldTodo = ""
function setTodo() {
    if (!userTodo.value) {
        return
    }
    var todo = document.createElement('div')
    var radioP = document.createElement('div')
    var radio = document.createElement('div')
    var input = document.createElement('input')
    var edits = document.createElement('div')
    var img1 = document.createElement('img')
    var img2 = document.createElement('img')
    todo.setAttribute('id', 'todo')
    todo.setAttribute('class', 'todo')
    todo.setAttribute('onmouseover', "changesBtn(this, 'over')")
    todo.setAttribute('onmouseout', "changesBtn(this, 'out')")
    radio.setAttribute('class', 'radio')
    radio.setAttribute('onclick', 'toggleRadio(this)')
    input.setAttribute('id', 'todoItem')
    input.setAttribute('class', 'todoItem')
    input.setAttribute('type', 'text')
    input.setAttribute('disabled', 'true')
    input.setAttribute('value', userTodo.value)
    edits.setAttribute('id', 'edits')
    edits.setAttribute('class', 'edits')
    img1.setAttribute('id', 'editBtn')
    img1.setAttribute('src', './images/icon-pencil.svg')
    img1.setAttribute('width', '20px')
    img1.setAttribute('onclick', 'runEdit(this)')
    img2.setAttribute('id', 'delBtn')
    img2.setAttribute('src', './images/icon-cross.svg')
    img2.setAttribute('width', '26px')
    img2.setAttribute('onclick', 'del(this)')
    radioP.appendChild(radio)
    edits.appendChild(img1)
    edits.appendChild(img2)
    todo.appendChild(radioP)
    todo.appendChild(input)
    todo.appendChild(edits)
    userTodo.value = ""
    todoContainer.insertBefore(todo, todoContainer.firstChild)
    var left = todoContainer.children.length
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


