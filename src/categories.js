const categories = (() => {

    let projects = [];

    const getProjects = () => {
        if (Array.isArray(projects)) {
            return projects;
        } else {
            return [projects];
        }
    }

    const setProjects = newProjects => projects = newProjects;

    const addProject = newProject => projects.push(newProject);

    const removeProject = removedProject => {
        index = projects.indexOf(removedProject);
        projects.splice(index, 1);
    }

    const clearProjects = () => projects = [];

    let lists = [];

    const getLists = () => {
        if (Array.isArray(lists)) {
            return lists;
        } else {
            return [lists];
        }
    }

    const setLists = newLists => lists = newLists;

    const addList = newList => lists.push(newList);

    const removeList = removedList => {
        index = lists.indexOf(removedList);
        lists.splice(index, 1);
    }

    const clearLists = () => lists = [];

    return {
        getProjects,
        setProjects,
        addProject,
        removeProject,
        clearProjects,
        getLists,
        setLists,
        addList,
        removeList,
        clearLists
    }
})()

export {
    categories
}