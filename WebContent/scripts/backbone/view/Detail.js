App.View.Detail = Backbone.View.extend({
	template: window.Templates.Detail,
	
	imageTemplate: window.Templates.DetailImage,
	videoTemplate: window.Templates.DetailVideo,
	audioTemplate: window.Templates.DetailAudio,
	
    initialize: function(params) {
    	this.controller = params.controller;
    	this.setElement($('#mainContent')[0]);
        this.render();
    },

    render: function() {
        if ( !this.template ) return;
        
        this.model.attributes.url = "http://boosetube.com/detail.html?id=" + this.model.attributes._id;
        this.$el.html( this.template( this.model.attributes ));
        
        this._renderContentType();
    },
    
    _renderContentType: function() {
    	var tpl = this.imageTemplate;
    	if (this.model.attributes.type == "video")
    		tpl = this.videoTemplate;
    	else if (this.model.attributes.type == "audio")
    		tpl = this.audioTemplate;
    	
    	this.$el.find("#detailItem").html(tpl(this.model.attributes));
    	
    	if (this.model.attributes.type == "video") {
    		this.$el.find('video').mediaelementplayer();
    	} else if (this.model.attributes.type == "audio") {
    		this.$el.find('audio').mediaelementplayer();
    	}
    }
});