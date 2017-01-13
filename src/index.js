define([
  '{pro}/lib/regular.js',
  '{pro}components/App.js',
  '{pro}components/TodoItem.js',
  '{pro}components/TodoList.js'
], function (_, App, TodoItem, TodoList) {
  Regular.component(TodoItem.name, TodoItem);
  Regular.component(TodoList.name, TodoList);
  
  return new App().$inject('#app');
});