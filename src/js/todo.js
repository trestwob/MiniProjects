document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('input-button');
    const taskInput = document.getElementById('todo-input');
    const taskInputDate = document.getElementById('date-input');
    const taskList = document.getElementById('todo-list');
    

    //load the tasks and call createlement to provide the classnames
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];
        tasks.forEach(taskText => {
            const taskElement = createTaskElement(taskText.taskName, taskText.taskDate);
            taskList.appendChild(taskElement);
        })
    }
    //saves the task under two variables of the classnames
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            taskName = li.querySelector('.task-name').textContent.trim();
            taskDate = li.querySelector('.task-due-date').textContent.trim();
            tasks.push({taskName, taskDate});
        });

        localStorage.setItem('tasklist', JSON.stringify(tasks));
    } 

    // create two spam within li
    function createTaskElement(taskText, taskDueDate) {
        const li = document.createElement('li');
        //add span here 

        const taskName = document.createElement('span');
        taskName.className = 'task-name';
        taskName.textContent = taskText;

        const taskDate = document.createElement('span');
        taskDate.className = 'task-due-date';
        taskDate.textContent = taskDueDate;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });
        li.appendChild(taskName);
        li.appendChild(taskDate);
        li.appendChild(deleteBtn);
        return li;
    }
    

    // create element with two variables 
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDate = taskInputDate.value.trim();
        if (taskText !== '') {
            const taskElement = createTaskElement(taskText, taskDate);
            taskList.appendChild(taskElement);
            taskInput.value = '';
            taskInputDate.value = '';
            saveTasks();
        }
    });
    //enter key creates the elements again, same as previous
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    loadTasks();
});
