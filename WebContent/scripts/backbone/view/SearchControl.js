App.View.SearchControl = Backbone.View.extend({
	template: window.Templates.SearchControl,
	
	currentType: "",
	
	events: function() {
        return navigator.userAgent.match(/mobile/i) ? 
        {
            "touchstart .contentOption" : "setOption"
        } :
        {
            "click .contentOption" : "setOption"
        };
    },
	
    initialize: function(params) {
    	this.controller = params.controller;
    	this.setElement($('#searchControl')[0]);
        this.render();
        
        var txtSearch = this.$el.find("#txtSearch");
        var self = this;
        txtSearch.bind("enterKey",function(e){
    	   self.controller.search(txtSearch.val(), self.currentType);
    	});
        txtSearch.keyup(function(e){
    	    if(e.keyCode == 13)
    	    {
    	        $(this).trigger("enterKey");
    	    }
    	});
    },

    render: function() {
        if ( !this.template ) return;
        
        this.$el.html( this.template() );
    },
    
    setOption: function(e) {
    	e.preventDefault();
    	
    	var selectedOption = this.$el.find(".selectedOption span");
    	selectedOption.html(e.currentTarget.innerText);
    	
    	var options = this.$el.find(".contentOption");
    	options.removeClass("active");
    	$(e.currentTarget).addClass("active");
    	var selected = $(e.currentTarget);
    	this.currentType = selected.attr("data-type");
    }
});