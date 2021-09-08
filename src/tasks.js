const tasks = (() => {

    const task = (name, date, category, completed=false) => {

       /* const getName = () => name;

        const setName = newName => name = newName;

        const getDate = () => date;

        const setDate = newDate => date = newDate;

        const getCategory = () => category;

        const setCategory = newCategory => category = newCategory;

        const isCompleted = () => completed;

        const setCompleted = () => {
            if (completed === false) {
                completed = true;
            } else {
                completed = false;
            }
        } */

        return {
            name,
            date,
            category,
            completed
        }
    }

    let tasks = [];

    const getTasks = () => {
        if (Array.isArray(tasks)) {
            return tasks;
        } else {
            return [tasks];
        }
    }

    const setTasks = newTasks => tasks = newTasks;

    const newTask = (name, date, category) => {
        let newTask = task(name, date, category);
        tasks.push(newTask);
    }

    const removeTask = removedTaskName => {
        let index = tasks.findIndex(task => task.name === removedTaskName);
        tasks.splice(index, 1);
    }

    const clearTasks = () => tasks = [];

    const cleanTasks = () => {
        tasks.forEach(task => {
            if (task.category != `ToDo` && task.completed) {
                removeTask(task);
            }
        })
    }

    return {
        getTasks,
        setTasks,
        newTask,
        removeTask,
        clearTasks,
        cleanTasks
    }
})()

export {
    tasks
}