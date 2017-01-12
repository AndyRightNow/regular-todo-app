define([
  '{pro}/lib/regular.js',
  '{pro}/util/wrapped-rest.js',
  '{pro}/lib/nej/base/global.js'
], function (Regular, wrappedRest, NEJ) {
  var template = '\
    <div class="box">\
      <article class="media">\
        <div class="media-left">\
          <input r-model={ item.completed }\
                 type="checkbox"\
                 class="icon-checkbox-button fa fa-check-circle fa-2x">\
        </div>\
        <div class="media-content padding-tb-6px">\
          {#if !item.isEditing}\
            <div class="content" r-class={ { "completed": !item.isActive() } }>\
              { item.description }\
            </div>\
          {#else}\
            <input on-esc={ item.toggleEditing(true) }\
                   on-enter={ item.toggleEditing() }\
                   type="text"\
                   class="input is-medium-small"\
                   r-model={ item.description }>\
          {/if}\
        </div>\
        <div class="media-right">\
          <a class="icon-button" on-click={item.toggleEditing()}>\
            <i class="fa fa-pencil-square small-icon" aria-hidden="true"></i>\
          </a>\
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
    data: {
      cachedItem: null
    },
    remove: function () {
      this.$emit("remove");
    },
    init: function () {
      var data = this.data;

      this.$watch('item.isEditing', function (newVal, oldVal) {
        if (newVal && !oldVal) {
          data.cachedItem = NEJ.copy({}, data.item);
          this.$update();
        } else if (!newVal && oldVal) {
          this.updateData(data.item);
        }
      });

      this.$watch('item.completed', function (newVal, oldVal) {
        data.cachedItem = NEJ.copy({}, data.item);
        data.cachedItem.completed = oldVal;

        this.$update();
        this.updateData(data.item);
      });
    },
    updateData: function (item) {
      var data = this.data;
      var self = this;

      if (item.id) {
        wrappedRest.request('/api/data', {
          data: item,
          method: 'put'
        }, function (err, resData) {
          if (err) {
            data.item = data.cachedItem;
          }

          self.$update();
        });
      }
    }
  });


  return TodoItem;
});