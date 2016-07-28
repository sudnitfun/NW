App.View.Image = Backbone.View.extend({
	template: window.Templates.Image,
	
    initialize: function() {
    	this.setElement($('#mainContent')[0]);
        this.render();
    },

    render: function() {
        if ( !this.template ) return;
        
        this.$el.html( this.template( this.model.attributes ));
    }
});