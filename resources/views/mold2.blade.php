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

        var sz = 500;
        var timeout = 1;

        var distanceWaterReaches = 4; //This is how far away water can support life
        var minimumAllowedWaterSize = -1000; //When water 'size' reaches this level, it can no longer grow
        var startingWaterSize = 255; //An organism starts with this water size as its seed

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
         * Create a cell
         *
         * @param cellType An integer representing type of cell (e.g. earth, water, leaf)
         * @cellStrength An integer representing the 'strength' of a cell. Used differently for water and leaf
         **/
        function createCell(cellType, cellStrength)
        {
            return {'type':cellType, 'size':cellStrength}; //TODO: change the keys for this later
        }

        /**
         *
         **/
        function init_grid() {
            for(var i=0; i<sz; i++){
                grid[0][i] = [];

                for(var j=0; j<sz; j++){
                    grid[0][i][j] = createCell(earth, 1);

                }

            }

            //var middle = Math.floor(sz/2);
            //grid[0][middle][middle] = {'type':water,'size':7};

            var randX;
            var randY;

            for (var aaa = 0; aaa < 15; aaa++){
                randX = Math.floor(Math.random() * sz);
                randY = Math.floor(Math.random() * sz);
                grid[0][randX][randY] = createCell(water, startingWaterSize);
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


        function isWater(thisGrid, i, j){
            return thisGrid[i][j].type == water
        }


        function hasAdjacentWater(thisGrid, i, j){
            //The % on these lines makes this space a torus
            var l = (sz + i - 1) % sz;
            var r = (sz + i + 1) % sz;
            var u = (sz + j - 1) % sz;
            var d = (sz + j + 1) % sz;

            return (isWater(thisGrid, r, j) || isWater(thisGrid, l, j) || isWater(thisGrid, i, u) || isWater(thisGrid, i, d));
        }


        function canGrowAtLocation(thisGrid, i, j){
            return !isWater(thisGrid, i, j) && hasAdjacentWater(thisGrid, i, j);
        }


        function canUngrowAtLocation(thisGrid, i, j)
        {
            return !isWater(thisGrid, i, j) && thisGrid[i][j].size < startingWaterSize; //Don't ungrow in first round
        }


        function getWaterSize(i, j){

            //The % on these lines makes this space a torus
            var l = (sz + i - 1) % sz;
            var r = (sz + i + 1) % sz;
            var u = (sz + j - 1) % sz;
            var d = (sz + j + 1) % sz;

            var waterSizeArr = [];

            if(isWater(grid[0], r, j)){
                waterSizeArr.push(grid[0][r][j].size);
            }

            if(isWater(grid[0], l, j)){
                waterSizeArr.push(grid[0][l][j].size);
            }

            if(isWater(grid[0], i, u)){
                waterSizeArr.push(grid[0][i][u].size);
            }

            if(isWater(grid[0], i, d)){
                waterSizeArr.push(grid[0][i][d].size);
            }

            var waterMax = Math.max.apply(null, waterSizeArr);
            return waterMax - 1;
        }





        function createCellFromGlobalGrid(i, j) {
            return createCellFromGrid(grid[0], i, j);
        }


        function createCellFromGrid(thisGrid, i, j) {
            var gridCell = thisGrid[i][j];
            return createCell(gridCell.type, gridCell.size);
        }


        function getPointsFor(thisGrid, i, j)
        {
            return points[thisGrid[i][j].type];
        }


        function growAtLocation(thisGrid, i, j) {
            var newWaterSize = getWaterSize(i, j);

            //update plants
            //create a subgrid around the square in question
            var subgrid = [];
            var old_score = 0;

            for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

                var x = (sz + i + a) % sz;
                subgrid[x] = [];

                for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {

                    var y = (sz + j + b) % sz;

                    subgrid[x][y] = createCellFromGrid(thisGrid, x, y);
                    old_score += getPointsFor(subgrid, x, y);

                    if (a == 0 && b == 0) {
                        if(newWaterSize > minimumAllowedWaterSize) {
                            subgrid[x][y] = createCell(water, newWaterSize);
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
                        new_subgrid[x][y] = createCell(grass, 1);
                    } else if(subgrid[x][y].type == grass) {
                        new_subgrid[x][y] = createCell(grass, subgrid[x][y].size + 1); //TODO: create method
                    } else {
                        new_subgrid[x][y] = createCellFromGrid(subgrid, x, y);
                    }

                    new_score += getPointsFor(new_subgrid, x, y);
                }
            }

            if (new_score > old_score && (Math.floor(Math.random() * 1000) < 500)) {
                for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

                    x = (sz + i + a) % sz;

                    for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
                        y = (sz + j + b) % sz;

                        thisGrid[x][y] = createCellFromGrid(new_subgrid, x, y);
                    }
                }
            }
        }


        function ungrowAtLocation(thisGrid, i, j)
        {
            //The % on these lines makes this space a torus
            var l = (sz + i - 1) % sz;
            var r = (sz + i + 1) % sz;
            var u = (sz + j - 1) % sz;
            var d = (sz + j + 1) % sz;

            var waterSizeArr = [];

            if(thisGrid[r][j].type == water){
                waterSizeArr.push(thisGrid[r][j].size);
            }

            if(thisGrid[l][j].type == water){
                waterSizeArr.push(thisGrid[l][j].size);
            }

            if(thisGrid[i][u].type == water){
                waterSizeArr.push(thisGrid[i][u].size);
            }

            if(thisGrid[i][d].type == water){
                waterSizeArr.push(thisGrid[i][d].size);
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
                    subgrid[x][y] = createCellFromGrid(thisGrid, x, y);
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
                    subgrid[rememberX][rememberY] = createCell(grass, water_count);
                } else {
                    subgrid[rememberX][rememberY] = createCell(earth, 1);
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
                        new_subgrid[x][y] = createCell(earth, 1);
                    } else if(subgrid[x][y].type == grass) {

                        var newSize = subgrid[x][y].size - 1;

                        if(newSize < 1) {
                            new_subgrid[x][y] = createCell(earth, 1);
                        } else {
                            new_subgrid[x][y] = createCell(grass, newSize);
                        }

                    } else {
                        new_subgrid[x][y] = createCellFromGrid(subgrid, x, y);
                    }
                    new_score += points[new_subgrid[x][y].type];
                }
            }

            if (new_score > old_score && (Math.floor(Math.random() * 1000) < 200)) {

                for (var a = -distanceWaterReaches; a <= distanceWaterReaches; a++) {

                    x = (sz + i + a) % sz;

                    for (var b = -distanceWaterReaches; b <= distanceWaterReaches; b++) {
                        y = (sz + j + b) % sz;
                        thisGrid[x][y] = createCellFromGrid(new_subgrid, x, y);
                    }
                }
            }
        }


        /**
         *
         * */
        function iterate()
        {
            var new_grid = [];

            for (var m = 0; m < sz; m++ ) {

                new_grid[m] = [];

                for (var n = 0; n < sz; n++) {
                    new_grid[m][n] = createCellFromGlobalGrid(m, n);
                }
            }


            for (var i = 0; i < sz; i++ ) {
                for (var j = 0; j < sz; j++ ) {
                    if (canGrowAtLocation(grid[0], i,j)) {
                        growAtLocation(new_grid, i, j);
                    }


                    if(canUngrowAtLocation(new_grid, i, j)) {
                        ungrowAtLocation(new_grid, i, j);
                    }
                }
            }

            for( var k=0; k<sz; k++ ) {
                for (var p = 0; p < sz; p++) {
                    grid[0][k][p] = createCellFromGrid(new_grid, k, p);
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
