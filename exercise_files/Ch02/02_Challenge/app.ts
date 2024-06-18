interface ToDoItem {
    id: number,
    title: string,
    status: ToDoItemStatus,
    completedOn?: Date,
}

enum ToDoItemStatus {
    ToDo = "todo",
    InProgress = "in-progress",
    Done = "done"
}

const todoItems: ToDoItem[] = [
    { id: 1, title: "Learn HTML", status: ToDoItemStatus.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: ToDoItemStatus.InProgress },
    { id: 3, title: "Write the best app in the world", status: ToDoItemStatus.ToDo },
]

function addTodoItem(todo: string): ToDoItem {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: ToDoItemStatus.ToDo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId<T extends {id: number}>(items: T[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
