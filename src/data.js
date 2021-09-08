import { isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns'


const data = (() => {

    let projectsMenuContents = ``;

    let listsMenuContents = ``;

    let tvMenuContents = ``;

    let tvTitle = ``;

    // used to set default value for date input

    const getTheDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = `0${date.getMonth()+1}`;
        let day = ``;
        if (date.getDate() < 10) {
            day = `0${date.getDate()}`;
        } else {
            day = date.getDate();
        }
        return `${year}-${month}-${day}`;
    }

    const getNavForm = id => `
        <div class="nb-add-item-container nb-add-${id} nb-hide">
            <input class="add-category-input" type="text" id=${id}>
            <div class="nb-buttons-container">
                <button class="add-category nb-button" id="add-${id}">Submit</button>
                <button class="add-category-cancel nb-button nb-toggle" id="cancel-${id}" data-index="${id}">Cancel</button>
            </div>
        </div>`

    const fillProjectsMenu = projects => {
        projectsMenuContents = ``;
        projects.forEach(item => {
            projectsMenuContents += `
            <li class="nb-item">
                <span class="category-span" data-index="${item}">${item}</span>
                <i class="fas fa-trash remove-category-span" data-parent="projects" data-index ="${item}"></i>
            </li>`
        }) 
    }

    const fillListsMenu = lists => {
        listsMenuContents = ``;
        lists.forEach(item => {
            listsMenuContents += `
            <li class="nb-item">
                <span class="category-span" data-index="${item}">${item}</span>
                <i class="fas fa-trash remove-category-span" data-parent="lists" data-index ="${item}"></i>
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
                    tasks = tasks.filter(task => {
                        if (!task.completed) {
                            return task;
                        }
                    })
                    break;
                case `Today`:
                    tasks = tasks.filter(task => {
                        if (!task.completed && isToday(parseISO(task.date))) {
                            return task;
                        }
                    })
                    break;
                case `Tomorrow`:
                    tasks = tasks.filter(task => {
                        if (!task.completed && isTomorrow(parseISO(task.date))) {
                            return task;
                        }
                    })

                case `This Week`:
                    tasks = tasks.filter(task => {
                        if (!task.completed && isThisWeek(parseISO(task.date))) {
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
        } else {
            tasks = tasks.filter(task => {
                if (!task.completed) {
                    return task;
                }
            })
        }
        tasks.forEach(task => {
            let dateObj = new Date(task.date);
            let taskDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`
            tvMenuContents += `
            <li class ="tv-item">
            <div class="tv-item-half">
            <i class="fas fa-circle tv-task-complete-icon" data-index="${task.name}"></i>
            <span class="tv-task-name-span" data-index="${task.name}">${task.name}</span>
            </div>
            <div class="tv-item-half">
            <span class="tv-task-date-span">${taskDate}</span>
            <i class="fas fa-trash tv-task-remove-span" data-index="${task.name}"></i>
            </div>
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
            <i class="fas fa-plus nb-add-item-icon nb-toggle" data-index="project"></i>
            <span class=nb-add-item-span>New Project</span> 
        </div>
        ${getNavForm(`project`)}
    </div>
    <div class="navbar-lists">
        <h2 class="nb-title">Lists</h2>
        <ul class="nb-menu">${listsMenuContents}</ul>
        <div class=nb-add-item>
        <i class="fas fa-plus nb-add-item-icon nb-toggle" data-index="list"></i>
        <span class=nb-add-item-span>New List</span> 
        </div>
        ${getNavForm(`list`)}
    </div>`

    const getTvContents = () => `
        <div class="task-view">
            <h2 class="tv-title">${tvTitle}</h2>
            <ul class="tv-menu">${tvMenuContents}</ul>
            <div class=tv-add-item>
                <i class="fas fa-plus tv-add-task-icon tv-toggle"></i>
                <span class=tv-add-task-span>New Task</span> 
            </div>
            <div class="tv-add-task tv-hide">
                <input class="tv-input" id="task-name" type="text">
                <input class="tv-input" id="task-date" type="date" value="${getTheDate()}">
                <div class="tv-buttons-container">
                <button class="tv-button" id="add-task">Submit</button>
                <button class="tv-button tv-toggle"">Cancel</button>
                </div>
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