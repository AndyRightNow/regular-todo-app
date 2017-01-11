define([
  '{pro}/lib/regular.js',
  '{pro}objects/todo.js'
], function (Regular, Todo) {
  Regular.event('enter', function (element, fire) {
    Regular.dom.on(element, 'keypress', function (event) {
      
      console.log(event.which);
      if (event.which === 13) fire(event);
    });
  });

  Regular.event('esc', function (element, fire) {
    Regular.dom.on(element, 'keyup', function (event) {

      if (event.which === 27) fire(event);
    });
  });

  var template = '\
  <section class="hero is-info">\
    <div class="hero-body">\
      <div class="container has-text-centered">\
        <h1 class="title">\
          Todo Manager\
        </h1>\
      </div>\
      <div class="container has-text-centered column is-half">\
        <input r-model={ newTodoDesc }\
               on-enter={ this.addItem() }\
               type="text"\
               class="input is-large"\
               placeholder="What do you want to do?"\
               autofocus\
               autocomplete>\
      </div>\
    </div>\
  </section>\
  <todo-list todos={todos}></todo-list>\
  ';

  var App = Regular.extend({
    name: 'app',
    template: template,
    data: {
      todos: [],
      newTodoDesc: "",
    },
    addItem: function () {
      var data = this.data;
      
      if (data.newTodoDesc) {
        data.todos.push(new Todo(data.newTodoDesc));
        data.newTodoDesc = "";
      }
    }
  });

  return App;
});