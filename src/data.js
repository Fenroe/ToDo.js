import { isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns'


const data = (() => {

    let projectsMenuContents = ``;

    let listsMenuContents = ``;

    let tvMenuContents = ``;

    let tvTitle = ``;

    const getNavForm = id => `
        <div>
            <input class="add-category-input" type="text" id=${id}>
            <div class="nb-buttons-container">
                <button class="add-category nb-button" id="add-${id}">Submit</button>
                <button class="add-category-cancel nb-button" id="cancel-${id}">Cancel</button>
            </div>
        </div>`

    const fillProjectsMenu = projects => {
        projectsMenuContents = ``;
        projects.forEach(item => {
            projectsMenuContents += `
            <li class="nb-item">
                <span class="category-span" data-index="${item}">${item}</span>
                <span class="remove-category-span" data-parent="projects" data-index ="remove ${item}">Remove</span>
            </li class="nb-item>`
        }) 
    }

    const fillListsMenu = lists => {
        listsMenuContents = ``;
        lists.forEach(item => {
            listsMenuContents += `
            <li>
                <span class="category-span" data-index="${item}">${item}</span>
                <span class="remove-category-span" data-parent="lists" data-index ="remove ${item}">Remove</span>
            </li>`
        })
    }

    const fillTvMenu = (tasks, category, spanText) => {
        tvMenuContents = ``;
        tasks = tasks.filter(task => {
            if (task.category === category) {
                return task;
            }
        })
        if (category === `ToDo`) {
            console.log(`category is right`);
            switch(spanText) {
                case `All`:
                    break;
                case `Today`:
                    tasks = tasks.filter(task => {
                        if (isToday(parseISO(task.date))) {
                            return task;
                        }
                    })
                    break;
                case `Tomorrow`:
                    tasks = tasks.filter(task => {
                        if (isTomorrow(parseISO(task.date))) {
                            return task;
                        }
                    })

                case `This Week`:
                    tasks = tasks.filter(task => {
                        if (isThisWeek(parseISO(task.date))) {
                            return task;
                        }
                    })
                    break;
                case `Completed`:
                    tasks = tasks.filter(task => {
                        if (task.completed) {
                            return task;
                        }
                    })
                    break;
            }
        }
        tasks.forEach(task => {
            let dateObj = new Date(task.date);
            let taskDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}`
            tvMenuContents += `
            <li>
            <span class="tv-task-name-span" data-index="${task.name}">${task.name}</span>
            <span class="tv-task-date-span">${taskDate}</span>
            <span class="tv-task-remove-span" data-index="remove ${task.name}">Remove</span>
            </li>`
        })     
    }

    const setTvTitle = title => tvTitle = title;

    const getHeaderContents = () =>  `
    <div class="logo">
        <i class="fas fa-sticky-note logo-icon"></i>
        <h1 class="logo-text">
            ToDo.js
        </h1>
    </div>
    <i class="fas fa-bars header-menu"></i>`

    const getNavContents = () => `
    <div class="nb-todo">
        <h2 class="nb-title">ToDo</h2>
        <ul class="nb-menu">
            <li class="nb-item">
                <span class="category-span" data-index="ToDo">All</span>
            </li>
            <li class="nb-item">
                <span class="category-span" data-index="ToDo">Today</span>
            </li>
            <li class="nb-item">
                <span class="category-span" data-index="ToDo">Tomorrow</span>
            </li>
            <li class="nb-item">
                <span class="category-span" data-index="ToDo">This Week</span>
            </li>
            <li class="nb-item">
                <span class="category-span" data-index="ToDo">Completed</span>
            </li>
        </ul>
    </div>
    <div class="nb-projects">
        <h2 class="nb-title">Projects</h2>
        <ul class="nb-menu">${projectsMenuContents}</ul>
        <div class=nb-add-item>
            <i class="fas fa-plus nb-add-item-icon"></i>
            <span class=nb-add-item-span>New Project</span> 
        </div>
        ${getNavForm(`project`)}
    </div>
    <div class="navbar-lists">
        <h2 class="nb-title">Lists</h2>
        <ul class="nb-menu">${listsMenuContents}</ul>
        <div class=nb-add-item>
        <i class="fas fa-plus nb-add-item-icon"></i>
        <span class=nb-add-item-span>New List</span> 
        </div>
        ${getNavForm(`list`)}
    </div>`

    const getTvContents = () => `
        <div class="task-view">
            <h2 class="tv-title">${tvTitle}</h2>
            <ul class="tv-menu">${tvMenuContents}</ul>
            <div class=tv-lists-add-item>
                <span class=tv-lists-add-item-span>New Task</span> 
            </div>
            <div>
                <label></label>
                <input id="task-name" type="text">
                <label></label>
                <input id="task-date" type="date">
                <button id="add-task">Submit</button>
            </div>
        </div>`
    
    return {
        getHeaderContents,
        getNavContents,
        fillProjectsMenu,
        fillListsMenu,
        getTvContents,
        fillTvMenu,
        setTvTitle
    }
})()

export {
    data
}