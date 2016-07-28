App.View.ThumbnailList = Backbone.View.extend({
	template: window.Templates.ThumbnailList,
	
    initialize: function(params) {
    	this.controller = params.controller;
    	this.setElement($('#thumbList')[0]);
        this.render();
    },

    render: function() {
        if (!this.template) return;
        
        this.$el.html(this.template);
        
        var self = this;
        _.each(this.model, function(item) {
        	self.$el.append(new App.View.Thumbnail({model:item.attributes,controller:self}).el);
        });
    },
    
    addImage: function(model) {
    	if (!model) return;
    	this.$el.append(model.el);
    }
});