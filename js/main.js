// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
{
	prompt: 'I prefer to let my partner introduce me. ',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'I get so lost in my thoughts I ignore or forget my surroundings',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'I do not usually initiate conversations',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'I start to cry easily when people are aggrivated towards me. ',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'I have plenty of friends in my social circle. ',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'I find it difficult to choose. I like my partner to choose for me.',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'I always instigate sexual moments.',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'I put myself first, my partner second.',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'If my partner is cross, I get twice as cross back!',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'I will fight tooth and nail to win the debate, instead of my partner.',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'I worry more about apperience than anything else.',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'I would rather improvise than spend time coming up with a detailed plan',
	weight: 1,
	class: 'group11'
}

]

// This array stores all of the possible values and the weight associated with the value. 
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz
// function createValueButtons() {
	
// 	for (var li_index = 0; li_index < prompts.length; li_index++) {
// 		for (var i = 0; i < prompt_values.length; i++) {
// 			var val_button = document.createElement('button');
// 			var val_text = document.createTextNode(prompt_values[i].value);

// 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
// 			val_button.appendChild(val_text);

// 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
// 		}
// 	}
// }
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = '<b>Your are more like Ann Walker!</b><br><br>\
		Your life might not have been a walk in the park, but, despite it all, you´ve fought hard for your hope. And thats what Anne likes about you. \n\
<br><br>\
You´re self-reliant, clever, and able to balance optimism and realism. <br> You don´t care for noise for the sake of noise, but you will speak up when the need arises, even if it scares you a little bit. \n\
<br><br>\
Most of all, you´re a Brave Little Toaster, and the luckiest people in the world are the ones who see that side of you.\n\
Even though you and Anne might face alot of challanges, you will always find your way back to each other... <br> I hope.\n\
<br><br>\ \
		';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>You are more like Mariana Lawton!</b><br><br>\
		Okay fine, you´re a little dramatic. A little indecisive. A little impulsive. But you´re also clever and cute and full of ideas to make every minute just a little bit more fun. No one´s ever bored when you´re around. \
<br><br>\
And the theatrics are only because you FEEL everything so strongly all the time — nothing makes you angrier than being dismissed or told to calm down. <br> Life and love are too important to be polite all the time. You see things for what they really are, tell the truth even when it hurts, and your true friends know that´s a gift.\
<br><br>\
Your relationship with Anne most likley will be rocky, but filled with passion and a undying love. You will have some major "whos the top" situation, and  also filled with jealousy.';
	} else {
		document.getElementById('results').innerHTML = '<b>You are more like Anne?!</b><br><br>\
		Ehm.. how akward... I dont think you and Anne, would get along well. You guys are way too alike. But not in a good way.\
<br><br>\
You are strong-willed and uncompromising. You refuse to be anything other than yourself, and yourself is excellent at taking charge. You always go after what you want, and you have a huge heart, so you’re always looking for love. You’ve been unlucky with romance in the past, but your luck is about to change. You’re daring, intriguing, and adventurous.<br><br>\
Yeah, sorry pal. This is not going to work.'
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})
