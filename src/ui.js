import { data } from "./data";
import { categories } from "./categories";
import { tasks } from "./tasks";
import { storage } from "./storage";

const ui = (() => {

    const formatText = text => {
        
        text = text.split(` `);
        console.log(text);
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i][0].toUpperCase() + text[i].substring(1).toLowerCase();
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
        tasks.cleanTasks();
        storage.storeTasks(tasks.getTasks());
        loadTaskView();
    }

    const toggleNav = () => {
        document.getElementById(`nav`).classList.toggle(`nb-hide`);
    }

    const initToggleNav = () => {
        document.querySelector(`.header-menu`).addEventListener(`click`, () => {
            toggleNav();
        })
    }

    const initRemoveTask = () => {
        document.querySelectorAll(`.tv-task-remove-span`).forEach(button => {
            button.addEventListener(`click`, () => {
                removeTask(button.dataset.index.replace());
            })
        })
    }

    const initRemoveCategory = () => {
        document.querySelectorAll(`.remove-category-span`).forEach(button => {
            button.addEventListener(`click`, () => {
                if (button.dataset.parent === `projects`) {
                    removeProject(button.dataset.index);
                }
                if (button.dataset.parent === `lists`) {
                    removeList(button.dataset.index);
                }
            })
        })
    }

    const setToComplete = completeTask => {
        tasks.getTasks().forEach(task => {
            if (task.name === completeTask) {
                if (!task.completed) {
                    task.completed = true;
                } else {
                    task.completed = false;
                }
                
            }
        })
        storage.storeTasks(tasks.getTasks());
        loadTaskView();
    }

    const initSetToComplete = () => {
        document.querySelectorAll(`.tv-task-complete-icon`).forEach(element => {
            element.addEventListener(`click`, () => {
                setToComplete(element.dataset.index);
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
        tasks.cleanTasks();
        storage.storeTasks(tasks.getTasks());
        loadTaskView();
    }

    const setCurrentCategory = newCategory => currentCategory = newCategory;

    const setCurrentSpan = newSpan => currentSpan = newSpan;

    const toggleAddCategory = id => {
        document.querySelector(`.nb-add-${id}`).classList.toggle(`nb-hide`);
    }

    const toggleAddTask = () => {
        document.querySelector(`.tv-add-task`).classList.toggle(`tv-hide`);
    }

    const initToggleAddTask = () => {
        document.querySelectorAll(`.tv-toggle`).forEach(element => {
            element.addEventListener(`click`, () => {
                console.log(`click`);
                toggleAddTask();
            })
        })
    }

    const initShowAddCategory = () => {
        document.querySelectorAll(`.nb-toggle`).forEach(element => {
            element.addEventListener(`click`, () => {
                console.log(`click`);
                toggleAddCategory(element.dataset.index);
            })
        })
    }

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

    const initHeaderButtons = () => {
        initToggleNav();
    }

    const initNavButtons = () => {
        initAddProject();
        initAddList();
        initSelectCategory();
        initRemoveCategory();
        initShowAddCategory();
    }

    const initTaskViewButtons = () => {
        initAddTask();
        initSetToComplete();
        initRemoveTask();
        initToggleAddTask();
    }

    const loadHeader = () => {
        loader(header, data.getHeaderContents());
        initHeaderButtons();
    }

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


