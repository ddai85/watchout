// start slingin' some d3 here.
var gameOptions = {
  height: 300,
  width: 500,
  nEnemies: 30,
  padding: 20
}


var gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)


var createEnemies = function(){
  return _.range(0,gameOptions.nEnemies).map(function(i){ 
    return {
      id: i,
      x: Math.random()*100,
      y: Math.random()*100
    }
  });
}

var enemy_data = createEnemies();



var render = function() {
	var enemies = gameBoard.selectAll("enemy").data(enemy_data, function(d){return d.id});

	enemies.enter()
		.append('svg:circle')
		.attr('class', 'enemy')
		.attr('cx', function(d){return d.x * gameOptions.width / 100})
		.attr('cy', function(d){return d.y * gameOptions.height / 100})
		.attr('r', 10)
		.attr('fill', 'purple')

}

render();

// var play = function() {
  

// }