var StaticPageController = {
	
	init : function() {
		new App.View.SearchControl({controller:this});
	},
	
	search : function(searchText, searchType) {
		//redirect to homepage with query string params
		window.location = window.location.origin + "?title=" + searchText + "&type=" + searchType;
	}
};