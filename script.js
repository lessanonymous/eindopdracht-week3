// get HTML elements
const todoList = document.querySelector('.todo-list');
const addTaskButton = document.querySelector('.add-task-button');
// helper functions
const createTaskElement = task => {
    const li = document.createElement('li');
    li.innerHTML = `<input class="done" type="checkbox" ${task.done ? 'checked' : ''}><span class="description ${task.done ? 'done' : ''}">${task.description}</span> <i class="fas fa-pencil-alt edit"></i> <i class="fas fa-trash-alt delete"></i>`;
    li.id = task.id;
    li.querySelector('.delete').addEventListener('click', removeTaskButtonClickHandler);
    li.querySelector('.done').addEventListener('change', doneCheckboxChangeHandler);
    li.querySelector('.edit').addEventListener('click', editTaskButtonClickHandler);
    return li;
};
const addTaskElementsToDOM = async () => {
    const data = await getData();
    if (data) {
        let elements = [];
        data.forEach(task => elements.push(createTaskElement(task)));
        elements.forEach(element => todoList.appendChild(element));
    }
};
// event handlers
const AddTaskButtonClickHandler = async e => {
    const descriptionField = document.querySelector('.new-task-description');
    if (descriptionField.value) {
        const task = {
            description: descriptionField.value,
            done: false
        };
        const post = await postData(task);
        task.id = post.name;
        descriptionField.value = '';
        todoList.appendChild(createTaskElement(task));
    }
};
const removeTaskButtonClickHandler = e => {
    const taskElement = e.target.parentElement;
    const id = taskElement.id;
    deleteData(id);
    todoList.removeChild(taskElement);
};
const doneCheckboxChangeHandler = e => {
    const taskElement = e.target.parentElement;
    const id = taskElement.id;
    const description = taskElement.querySelector('.description');
    const task = {
        description: description.textContent,
        done: e.target.checked
    };
    putData(id, task);
    task.done ? description.classList.add('done') : description.classList.remove('done');
};
const editTaskButtonClickHandler = async e => {
    const taskElement = e.target.parentElement;
    const deleteButton = taskElement.querySelector('.delete');
    const cancelButton = document.createElement('i');
    const description = taskElement.querySelector('.description');
    const descriptionInputField = document.createElement('input');
    descriptionInputField.value = description.textContent;
    descriptionInputField.className = 'description';
    cancelButton.className = 'fas fa-window-close cancel';
    cancelButton.addEventListener('click', cancelButtonClickHandler);
    const saveButton = document.createElement('i');
    saveButton.className = 'fas fa-save save';
    saveButton.addEventListener('click', saveTaskButtonClickHandler);
    taskElement.replaceChild(saveButton, e.target);
    taskElement.replaceChild(cancelButton, deleteButton);
    taskElement.replaceChild(descriptionInputField, description);
};
const cancelButtonClickHandler = async e => {
    const data = await getData();
    const taskElement = e.target.parentElement;
    const id = taskElement.id;
    currentDescription = data.find(task => task.id === id).description;
    const saveButton = taskElement.querySelector('.save');
    const deleteButton = document.createElement('i');
    const descriptionInputField = taskElement.querySelector('.description');
    const description = document.createElement('span');
    const checkbox = taskElement.querySelector('.done');
    description.textContent = currentDescription;
    description.className = `description ${checkbox.checked ? 'done' : ''}`;
    deleteButton.className = 'fas fa-trash-alt delete';
    deleteButton.addEventListener('click', removeTaskButtonClickHandler);
    const editButton = document.createElement('i');
    editButton.className = 'fas fa-pencil-alt edit';
    editButton.addEventListener('click', editTaskButtonClickHandler);
    taskElement.replaceChild(deleteButton, e.target);
    taskElement.replaceChild(editButton, saveButton);
    taskElement.replaceChild(description, descriptionInputField);
};
const saveTaskButtonClickHandler = e => {
    const taskElement = e.target.parentElement;
    const descriptionInputField = taskElement.querySelector('.description');
    if (descriptionInputField.value) {
        const id = taskElement.id;
        const checkbox = taskElement.querySelector('.done');
        const task = {
            description: descriptionInputField.value,
            done: checkbox.checked
        };
        putData(id, task);
        const cancelButton = taskElement.querySelector('.cancel');
        const deleteButton = document.createElement('i');
        const description = document.createElement('span');
        description.textContent = descriptionInputField.value;
        description.className = `description ${checkbox.checked ? 'done' : ''}`;
        deleteButton.className = 'fas fa-trash-alt delete';
        deleteButton.addEventListener('click', removeTaskButtonClickHandler);
        const editButton = document.createElement('i');
        editButton.className = 'fas fa-pencil-alt edit';
        editButton.addEventListener('click', editTaskButtonClickHandler);
        taskElement.replaceChild(deleteButton, cancelButton);
        taskElement.replaceChild(editButton, e.target);
        taskElement.replaceChild(description, descriptionInputField);
    }
};
// add event handlers
addTaskButton.addEventListener('click', AddTaskButtonClickHandler);
// display all tasks on page load
addTaskElementsToDOM();