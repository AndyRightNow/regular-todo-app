define([
  '{pro}/lib/regular.js',
  '{pro}/util/wrapped-rest.js',
], function (Regular, wrappedRest) {
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
      /**
       * Get completed todos
       */
      completedTodos: function (data) {
        return data.todos.filter(function (todo) {
          return !todo.isActive();
        });
      },
      /**
       * Todos under the current section
       */
      filteredTodos: function (data) {
        return this.getItems(data.currentSection);
      },
      /**
       * A flag to show if all todos are completed
       *
       * Two-way bound with the checkbox input
       */
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
    /**
     * Get the correspondent todos under the current section(e.g. "all" or "active")
     * 
     * @param {String} currentSection
     * @returns
     */
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
    /**
     * Remove a todo item from the list and send a delete request to the server
     * 
     * @param {Number} index
     */
    removeItem: function (index) {
      var item = this.data.todos.splice(index, 1)[0];
      this.removeData(item, index);
    },
    /**
     * Remove all completed todos
     */
    clearCompleted: function () {
      var data = this.data;
      var self = this;

      this.getItems('completed').forEach(function (item) {
        self.removeItem(data.todos.indexOf(item));
      });
    },
    /**
     * Send a request to the server to delete the todo
     * If any error occurs during the request, restore the deleted item back to the original position
     * 
     * @param {Todo} item
     * @param {Number} originalIndex
     */
    removeData: function (item, originalIndex) {
      var data = this.data;
      var self = this;
      var cachedRemoved = item;
      originalIndex = originalIndex || 0;

      wrappedRest.request('/api/data', {
        data: { id: item.id },
        method: 'delete',
      }, function (err) {
        if (err) {
          // Add the item back
          data.todos.splice(originalIndex, 0, cachedRemoved);
          self.$update();
        }
      });
    }
  });

  return TodoList;
});