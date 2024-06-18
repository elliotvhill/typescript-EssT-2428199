interface Item {
    id: number,
    title: string,
    status: ItemStatus,
    completedOn?: Date,
}

enum ItemStatus {
    ToDo = "todo",
    InProgress = "in-progress",
    Done = "done"
}

const todoItems = [
    { id: 1, title: "Learn HTML", status: ItemStatus.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: ItemStatus.InProgress },
    { id: 3, title: "Write the best app in the world", status: ItemStatus.ToDo },
]

function addTodoItem(todo: string): Item {
    const id: number = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: ItemStatus.ToDo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId(items) {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
