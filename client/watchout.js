// start slingin' some d3 here.
var gameOptions = {
  height: 300,
  width: 500,
  nEnemies: 10,
  padding: 20
}


var gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)


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

var moveAround = function() {
	var obj = {}
	  obj.x = Math.random()*gameOptions.width;
    obj.y = Math.random()*gameOptions.height;

	return obj;

}

var render = function(enemy_data) {
	var enemies = gameBoard.selectAll('enemy').data(enemy_data, function(d){return d.id});

	enemies.enter()
		.append('svg:circle')
		.attr('class', 'enemy')
		.attr('cx', function(d){return d.x})
		.attr('cy', function(d){return d.y})
		.attr('r', 10)
		.attr('fill', 'purple')

  setInterval(function(){
	  enemies
	    .transition()
	    .duration(1000)
	    .attr('cx', function(d) {var obj = moveAround(); return obj.x})
	    .attr('cy', function(d) {var obj = moveAround(); return obj.y})
  }, 1000);

  var player = gameBoard.selectAll('player').data([1]);

  var drag = d3.behavior.drag()
    .on("drag", dragmove);

  var width = gameOptions.width,
  height = gameOptions.height,
  radius = 10;

  function dragmove(d) {
    d3.select(this)
      .attr("cx", d.x = d3.event.x)
      .attr("cy", d.y = d3.event.y);
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

render(enemy_data);
