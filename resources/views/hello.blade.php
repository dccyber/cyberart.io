<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>chaoswindow</title>


        <script language="javascript">
            document.write('<canvas id="canvas" style="position:absolute; left:0; right:0; bottom:0; top:0; margin:auto;"></canvas>');
            document.write('<canvas id="canvas2" style="position:absolute; left:0; right:0; bottom:0; top:0; margin:auto;"></canvas>');
    var grid = [];
	grid[0] = [];
	grid[1] = [];
	grid[2] = [];
	
	var time_grid=[];
    var sz = 360;
	var timeout = 1;
	
    var earth = 0;
    var water = 1;
    var fire = 2;


        var canvas = document.getElementById('canvas');
        canvas.width = sz;
        canvas.height = sz;

        var canvas2 = document.getElementById('canvas2');
        canvas2.width = sz;
        canvas2.height = sz;

	
	var num_states = 3; //TODO replace earth/water/fire with arbitrary number of states
	
	//TODO: the indexes correspond to earth/water/fire (0/1/2). Make this clearer and generic
    //var red   = [0, 0, 255];
    //var green = [255, 0, 0];
    //var blue  = [0, 255, 0];
	var red = [];
	var green = [];
	var blue = [];
	
	for(var colorGenIdx = 0; colorGenIdx < 256; colorGenIdx++) {
		red[colorGenIdx] = [0, 0, colorGenIdx]; 
		green[colorGenIdx] = [colorGenIdx, 0, 0]; 
		blue[colorGenIdx] = [0, colorGenIdx, 0]; 
	}
	
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
			var time_depth = 3;
			
			time_grid[i] = [];
			for(var d=0; d<time_depth; d++){
				grid[d][i] = [];
				
				for(var j=0; j<sz; j++){
					time_grid[i][j] = [0,0,0];
				    grid[d][i][j] = 0; //earth
				   
				}
			}
	        
	    }
		
	}
	
	var ctx, ctx2, id, id2, g, h;
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

			ctx2 = document
                    .getElementById( 'canvas2' )
                    .getContext('2d');

			id2 = ctx2.createImageData( sz, sz ); // only do this once per page

			g  = id.data;                     // only do this once per page

			h = id2.data;
		}



		var gamma = function( input_val ) {
		    return ( input_val * input_val / 255 );
		};


		/**
         * param otc: old timegrid cell
         * */
		var evolve_timegrid_cell = function ( otc )
        {
			var delta = [
					<?php
						$colors = [
								rand(2, 7),
								rand(11, 17),
								rand(19, 29)
								];

							shuffle($colors);

							echo sprintf("%d, %d, %d", $colors[0], $colors[1], $colors[2]);
					?>
            ]; //make coprime for long and complex color cycles. make multiples for bolder color cycles

			return [
                (otc[0] + delta[0]) % 256,
                (otc[1] + delta[1]) % 256,
                (otc[2] + delta[2]) % 256
            ];
		};
		
	    for( var i = 0; i < sz; i++ ){
	        for( var j = 0; j < sz; j++ ){
				
				var oldest_grid_state = grid[2][i][j];
	            var previous_grid_state = grid[1][i][j];
				var newest_grid_state = grid[0][i][j];
	            
                var idx = 4 * (j + i * sz);
				
	            if( ( newest_grid_state == 2 && oldest_grid_state == 2 && previous_grid_state == 1 ) ||
                    ( newest_grid_state == 1 && oldest_grid_state == 1 )){
				
					var cell = time_grid[i][j];

					time_grid[i][j] = evolve_timegrid_cell( cell ); //todo multiple timegrids

					g[idx]     = gamma( cell[0] );
					g[idx + 1] = gamma( cell[1] );
					g[idx + 2] = gamma( cell[2] );
					
					h[idx]     = gamma( cell[1] );
					h[idx + 1] = gamma( cell[0] );
					h[idx + 2] = gamma( cell[2] );
					
	            } else {
				
					time_grid[i][j] = [
					        0, 0, 0
                    ]; //This cell no longer meets the criteria for inclusion in the set, so reset its timegrid to the null state
				
					var lowStrength = 0;
					var hiStrength = 0;
					
					var color_red_centered_on_previous = function(){
						var tw = [
						        0.25, 0.5, 0.25
                        ];

						return color_red( tw );
					};
					
					var color_red = function( time_weight ){
						var s = red[lowStrength];
						return color( s, time_weight );
					};
					
					var color = function(spectrum, time_weight) {
						return Math.floor(
						        spectrum[grid[0][i][j]] * time_weight[0] +
                                spectrum[grid[1][i][j]] * time_weight[1] +
                                spectrum[grid[2][i][j]] * time_weight[2]
                        );
					};
					
					g[idx] = color_red_centered_on_previous();
					
					g[1 + idx] = Math.floor(
					        green[hiStrength][newest_grid_state] * 0.25 +
                            green[hiStrength][previous_grid_state] * 0.5 +
                            green[hiStrength][oldest_grid_state] * 0.25
                    );//Math.round( green[newest_grid_state] * 0.8 + green[previous_grid_state] * 0.5 + green[oldest_grid_state] * 0.2);

					g[2 + idx] = Math.floor(
					        blue[lowStrength][newest_grid_state] * 0.25 +
                            blue[lowStrength][previous_grid_state] * 0.5 +
                            blue[lowStrength][oldest_grid_state] * 0.25
                    );//Math.round( blue[newest_grid_state]  * 0.8 + blue[previous_grid_state]  * 0.5 + blue[oldest_grid_state]  * 0.2);

					h[1 + idx]   = Math.floor(
					        red[lowStrength][newest_grid_state] * 0.4 +
                            red[lowStrength][previous_grid_state] * 0.2 +
                            red[lowStrength][oldest_grid_state] * 0.4
                    );//Math.round( red[newest_grid_state]   * 0.8 + red[previous_grid_state]   * 0.5 + red[oldest_grid_state]   * 0.2);

					h[idx] = Math.floor(
					        green[hiStrength][newest_grid_state] * 0.25 +
                            green[hiStrength][previous_grid_state] * 0.5 +
                            green[hiStrength][oldest_grid_state] * 0.25
                    );//Math.round( green[newest_grid_state] * 0.8 + green[previous_grid_state] * 0.5 + green[oldest_grid_state] * 0.2);

					h[2 + idx] = Math.floor(
					        blue[lowStrength][newest_grid_state] * 0.25 +
                            blue[lowStrength][previous_grid_state] * 0.5 +
                            blue[lowStrength][oldest_grid_state] * 0.25
                    );//Math
			
	            }
				
				g[3 + idx] = 255;
				h[3 + idx] = 100;
	        }
	    }
		
		ctx.putImageData( id, 0,0 );
		ctx2.putImageData( id2, 0,0 );
	}



    /**
     *
     * */
    function iterate_grid_history (){
        var time_depth = 3; //Number of time periods to track data for

        for( d = time_depth -1; d > 0; d-- ){
            grid[d] = grid [d - 1].slice();
        }
    }

	/**
     *
     * */
    function iterate() {

        for( var i=0; i<sz; i++ ){

			grid[0][i] = [];

            for( var j = 0; j < sz; j++ ){

                //The % on these lines makes this space a torus
                var l = (sz + i - 1) % sz;
                var r = (sz + i + 1) % sz;
                var u = (sz + j - 1) % sz;
                var d = (sz + j + 1) % sz;

                var waterOnAllSides = function(time){
                    return 1;
                };

                if( grid[1][l][j] == water ||
                    grid[1][r][j] == water ||
					grid[1][i][u] == water ||
					grid[1][i][d] == water ||
                    grid[1][i][j] == water
                     ) {
                    grid[0][i][j] = water;

                } else {
                    grid[0][i][j] = earth;
                }
				
                if( grid[1][l][j] == water &&
                    grid[1][r][j] == water &&
                    grid[1][i][u] == water &&
                    grid[1][i][d] == water &&
                    grid[1][i][j] == water
                     ) {
                    grid[0][i][j] = fire;
                }
            }
        }
		
		
        update();
		iterate_grid_history();
		
		requestAnimationFrame(function(){
			setTimeout(function(){iterate();}, timeout);
		});
    }



    //generates a random int between 0 (inclusive) and x (exclusive)
	//function r(x){
	//	return Math.floor((Math.random() * x));
	//}
	
	



	function framebutton() {
		var fps = document.getElementById( 'desiredframes' ).value;

		if( fps == 0 ){
			fps = 2;
		}

		timeout = Math.floor( 1000 / fps );
	}

	//grid[1]a][a] = 1;
	/*var zz=0;
	for(var xx=0; xx<4; xx++){
		for(var yy=0; yy<4; yy++){
			grid[1]a+xx*zz][a+yy*zz] = 1;
			grid[1]a+xx*zz][a-yy*zz] = 1;
			grid[1]a-xx*zz][a-yy*zz] = 1;
			grid[1]a-xx*zz][a+yy*zz] = 1;
			zz=zz+1;
		}
		zz=zz-1;
	}
	*/

			var a=Math.floor((sz)/2);


			<?php
					/*
echo
"var zz = 5;
var ww = 10;";*/
					$a = rand(1,10);//5
					$b = rand(1,10);//10
					$half = floor(360/2);

					$type = rand(1,2);

					$s = rand(1,12);
					$r = rand(1,12);

							switch($type){
								case 1:
									for($x=0; $x<$b; $x++){
										for($y=0; $y<$b; $y++){
											echo sprintf("grid[0][%d][%d] = 1;", $half+$x, $half+$y*$a);
											echo sprintf("grid[0][%d][%d] = 1;", $half+$x*$a, $half-$y);
											echo sprintf("grid[0][%d][%d] = 1;", $half-$x, $half-$y*$a);
											echo sprintf("grid[0][%d][%d] = 1;", $half-$x*$a, $half+$y);
										}
									}
									break;
								case 2:
									//echo sprintf("grid[0][%d][%d] = 1;", $half+$r, $half+$s);
									echo sprintf("grid[0][%d][%d] = 1;", $half+$s-$r, $half+$r);
									echo sprintf("grid[0][%d][%d] = 1;", $half+$s, $half+$r-$s);
									echo sprintf("grid[0][%d][%d] = 1;", $half+$s+$r, $half+$r);
									echo sprintf("grid[0][%d][%d] = 1;", $half+$s, $half+$r+$s);
									break;
							}

		?>

