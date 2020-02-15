chrome.storage.sync.get(['expressions'], function(result) {
	if(result.expressions) {
		expressions = result.expressions;
	} else {
		expressions = [];
	}
	window.addEventListener("DOMNodeInserted",
		function(event){ 
			var tweets = document.querySelectorAll('[role="article"]');
			expressions.forEach(function(expression) {
				tweets.forEach(function(tweetContainer) {
					var tweet = tweetContainer.querySelector('div[lang]');
					if(tweet != null) {
						var tweetText = tweet.textContent;
						if(tweetText != null) {
							var regex = new RegExp(expression);
							if(regex.test(tweetText)) {
								console.log("Hiding tweet '" + tweetText + "' because it matches expression '" + expression +  "'");
								tweetContainer.parentElement.removeChild(tweetContainer);
							}
						}
					}
				});
			});

		}, 
		false);
});