App.View.Thumbnail = Backbone.View.extend({
	template: window.Templates.Thumbnail,
	
	events: function() {
        return navigator.userAgent.match(/mobile/i) ? 
        {
            "touchstart .thumbAnchor" : "setModal"
        } :
        {
            "click .thumbAnchor" : "setModal"
        };
    },
	
    initialize: function(params) {
    	this.controller = params.controller;
        this.render();
    },

    render: function() {
        if ( !this.template ) return;
        if (this.model.thumbpath == "") this.model.thumbpath = this.model.filepath;
        this.$el.html( this.template( this.model ));
    },
    
    setModal: function(e) {
    	this.controller.controller.populateModal(this.model);
    }
});