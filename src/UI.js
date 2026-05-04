import { App } from "./App.js";
import { Todo } from "./Todo.js";

export const UI = {

    currentProjectId: null,
    currentTodoId: null,

    init() {
        document.getElementById("add-todo-btn").addEventListener("click", () => {
            if(UI.currentProjectId) {
                UI.currentTodoId = null;
                UI.openModal();
            }
        });

        document.getElementById("close-modal-btn").addEventListener("click", () => UI.closeModal());

        document.getElementById("todo-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if(UI.currentTodoId) {
                UI.handleEditTodo(UI.currentProjectId, UI.currentTodoId);
            } else {
                UI.handleAddTodo(UI.currentProjectId);
            }
        });

        document.getElementById("add-project-btn").addEventListener("click", () => {
            const name = prompt("Enter project name:");
            if (name) {
                App.addProject(name);
                UI.renderProjects();
            }
        })
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

    handleEditTodo(projectId, todoId) {
        const updatedData = {
            title: document.getElementById("todo-title").value,
            description: document.getElementById("todo-description").value,
            dueDate: document.getElementById("todo-due-date").value,
            priority: document.getElementById("todo-priority").value,
            notes: document.getElementById("todo-notes").value,
        };

        App.updateTodo(projectId, todoId, updatedData);
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

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();

                if(App.projects.length == 1) {
                    alert("You need atleast one project!");
                    return;
                }

                App.removeProject(project.id);

                if (UI.currentProjectId == project.id) {
                    UI.currentProjectId = null;
                    document.getElementById("project-title").textContent = "Select a Project";
                    document.getElementById("todo-list").innerHTML = "";
                }
                UI.renderProjects();
            });

            li.appendChild(deleteBtn);  
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
            li.classList.add(`priority-${todo.priority}`);

            const title = document.createElement("span");
            title.textContent = todo.title;

            const date = document.createElement("span");
            date.textContent = todo.dueDate;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                App.removeTodo(projectId, todo.id);
                UI.renderTodos(projectId);
            })

            li.appendChild(title);
            li.appendChild(date);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            li.addEventListener("click", () => {
                UI.currentTodoId = todo.id;
                UI.openModal(todo);
            })
        })
    },

    openModal(todo = null) {
        const overlay = document.getElementById("modal-overlay");
        const modalTitle = document.getElementById("modal-title");
        overlay.classList.add("active");

        if(todo) {
            modalTitle.textContent = "Edit Todo";
            document.getElementById("todo-title").value = todo.title;
            document.getElementById("todo-description").value = todo.description;
            document.getElementById("todo-due-date").value = todo.dueDate;
            document.getElementById("todo-priority").value = todo.priority;
            document.getElementById("todo-notes").value = todo.notes;
        } else {
            modalTitle.textContent = "Add Todo";
            document.getElementById("todo-form").reset();
        }
    },

    closeModal() {
        const overlay = document.getElementById("modal-overlay");
        overlay.classList.remove("active");
        document.getElementById("todo-form").reset();
        UI.currentTodoId = null;
    }
}