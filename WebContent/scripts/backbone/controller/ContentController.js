var ContentController = {
	collection : null,
	thumbnailList : null,
	modal : null,
	
	init : function() {
		new App.View.SearchControl({controller:this});
		this.modal = new App.View.Modal({el:$('#contentModal'),controller:this});
		this.collection = new App.Collection.ContentCollection();
		var self = this;
		this.collection.fetch({
			data: $.param({title: getQueryStringParam("title"), type: getQueryStringParam("type")}),
			success : function(result) {
				self.thumbnailList = new App.View.ThumbnailList( { model : result.models, controller : self });
			}
		});
	},
	
	populateModal : function(model) {
		this.modal.updateModal(model);
		FB.XFBML.parse();
	},
	
	search : function(searchText, searchType) {
		this.collection.reset();
		var self = this;
		this.collection.fetch({
			data: $.param({title: searchText, type: searchType}),
			success : function(result) {
				self.thumbnailList = new App.View.ThumbnailList( { model : result.models, controller : self });
			}
		});
	}
};