/*
	for(var xx=0; xx<ww; xx++){
		for(var yy=0; yy<ww; yy++){
			grid[0][a+xx*1][a+yy*zz] = 1;
			grid[0][a+xx*zz][a-yy*1] = 1;
			grid[0][a-xx*1][a-yy*zz] = 1;
			grid[0][a-xx*zz][a+yy*1] = 1;
		}
	}
*/
	
	//grid[0][0][0] = 1;
	//grid[0][3][8] = 1;

			//grid[0][0][0] = 1;
			//grid[0][5][5] = 1;

			/*grid[0][0][0] = 1;
			grid[0][a+9][a+9] = 1;
			grid[0][a+5][a+9] = 1;
			grid[0][a+4][a+7] = 1;
			grid[0][a-9][a-9] = 1;
			grid[0][a-9][a-5] = 1;
			grid[0][a-7][a-4] = 1;*/
	
	//grid[1]a+123][a+164] = 1;
	//grid[1]a+3][a+3] = 1;
	//grid[1]a+7][a+7] = 1;
	//grid[1]a-2][a+5] = 1;
	//grid[1]a+3][a-3] = 1;
	//grid[1]a-3][a-3] = 1;
/*	grid[1]a-2][a+1] = 1;
	grid[1]a-1][a-2] = 1;
	grid[1]a+2][a-1] = 1;
	grid[1]a+1][a+2] = 1;
	
	grid[1]a-3][a] = 1;
	grid[1]a][a-3] = 1;
	grid[1]a+3][a] = 1;
	grid[1]a][a+3] = 1;
	
	grid[1]a-4][a+2] = 1;
	grid[1]a-2][a-4] = 1;
	grid[1]a+4][a-2] = 1;
	grid[1]a+2][a+4] = 1;
	*/




	iterate_grid_history();
	update();
	
	requestAnimationFrame(function(){
		iterate();
	});


	
</script>
    </head>
    <body style="background-color:black">
    </body>
</html>
