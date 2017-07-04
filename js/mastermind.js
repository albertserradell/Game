$(document).ready(function(){

	contador1 = 1;
	contador2 = 1;

	level1 = 4 // $('#height').val()
	level2 = 10 // $('#width').val()

	$('#selection').hide();

	x = new Mastermind()
	x.addProblem();
	x.yourOptions();
	x.areTheyWellPlaced();
	x.winCondition();

	drawMastermind(x.options, x.problem)



	$('.left_column input').click(function(){

		if(contador1 <= level1){
			if(contador1 == level1) {$('.linia.pos_'+contador2+ ' input').show()}

			color = $(this).val();

			$('.linia.pos_'+contador2+' .quadrat.pos_'+contador1).addClass(color)
			$('.linia.pos_'+contador2+' .quadrat.pos_'+contador1+' input').val(color)

			contador1++;
		}
	});

	$('.right_column input[value="submit"]').click(function(){

		$('.right_column input[value="reset"], .right_column input[value="submit"]').hide()

		total_colors = $('.linia.pos_'+contador2+' .quadrat input').length;

		for(i = 0; i<total_colors; i++){
			selected[i] = $('.linia.pos_'+contador2+' .quadrat:nth-child('+(i+2)+') input').val()
		}

		// console.log(selected)

		x.areTheyWellPlaced();
		x.winCondition();

		

		contador1 = 1;
		contador2++;
	});

	$('.right_column input[value="reset"]').click(function(){

		$('.right_column input[value="reset"], .right_column input[value="submit"]').hide()
		for(var a = 0; a < x.colors.length; a++){
			$('.linia.pos_'+contador2+' .quadrat').removeClass(x.colors[a]);
		}

		$('.linia.pos_'+contador2+' input[type="hidden"]').val('default');

		selected = [];

		contador1 = 1;



	});

})



var selected = [];

// var level1 = prompt("Choose difficult from 3 to 10")
// var level2 = prompt("how many iterations do you want to solve it?")


function Mastermind(){
  this.colors = ["red","blue", "yellow", "green", "orange", "black" ,"white", "purple", "grey", "cyan"];
  this.many = level1;
  this.howLong = level2;
  this.correct = 0;
  this.problem = [];
  this.options = [];
  this.incorrect=0;
}


Mastermind.prototype.addProblem = function () {
  while (this.many>this.problem.length){
    var m = Math.floor(Math.random() * this.colors.length);
    this.problem.push(this.colors[m]);
  }
};

Mastermind.prototype.yourOptions = function (){
  for (var i=0; i<this.problem.length; i++){
    var boolean = this.options.includes(this.problem[i])
    if(boolean === false){
      this.options.push(this.problem[i]);
    }
  }
  while(this.problem.length>this.options.length){
    var m = Math.floor(Math.random() * this.colors.length);
    var boolean2 = this.options.includes(this.colors[m])
    if(boolean2 === false){
      this.options.push(this.colors[m]);

    }
  }
  var a= this.options;
    for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};
Mastermind.prototype.areTheyWellPlaced = function (){
  var k=-1;
  var b=-1;
  p=[];
  var html='';
  for (var j =0; j<this.problem.length;j++){

      p.push(this.problem[j]);
  }
  for (i=this.problem.length; i>=0; i--){
      if (p[i]===selected[i]){
        k++;
        p.splice(i, 1);
        selected.splice(i,1);
      }
	  this.correct = k;
      //console.log(p);
      //console.log(selected);
  }



    for(var g=p.length; g>=0;g--){
      for (var h = selected.length; h>=0;h--){
        if (p[g]===selected[h]){
          b++;
          p.splice(g,1);
          selected.splice(h,1);
        }
		this.incorrect=b;
      }
    }



	for(a=0;a<k;a++){
		html += '<img src="img/win.png">';
	}

	for(a=0; a < b ;a++){
		html += '<img src="img/lose.png">';
	}

  $('.linia.pos_'+contador2+' .result').html(html);
};

Mastermind.prototype.winCondition = function (){
  if (this.problem.length===this.correct){
     $('h1').text("Epic win!");
	 $('.left_column').slideUp('fast');
	 $('.colors_win_hidden').slideUp(4000);
	 $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  else{
	  if(contador2>=level2){
	     $('h1').text("You lose!");
		 $('.left_column').slideUp('fast')
		 $('.colors_win_hidden').slideUp(6000);
		 $("html, body").animate({ scrollTop: 0 }, "slow");
	  }
  }
};



function drawMastermind(colors1, colors2){

	for(var y = 0; y <colors1.length; y++){
		$('[value='+colors1[y]+']').toggle()
	}

	for(var x = 0; x < colors2.length; x++){
		$('.colors_win').append('<div class="quadrat '+ colors2[x] +'"></div>')
	}

	$('.left_column').slideDown('slow')

}
