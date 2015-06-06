function getPrecision () {
	return Number($("#wordZone").html());
}

function check(expresions) {
	var expressions = getExpresions(getWords(), getPrecision());
	var expression;
	var interval;
	
	interval = setInterval(function () {
		if (expression = expresions.pop()) {
			$.ajax({
				url: "http://celber.pl/dev/google.php?q=%22"+expression+"%22",
				crossDomain: true,
				success: function (data) {
					console.log(data);	
				}
			});
		} else {
			clearInterval(interval);
		}
	}, 1000);
}

function getExpresions(words, precision) {
	var expresions = [];
	var idx, len, word;
	
	for (idx = 0, len = words.length; word = words[idx], idx < len; ++idx) {
		expresions.push(words.slice(idx, idx+precision-1).join("+"));
	}
	
	return expresions;
}

function getWords() {
	var content = $("#editor").html();
	var words = [];
	var i, len, word;
	content = content.replace(/\r?\n/g, " ");
	content = content.split(" ");
	len = content.length;
	
	for (i = 0; word = content[i], i < len; ++i) {
		if (word !== " " && word !== "") {
			words.push(word);
		}
	}
	
	return words;
}

function run() {
	var expresions = getExpresions(getWords(), getPrecision());
	
	check(expresions);
} 


$("#run").click(run);