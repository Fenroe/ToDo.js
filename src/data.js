import { isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns'


const data = (() => {

    // This object contains information about the html of the page

    let projectsMenuContents = ``;

    let listsMenuContents = ``;

    let tvMenuContents = ``;

    let tvTitle = ``;

    const getNavForm = id => `
        <div>
            <label></label>
            <input type="text" id=${id}>
            <button id="add-${id}">Submit</button>
        </div>`

    const fillProjectsMenu = projects => {
        if (projects.length < 1) {
            return;
        } else {
            projectsMenuContents = ``;
            projects.forEach(item => {
                projectsMenuContents += `
                <li>
                    <span class="category-span" data-index="${item}">${item}</span>
                </li>`
            })
        }
    }

    const fillListsMenu = lists => {
        if (lists.length < 1) {
            return;
        } else {
            listsMenuContents = ``;
            lists.forEach(item => {
                listsMenuContents += `
                <li>
                    <span class="category-span" data-index="${item}">${item}</span>
                </li>`
            })
        }
    }

    const fillTvMenu = (tasks, category, spanText) => {
        if (tasks.length < 1) {
            return;
        } else {
            tvMenuContents = ``;
            tasks = tasks.filter(task => {
                if (task.category === category) {
                    return task;
                }
            })
            if (category === `todo`) {
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
                <span>${task.name}</span>
                <span>${taskDate}</span>
                </li>`
            })
        }
    }

    const setTvTitle = title => tvTitle = title;

    const getHeaderContents = () =>  `
    <div class="logo">
        <h1 class="logo-text">
            ToDo.js
        </h1>
    </div>
        <button class="mobile-menu">
            <img src="" alt="">
        </button>`

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
        <h2 class="nb-projects-title">Projects</h2>
        <ul class="nb-projects-menu">${projectsMenuContents}</ul>
        <div class=nb-projects-add-item>
            <i></i>
            <span class=nb-projects-add-item-span>New Project</span> 
        </div>
        ${getNavForm(`project`)}
    </div>
    <div class="navbar-lists">
        <h2 class="nb-lists-title">Lists</h2>
        <ul class="nb-lists-menu">${listsMenuContents}</ul>
        <div class=nb-lists-add-item>
        <i></i>
        <span class=nb-lists-add-item-span>New List</span> 
        </div>
        ${getNavForm(`list`)}
    </div>`

    const getTvContents = () => `
        <div class="task-view">
            <h2 class="tv-title">${tvTitle}</h2>
            <ul class="tv-menu">${tvMenuContents}</ul>
            <div class=nb-lists-add-item>
                <span class=nb-lists-add-item-span>New Task</span> 
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