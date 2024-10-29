// Fetch all tasks and display them in the table
async function loadTasks() {
    const response = await fetch('/task');
    const tasks = await response.json();
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = ''; // Clear existing rows

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.priority}', '${task.status}')">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
}

// Handle form submission to add or update a task
document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const taskId = document.getElementById('taskId').value;

    if (taskId) {
        // Update the existing task
        await fetch(`/task/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority, status: "Pending" }) // Ensure status is included
        });
    } else {
        // Create a new task
        await fetch('/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority })
        });
    }

    loadTasks(); // Reload tasks
    event.target.reset(); // Clear the form
    document.getElementById('taskId').value = ''; // Reset the hidden task ID field
});

// Edit a task (fill the form with task data for updating)
function editTask(id, title, description, priority, status) {
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('priority').value = priority;
    document.getElementById('taskId').value = id; // Set task ID for update
}

// Delete a task
async function deleteTask(id) {
    await fetch(`/task/${id}`, { method: 'DELETE' });
    loadTasks();
}

// Initial load of tasks
loadTasks();
