// start slingin' some d3 here.
var gameOptions = {
  height: 300,
  width: 500,
  nEnemies: 10,
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
}

var playerStats = {
  x: gameOptions.width / 2,
  y: gameOptions.height / 2,
  r: 10
}

var updateScore = function() {
  d3.select('.current')
  .text('Current score: ' + gameStats.score.toString())

  d3.select('.collisions')
  .text('Collisions: ' + gameStats.collisions.toString())
}

var gameBoard = d3.select('.board').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .attr('class', 'gameSpace')


var findEnemyPos = function(){
  return _.range(0,gameOptions.nEnemies).map(function(i){ 
    return {
      id: i,
      x: Math.random()*gameOptions.width,
      y: Math.random()*gameOptions.height
    }
  });
}

var enemy_data = findEnemyPos();
var enemies = gameBoard.selectAll('enemy').data(enemy_data, function(d){return d.id});

var moveAround = function() {
	var obj = {}
	  obj.x = Math.random()*gameOptions.width;
    obj.y = Math.random()*gameOptions.height;

	return obj;

}

var render = function(enemy_data) {
	

	enemies.enter()
		.append('svg:circle')
		.attr('class', 'enemy')
		.attr('cx', function(d){return d.x})
		.attr('cy', function(d){return d.y})
		.attr('r', 10)
		.attr('fill', 'purple')

  var move = function(element){
	  element
	    .transition()
	    .duration(2000)
	    .attr('cx', function(d) {var obj = moveAround(); return obj.x})
	    .attr('cy', function(d) {var obj = moveAround(); return obj.y})
	    .each('end', function(){
	      move(d3.select(this));
	    })
	    gameStats.score += 1;
  }
  move(enemies)

  var player = gameBoard.selectAll('player').data([1]);

  var drag = d3.behavior.drag()
    .on("drag", dragmove);

  var width = gameOptions.width,
  height = gameOptions.height,
  radius = 10;

  function dragmove(d) {
    d3.select(this)
      .attr("cx", function(d){ playerStats.x = d3.event.x; return d.x = d3.event.x })
      .attr("cy", function(d){ playerStats.y = d3.event.y; return d.y = d3.event.y });
  }

  player.enter()
    .append('svg:circle')
    .attr('class', 'player')
    .attr('cx', gameOptions.width / 2)
    .attr('cy', gameOptions.height / 2)
    .attr('r', 10)
    .attr('fill', 'red')
    .call(drag)
}

var prevCollision = false;

var checkCollision = function() {
	var collision = false;

	enemies.each(function(){
		var radiusSum =  20
		var xDiff = this.attr('cx') - playerStats.x;
		var yDiff = this.attr('cy') - playerStats.y;
		var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
		if (separation < radiusSum) {
			collision = true;
		}
  })

  if (collision) {
  	gameStats.score = 0;
  	if (prevCollision != collision) {
  		gameStats.collisions += 1;
  	}
  }
}

d3.timer(checkCollision)
d3.timer(updateScore)

render(enemy_data);
