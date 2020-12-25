'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

//хранилище дел(todoData), получаем данные массива дел из localStorage
let todoData = JSON.parse(localStorage.getItem("todoData") || "[]");

//функция, которая добавляет дела на страницу
const render = function() {
    
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        //смена статуса задачи при клике на кнопку
        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        //удаление задач по клику на корзину
        const  btnTodoRemove = li.querySelector('.todo-remove');
        
        btnTodoRemove.addEventListener('click', function(){
            todoData.splice(todoData.indexOf(item), 1);
            render();
        });
        //вносим данные в localStorage
        localStorage.setItem("todoData", JSON.stringify(todoData));
       
    });
};

// отменяем стандартное пведение браузера (перезагрузка страницы при нажатии на плюс)
// и в массив todoData добавляем новое дело (новый объект)
todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    //Проверка поля инпута на заполненность и очистка поля после добавления задачи
    if (headerInput.value.trim() !== '') {

        todoData.push(newTodo);
        headerInput.value = '';
    } else {
        alert('Введите задачу, которую необходимо выполнить.');
    }

    render();
});

render();
