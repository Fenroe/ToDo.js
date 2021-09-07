import { data } from "./data";
import { categories } from "./categories";
import { tasks } from "./tasks";
import { storage } from "./storage";

const ui = (() => {

    const formatText = text => {
        text = text.split(` `);
        console.log(text);
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i][0].toUpperCase() + text[i].substring(1);
        }
        return text.join(` `);
    }

    let currentCategory = `ToDo`;

    let currentSpan = `All`;

    const loader = (parent, contents) => parent.innerHTML = contents;

    const header = document.getElementById(`header`);

    const nav = document.getElementById(`nav`);

    const taskView = document.getElementById(`task-view`);

    const addProject = () => {
        let newProject = document.getElementById(`project`).value;
        newProject = formatText(newProject);
        if (!newProject) {
            return;
        } else if (categories.getProjects().includes(newProject) || categories.getLists().includes(newProject)) {
            return;
        } else {
            categories.addProject(newProject);
            storage.storeProjects(categories.getProjects());
            loadNav();
        }
    }

    const removeProject = removedProject => {
        categories.removeProject(removedProject);
        storage.storeProjects(categories.getProjects());
        loadNav();
    }

    const removeList = removedList => {
        categories.removeList(removedList);
        storage.storeLists(categories.getLists());
        loadNav();
    }

    const removeTask = removedTaskName => {
        tasks.removeTask(removedTaskName);
        storage.storeTasks(tasks.getTasks());
        loadTaskView();
    }

    const initRemoveTask = () => {
        document.querySelectorAll(`.tv-task-remove-span`).forEach(button => {
            button.addEventListener(`click`, () => {
                removeTask(button.dataset.index.replace(`remove`, ``));
            })
        })
    }

    const initRemoveCategory = () => {
        document.querySelectorAll(`.remove-category-span`).forEach(button => {
            button.addEventListener(`click`, () => {
                if (button.dataset.parent === `projects`) {
                    console.log(button.dataset.index);
                    removeProject(button.dataset.index.replace(`remove `, ``));
                }
                if (button.dataset.parent === `lists`) {
                    console.log(button.dataset.index);
                    removeList(button.dataset.index.replace(`remove `, ``));
                }
            })
        })
    }

    const addList = () => {
        let newList = document.getElementById(`list`).value;
        newList = formatText(newList);
        if (!newList) {
            return;
        } else if (categories.getProjects().includes(newList) || categories.getLists().includes(newList)) {
            return;
        } else {
            categories.addList(newList);
            storage.storeLists(categories.getLists());
            loadNav();
        }
    }

    const addTask = () => {
        let newTaskName = document.getElementById(`task-name`).value;
        newTaskName = formatText(newTaskName);
        let newTaskDate = document.getElementById(`task-date`).value;
        let newTaskCategory = currentCategory;
        if (!newTaskName || !newTaskDate) {
            return;
        }
        tasks.newTask(newTaskName, newTaskDate, newTaskCategory);
        storage.storeTasks(tasks.getTasks());
        loadTaskView();
    }

    const setCurrentCategory = newCategory => currentCategory = newCategory;

    const setCurrentSpan = newSpan => currentSpan = newSpan;

    const initSelectCategory = () => {
        document.querySelectorAll(`.category-span`).forEach(element => {
            element.addEventListener(`click`, () => {
                setCurrentCategory(element.dataset.index);
                setCurrentSpan(element.textContent);
                loadTaskView();
            })
        })
    }

    const initAddTask = () => {
        document.getElementById(`add-task`).addEventListener(`click`, () => addTask());
    }

    const initAddProject = () => {
        document.getElementById(`add-project`).addEventListener(`click`, () => addProject());
    }

    const initAddList = () => {
        document.getElementById(`add-list`).addEventListener(`click`, () => addList());
    }

    const initNavButtons = () => {
        initAddProject();
        initAddList();
        initSelectCategory();
        initRemoveCategory();
    }

    const initTaskViewButtons = () => {
        initAddTask();
        initRemoveTask();
    }

    const loadHeader = () => loader(header, data.getHeaderContents());

    const loadNav = () => {
        data.fillProjectsMenu(categories.getProjects());
        data.fillListsMenu(categories.getLists());
        loader(nav, data.getNavContents());
        initNavButtons();
    }

    const loadTaskView = () => {
        data.fillTvMenu(tasks.getTasks(), currentCategory, currentSpan);
        data.setTvTitle(currentCategory);
        loader(taskView, data.getTvContents());
        initTaskViewButtons();
    }

    const retrieveStorage = () => {
        categories.setProjects(storage.getProjects());
        categories.setLists(storage.getLists());
        tasks.setTasks(storage.getTasks());
    }

    const checkCategory = () => {
        if (!categories.getProjects().includes(currentCategory) && !categories.getLists().includes(currentCategory)) {
            setCurrentCategory(`ToDo`);
        }
    }


    return {
        loadHeader,
        loadNav,
        loadTaskView,
        retrieveStorage
    }
})()

export {
    ui
}


