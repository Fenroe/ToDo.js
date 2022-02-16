ToDo.JS v1.0.0

# overview 
ToDo.js is a basic to-do list web app that allows users to add tasks to a default group, order tasks in that default group based on date or status, create new groups to contain projects, and set tasks to complete or delete them. 

User session data is saved to local storage. These functions are handled by the storage object. 

The data object manages the pages HTML content. It relies on the data-fns module for certain methods. 

Tasks are stored in the task object and projects and list names are stored in the categories object. 