NEJ.define([], function () {
  /**
   * Todo item object
   * 
   * @export
   * @class Todo
   * @constructor
   * @param {String} desc The description of this todo item
   * @param {boolean} [completed=false] If this item is completed
   *
   */
  function Todo(desc, completed) {
    if (typeof desc !== "string") {
      throw new Error('The first argument of Todo object must be a string');
    }
    
    this.desc = desc;
    this.completed = completed || false;
    this.isEditing = false;
    this._createdAt = new Date(Date.now()).toLocaleString("us");
    this._cachedDesc = "";
  }

  /**
   * 
   * Toggle the completed state of this item
   * 
   * @method
   * @public
   * @memberof Todo
   */
  Todo.prototype.toggleCompleted = function () {
    this.completed = !this.completed;
  };

  /**
   * Check if this todo item is active
   * 
   * @memberof Todo
   * @method
   * @public
   * @return {Boolean} True if this item is active
   */
  Todo.prototype.isActive = function () {
    return !this.completed;
  };

  /**
   * Toggle editing state
   * 
   * @method
   * @public
   * @param {Boolean} cancel The flag indicating if this edit is canceled or not
   * @memberof Todo
   */
  Todo.prototype.toggleEditing = function (cancel) {
    cancel = cancel || false;

    if (!this.isEditing) {
      this._cachedDesc = this.desc;
    }
    else if (!this.desc || cancel) {
      this.desc = this._cachedDesc;
    }

    this.isEditing = !this.isEditing;
  };

  return Todo;
});