define([
  '{pro}/lib/regular.js'
], function (Regular) {
  var template = '\
    <section class="container section">\
      <div class="has-text-centered columns">\
  	<div class="column is-2"></div>\
    <div class="column is-auto">\
    <div class="section title has-text-centered gray-text" r-hide={ todos.length }>No todos.</div>\
    <div class="has-text-centered columns" r-hide={ !todos.length }>\
      <div class="column is-auto"><input r-model={ allCompleted } type="checkbox" class="icon-checkbox-button fa fa-check-circle fa-2x"></div>\
      <div class="column is-2"><a on-click={ currentSection="all" } r-class={ {"is-info": currentSection === "all"} } class="button">All</a></div>\
      <div class="column is-2"><a on-click={ currentSection="active" } r-class={ {"is-info": currentSection === "active"} } class="button">Active</a></div>\
      <div class="column is-2"><a on-click={ currentSection="completed" } r-class={ {"is-info": currentSection === "completed"} } class="button">Completed</a></div>\
      <div class="column is-3"><a on-click={ this.clearCompleted() } class="button is-success">Clear Completed</a></div>\
    </div>\
      {#list filteredTodos as todo}\
        <todo-item on-remove={ this.removeItem(todo_index) } item={ todo }></todo-item>\
      {/list}\
    </div>\
    <div class="column is-2"></div>\
      </div>\
    </section>\
    ';

  var TodoList = Regular.extend({
    name: 'todo-list',
    template: template,
    data: {
      currentSection: "all",
      // Props
      todos: []
    },
    computed: {
      completedTodos: function (data) {
        return data.todos.filter(function (todo) {
          return !todo.isActive();
        });
      },
      filteredTodos: function (data) {
        return this.getItems(data.currentSection);
      },
      allCompleted: {
        get: function (data) {
          return !!this.getItems("completed").length && this.getItems("completed").length === data.todos.length;
        },
        set: function (value, data) {

          if (data.todos) {
            data.todos.forEach(function (todo) {
              todo.completed = value;
            });
          }
        }
      }
    },
    getItems: function (currentSection) {
      var data = this.data;

      switch (currentSection) {
        case "active":
          {
            return data.todos.filter(function (todo) {
              return todo.isActive();
            });
          }
        case "completed":
          {
            return data.todos.filter(function (todo) {
              return !todo.isActive();
            });
          }
        default:
          {
            return data.todos;
          }
      }
    },
    removeItem: function (index) {
      this.data.todos.splice(index, 1);
    },
    clearCompleted: function () {
      this.data.todos = this.getItems('active');
    }
  });

  return TodoList;
});