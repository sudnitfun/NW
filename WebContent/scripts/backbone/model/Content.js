App.Model.Content = Backbone.Model.extend({
	urlRoot : '/rest/content',
	idAttribute: '_id',
	defaults : {
		title : '',
		description : ''
	}
});

App.Collection.ContentCollection = Backbone.Collection.extend({
	model : App.Model.Content,
	url : '/rest/content'
});