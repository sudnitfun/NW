var DetailController = {
	
	init : function() {
		new App.View.SearchControl({controller:this});
		
		var self = this;
		var id = getQueryStringParam("id");
		if (id == null) return;
		
		this.content = new App.Model.Content({_id: id});
		this.content.fetch({
			success : function(result) {
				new App.View.Detail( { model : result });
				FB.XFBML.parse();
				self.fillMeta();
			}
		});
	},
	
	fillMeta : function() {
		if (this.content == null) return;
		
		$("title").html("BooseTube | " + this.content.attributes.title);
		$("meta[property='og:title']").attr("content", "BooseTube | " + this.content.attributes.title);
		$("meta[property='og:description']").attr("content", this.content.attributes.description);
		$("meta[property='og:image']").attr("content", "http://www.boosetube.com/" + this.content.attributes.filepath);
		$("meta[property='og:url']").attr("content", document.URL);
	},
	
	search : function(searchText, searchType) {
		//redirect to homepage with query string params
		window.location = window.location.origin + "?title=" + searchText + "&type=" + searchType;
	}
};