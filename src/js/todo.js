document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('input-button');
    const taskInput = document.getElementById('todo-input');
    const taskInputDate = document.getElementById('date-input');
    const taskList = document.getElementById('todo-list');
    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];
        tasks.forEach(taskText => {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
        })
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent.replace('Delete', '').trim());
        });
        localStorage.setItem('tasklist', JSON.stringify(tasks));
    } 


    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        return li;
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = `${taskInput.value.trim() + " -> Due date: " + taskInputDate.value.trim()}`;
        if (taskText !== '') {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            taskInput.value = '';
            taskInputDate.value = '';
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    loadTasks();
});
