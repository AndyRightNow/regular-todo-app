define([
  '{pro}/lib/regular.js',
  '{pro}objects/todo.js',
  '{pro}/lib/nej/util/ajax/rest.js',
  '{pro}/lib/nprogress.js'
], function (Regular, Todo, Rest, NProgress) {
  Regular.event('enter', function (element, fire) {
    Regular.dom.on(element, 'keypress', function (event) {

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
  <todo-list todos={todos} fetched={fetched}></todo-list>\
  ';

  var App = Regular.extend({
    name: 'app',
    template: template,
    data: {
      todos: [],
      newTodoDesc: "",
    },
    init: function () {
      this.getData();
    },
    addItem: function () {
      var data = this.data;

      if (data.newTodoDesc) {
        var item = new Todo(data.newTodoDesc);

        data.todos.push(item);
        this.addData(item);
        data.newTodoDesc = "";
      }
    },
    addData: function (item) {
      Rest._$request('/api/data', {
        data: item,
        method: 'post',
        onload: function (res) {
          NProgress.done();
        },
        onerror: function (err) {
          NProgress.done();
        },
        onbeforerequest: function () {
          NProgress.start();
        }
      });
    },
    getData: function () {
      var data = this.data;
      var self = this;

      Rest._$request('/api/data', {
        method: 'get',
        onload: function (res) {
          var d = res.data;

          data.todos = d.map(function (todo) {
            return new Todo(todo.description, false, todo._id)
          });
          self.$update();

          NProgress.done();
        },
        onerror: function (err) {
          NProgress.done();
        },
        onbeforerequest: function () {
          NProgress.start();
        }
      });
    }
  });

  return App;
});