import { Todo } from "./Todo.js";
import { Project } from "./Project.js";

export const Storage = {
    saveProjects(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    },

    loadProjects() {
        const data = localStorage.getItem("projects");
        if (!data) return [];

        const parsed = JSON.parse(data);

        return parsed.map(projectData => {
            const project = new Project(projectData.name);
            project.id = projectData.id;
            project.todos = projectData.todos.map(todoData => {
                return Object.assign(new Todo(), todoData);
            });
            return project;
        });
    }
}