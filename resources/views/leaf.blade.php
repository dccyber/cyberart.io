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

    var sz = 400;
	var timeout = 1;
	
    var earth = 0;
    var grass = 1;
    var water = 2;

	var points = [];
	points[earth] = -3;
	points[water] = -10;
	points[grass] = 1;


        var canvas = document.getElementById('canvas');
        canvas.width = sz;
        canvas.height = sz;

	
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
		
		
	/**
     *
     **/
	function init_grid() {
	    for(var i=0; i<sz; i++){
			grid[0][i] = [];

			for(var j=0; j<sz; j++){
				grid[0][i][j] = {'type':earth, 'size':1};//Math.floor(Math.random() * 2); //earth

			}
	        
	    }

		//var middle = Math.floor(sz/2);
		//grid[0][middle][middle] = {'type':water,'size':7};

		var randX;
		var randY;

		for(var aaa=0; aaa<1; aaa++){
			randX = Math.floor(Math.random() * sz);
			randY = Math.floor(Math.random() * sz);
			grid[0][randX][randY] = {'type':water,'size':255};
		}
	}
	
	var ctx, id, g;
	init_grid();


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
	            
                var idx = 4 * (j + i * sz);

				if(grid_state == earth) {
					g[idx] = 25; //red
				} else {
					g[idx] = 0; //red
				}


				if(grid_state == grass){
					g[1 + idx] =  Math.min(grid_size*5 + 50, 255); //green
				} else if(grid_state == earth) {
					g[1 + idx] = 5; //green
				} else {
					g[1 + idx] = 0; //green
				}

				if(grid_state == water) {
					g[2 + idx] = Math.max(Math.floor(grid_size/2) + 50, 0); //blue
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

	/**
     *
     * */
    function iterate() {

		var z;
		//grid[1] = grid[0].slice();
		var new_grid = [];
		for( var m=0; m<sz; m++ ) {
			new_grid[m] = [];
			for (var n = 0; n < sz; n++) {
				new_grid[m][n] = {'type':grid[0][m][n].type, 'size':grid[0][m][n].size};
			}
		}

        for( var i=0; i<sz; i++ ){
            for( var j = 0; j < sz; j++ ){

				//console.log(i);

                //The % on these lines makes this space a torus
                var l = (sz + i - 1) % sz;
                var r = (sz + i + 1) % sz;
                var u = (sz + j - 1) % sz;
                var d = (sz + j + 1) % sz;

				/*
				var sum = grid[0][r][j] + grid[0][l][j] + grid[0][i][u] + grid[0][i][d] + grid[0][r][u] + grid[0][r][d] + grid[0][l][u] + grid[0][l][d];

				//A: >3
				//B: >4
				//C: A
				if(sum > 3) {
					new_grid[i][j] = 0;
				}
				*/


				if(grid[0][i][j].type != water && (grid[0][r][j].type == water || grid[0][l][j].type == water || grid[0][i][u].type == water || grid[0][i][d].type == water))
				{
					var waterSizeArr = [];

					if(grid[0][r][j].type == water){
						waterSizeArr.push(grid[0][r][j].size);
					}

					if(grid[0][l][j].type == water){
						waterSizeArr.push(grid[0][l][j].size);
					}

					if(grid[0][i][u].type == water){
						waterSizeArr.push(grid[0][i][u].size);
					}

					if(grid[0][i][d].type == water){
						waterSizeArr.push(grid[0][i][d].size);
					}

					var waterMax = Math.max.apply(null, waterSizeArr);
					var newWaterSize = waterMax - 1;
					//new_grid[i][j] = water;

					//update plants

					//create a subgrid around the square in question
					var subgrid = [];
					var old_score = 0;

					//new_grid[i][j] = water;


					for(var a=-4; a<5; a++){
						var x = (sz + i + a) % sz;
						subgrid[x] = [];
						for(var b=-4; b<5; b++){
							var y = (sz + j + b) % sz;
							//subgrid[x][y] = new_grid[x][y];
							subgrid[x][y] = {'type':new_grid[x][y].type, 'size':new_grid[x][y].size};
							old_score += points[subgrid[x][y].type];
							if(a==0 && b==0){
								if(newWaterSize > -1000) { //TODO: change to 0
									subgrid[x][y] = {'type':water, 'size':waterMax - 1};
								} else {
									subgrid[x][y] = {'type':new_grid[x][y].type, 'size':new_grid[x][y].size};
								}
							}
						}
					}



					//update the subgrid's plants based on water
					var new_subgrid = [];
					var new_score = 0;
					for(a=-4; a<5; a++){
						x = (sz + i + a) % sz;
						new_subgrid[x] = [];
						for(b=-4; b<5; b++){
							y = (sz + j + b) % sz;
							if(subgrid[x][y].type == earth){
								new_subgrid[x][y] = {'type':grass, 'size':1};
							} else if(subgrid[x][y].type == grass) {
								//new_subgrid[x][y] = subgrid[x][y];
								new_subgrid[x][y] = {'type':grass, 'size':subgrid[x][y].size + 1};
							} else {
								//new_subgrid[x][y] = subgrid[x][y];
								new_subgrid[x][y] = {'type':subgrid[x][y].type, 'size':subgrid[x][y].size};
							}
							new_score += points[new_subgrid[x][y].type];
						}
					}

					//console.log("new: " + new_score + ' old: ' + old_score);
					if(new_score > old_score && (Math.floor(Math.random() * 1000) < 500)){
						for(a=-4; a<5; a++){
							x = (sz + i + a) % sz;
							for(b=-4; b<5; b++){
								y = (sz + j + b) % sz;
								//new_grid[x][y] = new_subgrid[x][y];
								new_grid[x][y] = {'type':new_subgrid[x][y].type, 'size':new_subgrid[x][y].size};
								//new_grid[x][y] = subgrid[x][y];
							}
						}
					}

				}


				if(new_grid[i][j].type == water && new_grid[i][j].size < 255)
				{
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
					//new_grid[i][j] = water;

					//update plants

					//create a subgrid around the square in question
					var subgrid = [];
					var old_score = 0;

					//new_grid[i][j] = water;

					var water_count = 0;
					var rememberX;
					var rememberY;
					for(var a=-4; a<5; a++){
						var x = (sz + i + a) % sz;
						subgrid[x] = [];
						for(var b=-4; b<5; b++){
							var y = (sz + j + b) % sz;
							//subgrid[x][y] = new_grid[x][y];
							subgrid[x][y] = {'type':new_grid[x][y].type, 'size':new_grid[x][y].size};
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

					if(subgrid[rememberX][rememberY].size <= waterMin){ //only remove water if it's further from source than any surrounding water
						if(water_count > 0){
							subgrid[rememberX][rememberY] = {'type':grass, 'size':water_count};
						} else {
							subgrid[rememberX][rememberY] = {'type':earth, 'size':1};
						}
					}


					//update the subgrid's plants based on water
					var new_subgrid = [];
					var new_score = 0;
					for(a=-4; a<5; a++){
						x = (sz + i + a) % sz;
						new_subgrid[x] = [];
						for(b=-4; b<5; b++){
							y = (sz + j + b) % sz;
							if(subgrid[x][y].type == earth){
								new_subgrid[x][y] = {'type':earth, 'size':1};
							} else if(subgrid[x][y].type == grass) {
								var newSize = subgrid[x][y].size - 1;
								if(newSize < 1) {
									new_subgrid[x][y] = {'type':earth, 'size':1};
								} else {
									new_subgrid[x][y] = {'type':grass, 'size':newSize};
								}
								//new_subgrid[x][y] = subgrid[x][y];

							} else {
								//new_subgrid[x][y] = subgrid[x][y];
								new_subgrid[x][y] = {'type':subgrid[x][y].type, 'size':subgrid[x][y].size};
							}
							new_score += points[new_subgrid[x][y].type];
						}
					}

					//console.log("new: " + new_score + ' old: ' + old_score);
					if(new_score > old_score && (Math.floor(Math.random() * 1000) < 200)){
						for(a=-4; a<5; a++){
							x = (sz + i + a) % sz;
							for(b=-4; b<5; b++){
								y = (sz + j + b) % sz;
								//new_grid[x][y] = new_subgrid[x][y];
								new_grid[x][y] = {'type':new_subgrid[x][y].type, 'size':new_subgrid[x][y].size};
								//new_grid[x][y] = subgrid[x][y];
							}
						}
					}

				}


            }
        }

		/*
		for( var i=0; i<sz; i++ ){
			for( var j = 0; j < sz; j++ ){

				//The % on these lines makes this space a torus
				var l = (sz + i - 1) % sz;
				var r = (sz + i + 1) % sz;
				var u = (sz + j - 1) % sz;
				var d = (sz + j + 1) % sz;

				//populate grass
				/*
				var sum = grid[0][r][j] + grid[0][l][j] + grid[0][i][u] + grid[0][i][d] + grid[0][r][u] + grid[0][r][d] + grid[0][l][u] + grid[0][l][d];

				//A: ==1
				//B: >0 && <3
				//C: B
				if(sum > 0 && sum < 3) {
					new_grid[i][j] = 1;
				}
				*//*
			}
		}
		*/

		for( var k=0; k<sz; k++ ) {
			for (var p = 0; p < sz; p++) {
				grid[0][k][p] = {'type':new_grid[k][p].type, 'size':new_grid[k][p].size};
			}
		}
		
		
        update();
		
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
