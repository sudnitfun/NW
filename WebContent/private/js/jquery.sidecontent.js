(function($) {
	var classModifier = "";
	var sliderCount = 0;
	var sliderWidth = "400px";
	var attachTo = "rightside";
	var totalPullOutHeight = 0;
	function CloseSliders(thisId) {
		for (var i = 0; i < sliderCount; i++) {
			var sliderId = classModifier + "_" + i;
			var pulloutId = sliderId + "_pullout";
			if ($("#" + sliderId).width() > 0) {
				if (sliderId == thisId) {
					showSlider = false;
				}
				$("#" + sliderId).animate({
					width : "0px"
				}, 1500);
				if (attachTo == "leftside") {
					$("#" + pulloutId).animate({
						left : "0px"
					}, 1500);
				} else {
					$("#" + pulloutId).animate({
						right : "0px"
					}, 1500);
				}
			}
		}
	}
	function ToggleSlider() {
		var rel = $(this).attr("rel");
		var thisId = classModifier + "_" + rel;
		var thisPulloutId = thisId + "_pullout";
		var showSlider = true;
		if ($("#" + thisId).width() > 0) {
			showSlider = false;
		}
		CloseSliders(thisId);
		if (showSlider) {
			$("#" + thisId).animate({
				width : sliderWidth
			}, 1500);
			if (attachTo == "leftside") {
				$("#" + thisPulloutId).animate({
					left : sliderWidth
				}, 1500);
			} else {
				$("#" + thisPulloutId).animate({
					right : sliderWidth
				}, 1500);
			}
		}
		return false;
	}
	;
	$.fn.sidecontent = function(settings) {
		var config = {
			classmodifier : "sidecontent",
			attachto : "rightside",
			width : "300px",
			opacity : "0.8",
			pulloutpadding : "5",
			textdirection : "vertical",
			clickawayclose : false
		};
		if (settings) {
			$.extend(config, settings);
		}
		return this.each(function() {
			$This = $(this);
			$This.css({
				opacity : 0
			});
			classModifier = config.classmodifier;
			sliderWidth = config.width;
			attachTo = config.attachto;
			var sliderId = classModifier + "_" + sliderCount;
			var sliderTitle = config.title;
			sliderTitle = $This.attr("title");
			if (totalPullOutHeight == 0) {
				totalPullOutHeight += parseInt(config.pulloutpadding);
			}
			if (config.textdirection == "vertical") {
				var newTitle = "";
				var character = "";
				for (var i = 0; i < sliderTitle.length; i++) {
					character = sliderTitle.charAt(i).toUpperCase();
					if (character == " ") {
						character = "&nbsp;";
					}
					newTitle = newTitle + "<span>" + character + "</span>";
				}
				sliderTitle = newTitle;
			}
			$This.wrap(
					'<div class="' + classModifier + '" id="' + sliderId
							+ '"></div>').wrap(
					'<div style="width: ' + sliderWidth + '"></div>');
			$("#" + sliderId).before(
					'<div class="' + classModifier + 'pullout" id="' + sliderId
							+ '_pullout" rel="' + sliderCount + '">'
							+ sliderTitle + '</div>');
			if (config.textdirection == "vertical") {
				$("#" + sliderId + "_pullout span").css({
					display : "block",
					textAlign : "center"
				});
			}
			$("#" + sliderId).css({
				position : "absolute",
				overflow : "hidden",
				top : "0",
				width : "0px",
				zIndex : "1",
				opacity : config.opacity
			});
			if (attachTo == "leftside") {
				$("#" + sliderId).css({
					left : "0px"
				});
			} else {
				$("#" + sliderId).css({
					right : "0px"
				});
			}
			$("#" + sliderId + "_pullout").css({
				position : "absolute",
				top : totalPullOutHeight + "px",
				zIndex : "1000",
				cursor : "pointer",
				opacity : config.opacity
			})
			$("#" + sliderId + "_pullout").live("click", ToggleSlider);
			var pulloutWidth = $("#" + sliderId + "_pullout").width();
			if (attachTo == "leftside") {
				$("#" + sliderId + "_pullout").css({
					left : "0px",
					width : pulloutWidth + "px"
				});
			} else {
				$("#" + sliderId + "_pullout").css({
					right : "0px",
					width : pulloutWidth + "px"
				});
			}
			totalPullOutHeight += parseInt($("#" + sliderId + "_pullout")
					.height());
			totalPullOutHeight += parseInt(config.pulloutpadding);
			var suggestedSliderHeight = totalPullOutHeight + 30;
			if (suggestedSliderHeight > $("#" + sliderId).height()) {
				$("#" + sliderId).css({
					height : suggestedSliderHeight + "px"
				});
			}
			if (config.clickawayclose) {
				$("body").click(function() {
					CloseSliders("");
				});
			}
			$This.css({
				opacity : 1
			});
			sliderCount++;
		});
		return this;
	};
})(jQuery);