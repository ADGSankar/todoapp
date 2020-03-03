'use strict'
// const Todos = [{
//         text: 'Order cat food',
//         completed: false
//     },
//     {
//         text: 'Clean kitchen',
//         completed: true
//     },
//     {
//         text: 'Buy food',
//         completed: false
//     },
//     {
//         text: 'Do work',
//         completed: true
//     },
//     {
//         text: 'Do excercise',
//         completed: false
//     }
// ]
const Todos = getTodoData()



const filters = {
    searchText: '',
    hideCompleted: false
}




renderTodos(Todos)


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    filterTodos(Todos, filters)
})


document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()

    let text = e.target.elements.newTodo.value.trim()
    if (text.length > 0) {
        Todos.push({
            id: uuidv4(),
            text: text,
            completed: false
        })
        setTodos(Todos)
        e.target.elements.newTodo.value = ''
        console.log(filters.hideCompleted)
        filterTodos(Todos, filters)
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    filterTodos(Todos, filters)
})



// const ps = document.querySelectorAll('p')
// ps.forEach(function (p) {
//     if (p.textContent.toLowerCase().includes('the'))
//         p.remove()
// })