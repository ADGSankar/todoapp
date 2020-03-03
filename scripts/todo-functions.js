'use strict'
const getTodoData = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }

}

const setTodos = (Todos) => {
    localStorage.setItem('todos', JSON.stringify(Todos))
}

const filterTodos = (Todos, filters) => {
    const filteredTodos = Todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !(filters.hideCompleted && todo.completed))

    renderTodos(filteredTodos)
}

const toggleTodo = (id) => {
    const todo = Todos.find((todo) => todo.id == id)
    if (todo) {
        todo.completed = !todo.completed
    }
}

const removeTodo = (id) => {
    const todoIndex = Todos.findIndex((todo) => todo.id == id)
    if (todoIndex != -1) {
        Todos.splice(todoIndex, 1)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        setTodos(Todos)
        filterTodos(Todos, filters)
    })

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent = 'remove'
    removeButton.classList.add('button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        setTodos(Todos)
        filterTodos(Todos, filters)

    })

    return todoEl
}

const generateSummaryDOM = (count) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.textContent = `You have ${count} ` + (count === 1 ? 'todo' : 'todos') + ' left'
    return summary
}

const renderTodos = (Todos) => {

    const todoEl = document.querySelector('#todos')
    todoEl.innerHTML = ''

    let count = 0
    // console.log(typeof (Todos))
    Todos.forEach((todo) => {
        if (!todo.completed)
            count++
    })
    // debugger
    todoEl.appendChild(generateSummaryDOM(count))
    if (Todos.length > 0) {
        Todos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyEl = document.createElement('p')
        emptyEl.classList.add('empty-message')
        emptyEl.textContent = 'No todos to show.'
        todoEl.appendChild(emptyEl)
    }
}