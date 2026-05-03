import { Project } from "./Project.js";
import { Storage } from "./Storage.js";

export const App = {
    projects: [],

    init() {
        this.projects = Storage.loadProjects();
        if(this.projects.length == 0) {
            this.addProject("Default");
        }
    },

    addProject(name) {
        this.projects.push(new Project(name));
        Storage.saveProjects(this.projects);
    },

    removeProject(id) {
        this.projects = this.projects.filter(project => project.id != id);
        Storage.saveProjects(this.projects);
    },

    getProject(id) {
        return this.projects.find(project => project.id === id);
    },

    addTodo(projectId, todo) {
        const project = this.getProject(projectId);
        project.addTodo(todo);
        Storage.saveProjects(this.projects);
    },

    removeTodo(projectId, todoId) {
        const project = this.getProject(projectId);
        project.removeTodo(todoId);
        Storage.saveProjects(this.projects);
    },

    updateTodo(projectId, todoId, updatedData) {
        const project = this.getProject(projectId);
        const todo = project.todos.find(todo => todo.id == todoId);
        Object.assign(todo, updatedData);
        Storage.saveProjects(this.projects);
    }
}