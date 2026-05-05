import "./style.css"
import { App } from "./App.js";
import { UI } from "./UI.js";

App.init();
UI.init();

if(App.projects.length > 0) {
    UI.currentProjectId = App.projects[0].id;
}

UI.renderProjects();
UI.renderTodos(App.projects[0].id);