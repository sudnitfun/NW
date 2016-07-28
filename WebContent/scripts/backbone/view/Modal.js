App.View.Modal = Backbone.View.extend({
	imageTemplate: window.Templates.ModalImage,
	videoTemplate: window.Templates.ModalVideo,
	audioTemplate: window.Templates.ModalAudio,
	
	fbCommentDiv: null,
	
    initialize: function(params) {
    	this.controller = params.controller;
    	this.setElement($('#contentModal')[0]);
    	this.fbCommentDiv = this.$el.find(".modal-footer .fb-comments");
    },
    
    updateModal: function(model) {
    	var tpl = this.imageTemplate;
    	if (model.type == "video") tpl = this.videoTemplate;
    	else if (model.type == "audio") tpl = this.audioTemplate;
    	
    	this.$el.find(".modal-body").html(tpl(model));
    	
    	this.$el.find("#modalImage").attr("src", model.filepath);
    	this.$el.find("#modalTitle").html(model.title);
    	
    	var urlSuffix = "detail.html?id=" + model._id;
    	history.pushState({},"", urlSuffix);
    	
    	this._updateFacebookPlugin(urlSuffix);
    	
    	this._setModalHiddenListener();
    	
    	if (model.type == "video") {
    		this.$el.find('video').mediaelementplayer();
    	} else if (model.type == "audio") {
    		this.$el.find('audio').mediaelementplayer();
    	}
    },
    
    _updateFacebookPlugin: function(urlSuffix) {
    	this.fbCommentDiv.attr("data-href", "http://boosetube.com/"+urlSuffix);
    	FB.XFBML.parse();
    },
    
    _setModalHiddenListener: function() {
    	var self = this;
    	this.$el.on('hidden.bs.modal', function (e) {
    		var av = $('video,audio');
    		av && av.length > 0 && av[0].player.pause();
    		history.back();
    		$(e.currentTarget).unbind();
    		self.fbCommentDiv.attr("data-href", "http://boosetube.com/");
		});
    }
});