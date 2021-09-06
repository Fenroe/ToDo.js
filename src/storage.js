const storage = (() => {

    const storeProjects = projects => localStorage.setItem(`projects`, JSON.stringify(projects));

    const storeLists = lists => localStorage.setItem(`lists`, JSON.stringify(lists));

    const storeTasks = tasks => localStorage.setItem(`tasks`, JSON.stringify(tasks));

    const getProjects = () => JSON.parse(localStorage.getItem(`projects`) || `[]`);

    const getLists = () => JSON.parse(localStorage.getItem(`lists`) || `[]`);

    const getTasks = () => JSON.parse(localStorage.getItem(`tasks`) || `[]`);

    return {
        storeProjects,
        storeLists,
        storeTasks,
        getProjects,
        getLists,
        getTasks
    }

})()

export {
    storage
}