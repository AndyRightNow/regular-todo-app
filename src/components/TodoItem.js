define([
  '{pro}/lib/regular.js'
], function (Regular) {
  var template = '\
    <div class="box">\
      <article class="media">\
        <div class="media-left">\
          <input r-model={ item.completed } type="checkbox" class="icon-checkbox-button fa fa-check-circle fa-2x">\
        </div>\
        <div class="media-content padding-tb-6px">\
          {#if !item.isEditing}\
            <div class="content" r-class={ { "completed": !item.isActive() } }>\
              { item.desc }\
            </div>\
          {#else}\
            <input on-esc={ item.toggleEditing(true) } on-enter={ item.toggleEditing() } type="text" class="input is-medium" r-model={ item.desc }>\
          {/if}\
        </div>\
        <div class="media-right">\
          <a class="icon-button" on-click={item.toggleEditing()}><i class="fa fa-pencil-square small-icon" aria-hidden="true"></i></a>\
        </div>\
        <div class="media-right">\
          <a on-click={this.remove()} class="delete"></a>\
        </div>\
      </article>\
    </div>\
    ';

  var TodoItem = Regular.extend({
    name: 'todo-item',
    template: template,
    data: {},
    remove: function () {
      this.$emit("remove");
    }
  });

  return TodoItem;
});