<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>chaoswindow</title>


        <script language="javascript">
            document.write('<canvas id="canvas" style="position:absolute; left:0; right:0; bottom:0; top:0; margin:auto;"></canvas>');
    var grid = [];
	grid[0] = [];
	var new_grid = [];

    var sz = 600;
	var timeout = 1;

	var distanceWaterReaches = 4; //This is how far away water can support life
	var minimumAllowedWaterSize = 0; //When water 'size' reaches this level, it can no longer grow
	var startingWaterSize = 500; //An organism starts with this water size as its seed
	
    var earth = 0;
    var grass = 1;
    var water = 2;
	var spore = 3;

	var points = [];
	points[earth] = -3;
	points[water] = -10;
	points[grass] = 1;

			var growCycles = 0;


	var canvas = document.getElementById('canvas');
	canvas.width = sz;
	canvas.height = sz;

	var ctx, id, g;
	init_grid();

	
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	/**
	 * Create a cell
	 *
	 * @param cellType An integer representing type of cell (e.g. earth, water, leaf)
	 * @cellStrength An integer representing the 'strength' of a cell. Used differently for water and leaf
	 **/
	function createCell(cellType, cellStrength, color, cellAge, growValue, ungrowValue)
	{
		return {'type':cellType, 'size':cellStrength, 'color':color, 'cellAge':cellAge, 'growValue':growValue,'ungrowValue':ungrowValue}; //TODO: change the keys for this later
	}


	function createCellFromGlobalGrid(i, j) {
		var gridCell = grid[0][i][j];
		return createCell(gridCell.type, gridCell.size, gridCell.color, gridCell.cellAge + 1, gridCell.growValue, gridCell.ungrowValue);
	}


	function createCellFromGrid(thisGrid, i, j) {
		var gridCell = thisGrid[i][j];
		return createCell(gridCell.type, gridCell.size, gridCell.color, gridCell.cellAge, gridCell.growValue, gridCell.ungrowValue);
	}


	function createCellFromNewGrid(i, j) {
		var gridCell = new_grid[i][j];
		if(gridCell.cellAge > 30) {
			//console.log('old');
			if(Math.random()*100 < (gridCell.cellAge - 30)) {
				gridCell = createCell(earth, 1, createRandomColor(), 1, gridCell.growValue, gridCell.ungrowValue);
			}

		}
		//console.log('cell is now: ' + gridCell.cellAge);
		return gridCell;
	}


	function forEntireGrid(executable) {
		for (var i=0; i < sz; i++ ) {
			for (var j = 0; j < sz; j++) {
				executable(i, j);
			}
		}
	}

	function createRandomColor()
	{
		return {
			'red' : {
				'base' : Math.floor(Math.random() * 50),
				'mult' : Math.floor(Math.random() * 10) + 1
			},
			'green' : {
				'base' : Math.floor(Math.random() * 50),
				'mult' : Math.floor(Math.random() * 10) + 1
			},
			'blue' : {
				'base' : Math.floor(Math.random() * 50),
				'mult' : Math.floor(Math.random() * 10) + 1
			}
		};
	}


	function mutateColor(color){
		return {
			'red' : {
				'base' : Math.max(Math.min(color.red.base + Math.floor(Math.random() * 7) - 3, 50), 0),
				'mult' : Math.max(Math.min(color.red.mult + Math.floor(Math.random() * 3) - 1, 10), 1)
			},
			'green' : {
				'base' : Math.max(Math.min(color.green.base + Math.floor(Math.random() * 7) - 3, 50), 0),
				'mult' : Math.max(Math.min(color.green.mult + Math.floor(Math.random() * 3) - 1, 10), 1)
			},
			'blue' : {
				'base' : Math.max(Math.min(color.blue.base + Math.floor(Math.random() * 7) - 3, 50), 0),
				'mult' : Math.max(Math.min(color.blue.mult + Math.floor(Math.random() * 3) - 1, 10), 1)
			}
		};

	}

	function mutateGug(gug){
		return Math.max(Math.min(gug + Math.floor(Math.random() * 20) - 10, 1000), 0);
	}
		
	/**
     *
     **/
	function init_grid() {
	    for(var i=0; i<sz; i++){
			grid[0][i] = [];
			new_grid[i] = [];

			for(var j=0; j<sz; j++){
				grid[0][i][j] = createCell(earth, 1, createRandomColor(), 1, 500, 200); //TODO: earth doesn't need random color

			}
	        
	    }

		var randX;
		var randY;

		for (var aaa = 0; aaa < 10; aaa++){
			randX = Math.floor(Math.random() * sz);
			randY = Math.floor(Math.random() * sz);
			grid[0][randX][randY] = createCell(water, startingWaterSize, createRandomColor(), 1, 500, 200);
		}
	}


	function refreshNewGrid()
	{
		forEntireGrid(function(i, j){
			new_grid[i][j] = createCellFromGlobalGrid(i, j);
		});
	}

	



    /**
     *
     **/
	function update(){
		
        if(!ctx){
			ctx = document
                    .getElementById('canvas')
                    .getContext('2d');

			id = ctx.createImageData( sz, sz ); // only do this once per page

			g  = id.data;                     // only do this once per page
		}

	    for( var i = 0; i < sz; i++ ){
	        for( var j = 0; j < sz; j++ ){

				var grid_state = grid[0][i][j].type;
				var grid_size = grid[0][i][j].size;
				var color = grid[0][i][j].color;

				//TODO: use color
	            
                var idx = 4 * (j + i * sz);

				if(grid_state == earth) {
					g[idx] = 25; //red
				} else if(grid_state == grass){
					g[idx] =  Math.min(grid_size*color.red.mult + color.red.base, 255); //green
				} else {
					g[idx] = 0;//Math.max(grid_size*color.red.mult - color.red.base, 0); //blue; //red
				}


				if(grid_state == grass){
					g[1 + idx] =  Math.min(grid_size*color.green.mult + color.green.base, 255); //green
				} else if(grid_state == earth) {
					g[1 + idx] = 5; //green
				} else {
					g[1 + idx] = 0;//Math.max(grid_size*color.green.mult - color.green.base, 0); //blue; //green
				}

				if(grid_state == water) {
					g[2 + idx] = 0;//Math.max(grid_size*color.blue.mult - color.blue.base, 0); //blue
				} else if(grid_state == grass){
					g[2 + idx] =  Math.min(grid_size*color.blue.mult + color.blue.base, 255); //green
				} else {
					g[2 + idx] = 0; //blue
				}

				g[3 + idx] = 255; //alpha
	        }
	    }
		
		ctx.putImageData( id, 0,0 );
	}


	function score_grid(a_grid) {
		var score = 0;

		for( var m=0; m<a_grid.length; m++ ) {
			for (var n = 0; n < a_grid[m].length; n++) {
				score += points[a_grid[m][n].type];
			}
		}

		return score;
	}


	function isWater(i, j){
		return grid[0][i][j].type == water
	}




	function canUngrowAtLocation(i, j)
	{
		return new_grid[i][j].type == water && new_grid[i][j].size < startingWaterSize;
	}




	function sporeAt(i, j){

		if(new_grid[i][j].type == grass) {
			//console.log('found grass to spore from');
			if((Math.floor(Math.random() * 80000) < 1)) { //TODO: use age
				//console.log('trying to spore');
				var newX = (sz + i + Math.floor((Math.random() * 200)) - 100) % sz;
				var newY = (sz + j + Math.floor((Math.random() * 200)) - 100) % sz;
				if(new_grid[newX][newY].type == earth) {
					//TODO: should use spore and mutate
					var newColor = mutateColor(new_grid[i][j].color);
					var newGrowValue = mutateGug(new_grid[i][j].growValue);
					var newUngrowValue = mutateGug(new_grid[i][j].ungrowValue);

					new_grid[newX][newY] = createCell(water, startingWaterSize, newColor, 1, newGrowValue, newUngrowValue);
				}
			}
		}
	}



	function getPointsFor(thisGrid, i, j)
	{
		return points[thisGrid[i][j].type];
	}





	function growAtLocation(i, j, l, r, u, d) {

		if (!isWater(i, j)) { //Only grow in a place that isn't already water/stem
			var waterMax = minimumAllowedWaterSize - 1;
			var newColor;
			var cell;
			var newAge;
			var newGrowValue;
			var newUngrowValue;

			if(isWater(r, j)){
				cell = grid[0][r][j];
				//console.log('cell size is: ' + cell.size);
				if(cell.size > waterMax)
				{
					//console.log('bigger cell up: ' + cell.size + "; max was: " + waterMax);
					waterMax = cell.size;
					newColor = cell.color; //TODO: deep copy?
					newAge = cell.cellAge;
					newGrowValue = cell.growValue;
					newUngrowValue = cell.ungrowValue;
				}
			}

			if(isWater(l, j)){
				cell = grid[0][l][j];
				if(cell.size > waterMax)
				{
					waterMax = cell.size;
					newColor = cell.color; //TODO: deep copy?
					newAge = cell.cellAge;
					newGrowValue = cell.growValue;
					newUngrowValue = cell.ungrowValue;
				}
			}

			if(isWater(i, u)){
				cell = grid[0][i][u];
				if(cell.size > waterMax)
				{
					//console.log('bigger cell up: ' + cell.size + "; max was: " + waterMax);
					waterMax = cell.size;
					newColor = cell.color; //TODO: deep copy?
					newAge = cell.cellAge;
					newGrowValue = cell.growValue;
					newUngrowValue = cell.ungrowValue;
				}
			}

			if(isWater(i, d)){
				cell = grid[0][i][d];
				if(cell.size > waterMax)
				{
					//console.log('bigger cell down: ' + cell.size + "; max was: " + waterMax);
					waterMax = cell.size;
					newColor = cell.color; //TODO: deep copy?
					newAge = cell.cellAge;
					newGrowValue = cell.growValue;
					newUngrowValue = cell.ungrowValue;
				}
			}

			if(waterMax > minimumAllowedWaterSize) { //if at least one of the surrounding squares is water, we can grow from it

				//console.log('waterMax was:' +waterMax);
				//console.log('');
				var newWaterSize = waterMax - 1;

				//update plants
				//create a subgrid around the square in question
				var subgrid = [];
				var old_score = 0;

				for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {
					var x = (sz + i + a) % sz;

					subgrid[x] = [];

					for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

						var y = (sz + j + b) % sz;

						subgrid[x][y] = createCellFromNewGrid(x, y);
						old_score += getPointsFor(subgrid, x, y);

						if (a == 0 && b == 0) {
							if(newWaterSize >= minimumAllowedWaterSize) { //The stem isn't so long that it can grow no more
								//console.log('creating new water cellwith size: ' + newWaterSize + ' at i=' + i + ' and j=' + j);
								subgrid[x][y] = createCell(water, newWaterSize, newColor, newAge, newGrowValue, newUngrowValue);
							}
						}
					}
				}

				//update the subgrid's plants based on water
				var new_subgrid = [];
				var new_score = 0;

				for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

					x = (sz + i + a) % sz;
					new_subgrid[x] = [];

					for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

						y = (sz + j + b) % sz;

						if (subgrid[x][y].type == earth) {
							new_subgrid[x][y] = createCell(grass, 1, newColor, 1, newGrowValue, newUngrowValue);
						} else if(subgrid[x][y].type == grass) {
							new_subgrid[x][y] = createCell(grass, subgrid[x][y].size + 1, subgrid[x][y].color, subgrid[x][y].cellAge, newGrowValue, newUngrowValue); //TODO: create method
						} else {
							new_subgrid[x][y] = createCellFromGrid(subgrid, x, y);
						}

						new_score += getPointsFor(new_subgrid, x, y);
					}
				}

				//console.log('new: ' +new_score + ' old: '+old_score);
				if (new_score > old_score && (Math.floor(Math.random() * 1000) < new_subgrid[i][j].growValue)) {
					for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

						x = (sz + i + a) % sz;

						for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
							y = (sz + j + b) % sz;

							new_grid[x][y] = createCell(new_subgrid[x][y].type, new_subgrid[x][y].size, new_subgrid[x][y].color, new_subgrid[x][y].cellAge, new_subgrid[x][y].growValue, new_subgrid[x][y].ungrowValue);
						}
					}
				}




			}

		}

	}



			function tgrowAtLocation(i, j, l, r, u, d) {

				if (!isWater(i, j)) { //Only grow in a place that isn't already water/stem
					var waterMax = minimumAllowedWaterSize - 1;
					var newColor;
					var cell;
					var newAge;
					var newGrowValue;
					var newUngrowValue;

					console.time('surrounding water');
					if(isWater(r, j)){
						cell = grid[0][r][j];
						//console.log('cell size is: ' + cell.size);
						if(cell.size > waterMax)
						{
							//console.log('bigger cell up: ' + cell.size + "; max was: " + waterMax);
							waterMax = cell.size;
							newColor = cell.color; //TODO: deep copy?
							newAge = cell.cellAge;
							newGrowValue = cell.growValue;
							newUngrowValue = cell.ungrowValue;
						}
					}

					if(isWater(l, j)){
						cell = grid[0][l][j];
						if(cell.size > waterMax)
						{
							waterMax = cell.size;
							newColor = cell.color; //TODO: deep copy?
							newAge = cell.cellAge;
							newGrowValue = cell.growValue;
							newUngrowValue = cell.ungrowValue;
						}
					}

					if(isWater(i, u)){
						cell = grid[0][i][u];
						if(cell.size > waterMax)
						{
							//console.log('bigger cell up: ' + cell.size + "; max was: " + waterMax);
							waterMax = cell.size;
							newColor = cell.color; //TODO: deep copy?
							newAge = cell.cellAge;
							newGrowValue = cell.growValue;
							newUngrowValue = cell.ungrowValue;
						}
					}

					if(isWater(i, d)){
						cell = grid[0][i][d];
						if(cell.size > waterMax)
						{
							//console.log('bigger cell down: ' + cell.size + "; max was: " + waterMax);
							waterMax = cell.size;
							newColor = cell.color; //TODO: deep copy?
							newAge = cell.cellAge;
							newGrowValue = cell.growValue;
							newUngrowValue = cell.ungrowValue;
						}
					}

					console.timeEnd('surrounding water');

					if(waterMax > minimumAllowedWaterSize) { //if at least one of the surrounding squares is water, we can grow from it

						//console.log('waterMax was:' +waterMax);
						//console.log('');
						var newWaterSize = waterMax - 1;

						//update plants
						//create a subgrid around the square in question
						var subgrid = [];
						var old_score = 0;

						console.time('grow water');

						for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {
							var x = (sz + i + a) % sz;

							subgrid[x] = [];

							for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

								var y = (sz + j + b) % sz;

								subgrid[x][y] = createCellFromNewGrid(x, y);
								old_score += getPointsFor(subgrid, x, y);

								if (a == 0 && b == 0) {
									if(newWaterSize >= minimumAllowedWaterSize) { //The stem isn't so long that it can grow no more
										//console.log('creating new water cellwith size: ' + newWaterSize + ' at i=' + i + ' and j=' + j);
										subgrid[x][y] = createCell(water, newWaterSize, newColor, newAge, newGrowValue, newUngrowValue);
									}
								}
							}
						}
						console.timeEnd('grow water');

						console.time('grow plants');
						//update the subgrid's plants based on water
						var new_subgrid = [];
						var new_score = 0;
						var subgridCell;
						var newSubgridCell;

						for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

							x = (sz + i + a) % sz;
							new_subgrid[x] = [];

							for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

								y = (sz + j + b) % sz;

								subgridCell=subgrid[x][y];
								newSubgridCell = new_subgrid[x][y];

								if (subgridCell.type == earth) {
									console.time('new grass');
									newSubgridCell = createCell(grass, 1, newColor, 1, newGrowValue, newUngrowValue);
									console.timeEnd('new grass');
								} else if(subgrid[x][y].type == grass) {
									console.time('stronger grass');
									newSubgridCell = createCell(grass, subgridCell.size + 1, subgridCell.color, subgridCell.cellAge, newGrowValue, newUngrowValue); //TODO: create method
									console.timeEnd('stronger grass');
								} else {
									console.time('persist water');
									newSubgridCell = createCellFromGrid(subgrid, x, y);
									console.timeEnd('persist water');
								}

								console.time('add points');
								new_score += points[newSubgridCell.type];
								console.timeEnd('add points');
							}
						}
						console.log('');
						console.timeEnd('grow plants');

						//console.log('new: ' +new_score + ' old: '+old_score);
						console.time('save and write');
						if (new_score > old_score && (Math.floor(Math.random() * 1000) < new_subgrid[i][j].growValue)) {
							for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

								x = (sz + i + a) % sz;

								for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
									y = (sz + j + b) % sz;

									new_grid[x][y] = createCell(new_subgrid[x][y].type, new_subgrid[x][y].size, new_subgrid[x][y].color, new_subgrid[x][y].cellAge, new_subgrid[x][y].growValue, new_subgrid[x][y].ungrowValue);
								}
							}
						}
						console.timeEnd('save and write');



					}

				}

			}




	function ungrowAtLocation(i, j, l, r, u, d){

		var waterSizeArr = [];

		if(new_grid[r][j].type == water){
			waterSizeArr.push(new_grid[r][j].size);
		}

		if(new_grid[l][j].type == water){
			waterSizeArr.push(new_grid[l][j].size);
		}

		if(new_grid[i][u].type == water){
			waterSizeArr.push(new_grid[i][u].size);
		}

		if(new_grid[i][d].type == water){
			waterSizeArr.push(new_grid[i][d].size);
		}

		var waterMin = Math.min.apply(null, waterSizeArr);

		//update plants

		//create a subgrid around the square in question
		var subgrid = [];
		var old_score = 0;

		var water_count = 0;
		var rememberX;
		var rememberY;

		for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

			var x = (sz + i + a) % sz;
			subgrid[x] = [];

			for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

				var y = (sz + j + b) % sz;
				subgrid[x][y] = createCellFromGrid(new_grid, x, y);
				old_score += points[subgrid[x][y].type];

				if(a==0 && b==0){
					rememberX = x;
					rememberY = y;
				} else {
					if(subgrid[x][y].type == water) {
						water_count++;
					}
				}
			}
		}

		if (subgrid[rememberX][rememberY].size <= waterMin) { //only remove water if it's further from source than any surrounding water

			if (water_count > 0) {
				subgrid[rememberX][rememberY] = createCell(grass, water_count, subgrid[rememberX][rememberY].color, subgrid[rememberX][rememberY].cellAge, subgrid[rememberX][rememberY].growValue, subgrid[rememberX][rememberY].ungrowValue);
			} else {
				subgrid[rememberX][rememberY] = createCell(earth, 1, createRandomColor(), 1);
			}
		}


		//update the subgrid's plants based on water
		var new_subgrid = [];
		var new_score = 0;

		for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {
			x = (sz + i + a) % sz;
			new_subgrid[x] = [];
			for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
				y = (sz + j + b) % sz;

				if(subgrid[x][y].type == earth){
					new_subgrid[x][y] = createCell(earth, 1, createRandomColor(), 1, subgrid[x][y].growValue, subgrid[x][y].ungrowValue);
				} else if(subgrid[x][y].type == grass) {

					var newSize = subgrid[x][y].size - 1;

					if(newSize < 1) {
						new_subgrid[x][y] = createCell(earth, 1, createRandomColor(), 1, subgrid[x][y].growValue, subgrid[x][y].ungrowValue);
					} else {
						new_subgrid[x][y] = createCell(grass, newSize, subgrid[x][y].color, subgrid[x][y].cellAge, subgrid[x][y].growValue, subgrid[x][y].ungrowValue);
					}

				} else {
					new_subgrid[x][y] = createCellFromGrid(subgrid, x, y);
				}
				new_score += points[new_subgrid[x][y].type]; //TODO use method?
			}
		}

		if (new_score > old_score && (Math.floor(Math.random() * 1000) < new_subgrid[i][j].ungrowValue)) {

			for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

				x = (sz + i + a) % sz;

				for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
					y = (sz + j + b) % sz;
					new_grid[x][y] = createCell(new_subgrid[x][y].type, new_subgrid[x][y].size, new_subgrid[x][y].color, new_subgrid[x][y].cellAge, new_subgrid[x][y].growValue, new_subgrid[x][y].ungrowValue);
				}
			}
		}
	}



	function growAndUngrow(i, j)
	{
		//The % on these lines makes this space a torus
		var l, r, u, d;

		if(i == 0){
			l = sz - 1;
		} else {
			l = i - 1;
		}

		if(i == sz - 1){
			r = 0;
		} else {
			r = i + 1;
		}

		if( j == 0) {
			u = sz - 1;
		} else {
			u = j - 1;
		}

		if( j == sz - 1) {
			d = 0;
		} else {
			d = j + 1;
		}

		growCycles++;

		if(growCycles > 100000000000){
			tgrowAtLocation(i, j, l, r, u, d);
		} else {
			growAtLocation(i, j, l, r, u, d);
		}

		if (canUngrowAtLocation(i, j)) {
			ungrowAtLocation(i, j, l, r, u, d);
		}
		sporeAt(i, j);
	}

			/*
			function tgrowAndUngrow(i, j)
			{
				//The % on these lines makes this space a torus
				var l, r, u, d;

				if(i == 0){
					l = sz - 1;
				} else {
					l = i - 1;
				}

				if(i == sz - 1){
					r = 0;
				} else {
					r = i + 1;
				}

				if( j == 0) {
					u = sz - 1;
				} else {
					u = j - 1;
				}

				if( j == sz - 1) {
					d = 0;
				} else {
					d = j + 1;
				}
				console.time('grow');
				growAtLocation(i, j, l, r, u, d);
				console.timeEnd('grow');

				console.time('ungrow');
				if (canUngrowAtLocation(i, j)) {
					ungrowAtLocation(i, j, l, r, u, d);
				}
				console.timeEnd('ungrow');

				console.time('spore');
				sporeAt(i, j);
				console.timeEnd('spore');
			}
			*/


	/**
     *
     * */
    function iterate()
	{
		//console.time('refreshNewGrid');
		refreshNewGrid();
		//console.timeEnd('refreshNewGrid');

		//console.time('growAndUngrow');
			forEntireGrid(growAndUngrow);

		//console.timeEnd('growAndUngrow');

		//console.time('createAllCells');
		forEntireGrid(function(i, j) {
			grid[0][i][j] = createCellFromNewGrid(i, j); //TODO: optimize
		});
		//console.timeEnd('createAllCells');

		//console.time('update');
        update();
		//console.timeEnd('update');
		//console.log('');
		
		requestAnimationFrame(function(){
			setTimeout(function(){iterate();}, timeout);
		});
    }


	update();
	
	requestAnimationFrame(function(){
		iterate();
	});


	
</script>
    </head>
    <body style="background-color:black">
    </body>
</html>
