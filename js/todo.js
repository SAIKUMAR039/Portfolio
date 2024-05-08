const taskForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = taskInput.value;
  if (task !== '') {
    addTaskToList(task);
    taskInput.value = '';
  }
});

function addTaskToList(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task">${task}</span>
    <button class="delete-btn">Delete</button>
  `;
  taskList.appendChild(li);
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });
}