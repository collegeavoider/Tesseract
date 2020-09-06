var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var changePic = function() {
	var counname = document.getElementById("image-in").value;
	var pubImg = document.getElementById("img-of-ron");
	pubImg.src = counname.toLowerCase() + ".jpg";
	if (counname.toLowerCase() == "usa") {
		pubImg.classList.remove("flags");
		pubImg.classList.add("usFlag");
	} else {
		pubImg.classList.remove("usFlag");
		pubImg.classList.add("flags");
	}
}

var butChange = function(country) {
	var img = document.getElementById("img-of-ron");
	img.src = country.toLowerCase() + ".jpg";
	if (country.toLowerCase() == "usa") {
		img.classList.remove("flags");
		img.classList.add("usFlag");
	} else {
		img.classList.remove("usFlag");
		img.classList.add("flags");
	}
}

var imgError = function() {
	document.getElementById("img-of-ron").src = "imgnotfound.jpg";
}

var currentData;

var submittedAlready = false;

var getTriviaQuestions = function() {
	fetch("http://localhost:8080/getTriviaQuestion")
		.then(response => response.json())
		.then(data => {
			var question = data.results[0].question;
			document.getElementById("trivia-questions").innerText = question;
			var answers = data.results[0].answers;
			submittedAlready = false;
			document.getElementById("an1").classList.remove("wrong");
			document.getElementById("an2").classList.remove("wrong");
			document.getElementById("an3").classList.remove("wrong");
			document.getElementById("an4").classList.remove("wrong");
			document.getElementById("an1").classList.remove("correct");
			document.getElementById("an2").classList.remove("correct");
			document.getElementById("an3").classList.remove("correct");
			document.getElementById("an4").classList.remove("correct");
			if (answers.length == 2) {
				document.getElementById("an1").innerText = answers[0];
				document.getElementById("an2").innerText = answers[1];
				document.getElementById("an3").classList.add("hidden");
				document.getElementById("an4").classList.add("hidden");
			} else {
				shuffle(answers);
				document.getElementById("an1").innerText = answers[0];
				document.getElementById("an2").innerText = answers[1];
				document.getElementById("an3").innerText = answers[2];
				document.getElementById("an4").innerText = answers[3];
				document.getElementById("an3").classList.remove("hidden");
				document.getElementById("an4").classList.remove("hidden");
			}
		});
}

var changeColorOn = function(answer, req, res) {
	var givenSolutions = {
		question: document.getElementById("trivia-questions").innerText, answer: document.getElementById(answer).innerText
	};
	fetch("http://localhost:8080/checkanswer", {
		method: "POST",
		headers:{
			"Content-Type": "application/json"
		},
		body: JSON.stringify(givenSolutions)
	})
		.then(response => response.text())
		.then(data => {
			var correction = data
			console.log(data)
		var an = document.getElementById(answer);
		if (correction == "true") {
			if (submittedAlready) {
				an.classList.add("correct");
				an.classList.remove("wrong");
			} else {
				console.log("b")
				document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText) + 1;
				submittedAlready = true;
				an.classList.add("correct");
				an.classList.remove("wrong");
			}	
		} else {
			an.classList.add("wrong");
			an.classList.remove("correct");
			submittedAlready = true;
		}	
		})
	//college avoided
	//unstaged
}

getTriviaQuestions();