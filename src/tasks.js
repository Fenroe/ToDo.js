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

    const removeTask = removedTask => {
        index = tasks.indexOf(removedTask);
        tasks.splice(index, 1);
    }

    const clearTasks = () => tasks = [];

    return {
        getTasks,
        setTasks,
        newTask,
        removeTask,
        clearTasks
    }
})()

export {
    tasks
}