class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.notes = "";
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
    }
}

const Storage = {
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