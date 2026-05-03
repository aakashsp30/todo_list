import { App } from "./App.js";
import { Todo } from "./Todo.js";

export const UI = {

    currentProjectId: null,

    init() {
        document.getElementById("add-todo-btn").addEventListener("click", () => {
            if(UI.currentProjectId) {
                UI.openModal(UI.currentProjectId);
            }
        });

        document.getElementById("close-modal-btn").addEventListener("click", () => UI.closeModal());

        document.getElementById("todo-form").addEventListener("submit", (e) => {
            e.preventDefault();
            UI.handleAddTodo(UI.currentProjectId);
        });
    },

    handleAddTodo(projectId) {
        const title = document.getElementById("todo-title").value;
        const description = document.getElementById("todo-description").value;
        const dueDate = document.getElementById("todo-due-date").value;
        const priority = document.getElementById("todo-priority").value;
        const notes = document.getElementById("todo-notes").value;

        const todo = new Todo(title, description, dueDate, priority);
        todo.notes = notes;

        App.addTodo(projectId, todo);

        UI.closeModal();
        UI.renderTodos(projectId);
    },

    renderProjects() {
        const projectList = document.getElementById("project-list");
        projectList.innerHTML = "";

        App.projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project.name;
            li.dataset.id = project.id;
            li.addEventListener("click", () => {
                UI.currentProjectId = project.id;
                UI.renderTodos(project.id);
            });
            projectList.appendChild(li);
        });
    },

    renderTodos(projectId) {
        const todoList = document.getElementById("todo-list");
        const projectTitle = document.getElementById("project-title");
        todoList.innerHTML = "";

        const project = App.getProject(projectId);
        projectTitle.textContent = project.name;

        project.todos.forEach(todo => {
            const li = document.createElement("li");
            li.dataset.id = todo.id;

            const title = document.createElement("span");
            title.textContent = todo.title;

            const date = document.createElement("span");
            date.textContent = todo.dueDate;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                App.removeTodo(projectId, todo.id);
                UI.renderTodos(projectId);
            })

            li.appendChild(title);
            li.appendChild(date);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        })
    },

    openModal() {
        const overlay = document.getElementById("modal-overlay");
        overlay.classList.add("active");
    },

    closeModal() {
        const overlay = document.getElementById("modal-overlay");
        overlay.classList.remove("active");
        document.getElementById("todo-form").reset();
    }
}