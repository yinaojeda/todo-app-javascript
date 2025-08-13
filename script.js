// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a task
function addTask(taskText, completed = false) {
    const text = taskText !== undefined ? taskText : taskInput.value.trim();

    if (!text) {
        if (taskText === undefined) {
            // only alert if user tried to add empty input
            alert("Please enter a task!");
        }
        return;
    }

    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = text;

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.style.marginRight = "10px";

    // Update completed state when checkbox is clicked
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = (e) => {
        e.stopPropagation(); // prevent click from toggling
        li.remove();
        saveTasks();
    };

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    if (completed) li.classList.add("completed");

    taskList.appendChild(li);

    if (taskText === undefined) taskInput.value = "";

    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        // Remove the ❌ text before saving
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTask(task.text, task.completed);
    });
}

// Event listener for button click
addTaskBtn.addEventListener("click", () => addTask());

// Event listener for pressing "Enter"
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
// ✅ Load saved tasks when page loads
window.addEventListener("load", loadTasks);
