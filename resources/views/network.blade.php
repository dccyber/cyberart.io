<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>chaoswindow</title>
    </head>
    <body style="background-color:whitesmoke">
	<div class='container'>
		<?php

			
			

$total_epochs = 0;
		// Create a new neural network with 3 input neurons,
		// 4 hidden neurons, and 1 output neuron
		$n = new \App\Services\NeuralNetwork([3, 6, 4, 8, 1]);
		$n->setVerbose(false);

		// Add test-data to the network. In this case,
		// we want the network to learn the 'XOR'-function
			//Same or Different?
		//$n->addTestData([1, 1, 1], [1, 1]); //same, gt0
/*
		$n->addTestData([-1, 1, 1], [-1, 1]);
		$n->addTestData([-1, -1, -1], [1, -1]);
		$n->addTestData([19,19,19], [1,1]);
		$n->addTestData([-1, -1, 1], [-1, -1]);
		//$n->addTestData([1,  1, -2], [-1, 0]);
		$n->addTestData([ 1, 1, 2], [-1, 1]);
		//$n->addTestData([ 2,  2, -4], [-1, 0]);
		$n->addTestData([4, 4, 4], [1, 1]);
		$n->addTestData([1,  7, 9], [-1, 1]);
		$n->addTestData([ 7, 1, 2], [-1, 1]);
		$n->addTestData([ 2.2,  2.2, 2.2], [1, 1]);
		$n->addTestData([ 3, 5, -10], [-1, -1]);
		$n->addTestData([ -3, -5, 10], [-1, 1]);
		$n->addTestData([ -3, -5, -10], [-1, -1]);
*/

		$n->addTestData([-1, 1, 1], [1]);
		$n->addTestData([-1, -1, -1], [-1]);
		$n->addTestData([19,19,19], [1]);
		$n->addTestData([19,1,190], [1]);
		$n->addTestData([-1, -1, 1], [-1]);
		//$n->addTestData([1,  1, -2], [-1, 0]);
		$n->addTestData([ 1, 1, -1.5], [1]);
		//$n->addTestData([ 2,  2, -4], [-1, 0]);
		$n->addTestData([4, 4, 4], [1]);
		$n->addTestData([-9,  7, 1], [-1]);
		$n->addTestData([ 7, 1, 2], [1]);
		$n->addTestData([ 2.2,  2.2, -4.5], [-1]);
		$n->addTestData([ 3, -10, 5], [-1]);
		$n->addTestData([ -3, -5, 10], [1]);
		$n->addTestData( [0.2, 0.1, -0.35], [-1]);
		$n->addTestData( [0.2, 0.1, -0.25], [1]);
		$n->addTestData( [10.2, 12.1, -22.2], [1]);
			$n->addTestData( [100.2, 120.1, -220.31], [-1]);


		for($a=0; $a<15; $a++){
			$same = (rand(0, 1) == 1);
			if($same){
				$b = rand(0, 2000) - 1000;
				$data = [$b, $b, $b];
			} else {
				$data = [
						rand(0, 2000) - 1000,
						rand(0, 2000) - 1000,
						rand(0, 2000) - 1000
				];
			}

			$sum = array_sum($data);
			if($sum < 0){
				$pos = -1;
			} else if ($sum == 0) {
				continue;
				$pos = 0;
			} else {
				$pos = 1;
			}

			$expected = [
					$pos
			];

			$n->addTestData($data, $expected);

		}


		//$n->addTestData([ -3, -3, -3], [1]);

			/*
		$n->addTestData([-1, -1, 1], [-1]);
		$n->addTestData([-1,  1, 1], [1]);
		$n->addTestData([ 1, -1, 1], [1]);
		$n->addTestData([ 1,  1, 1], [-1]);
			*/

		// we try training the network for at most $max times
		$max = 15;
		$i = 0;

		//echo "<h1>Learning the XOR function</h1>";
		// train the network in max 1000 epochs, with a max squared error of 0.01
		while (!($success = $n->train(1000, 0.01)) && ++$i<$max) {
		//	echo "Round $i: No success...<br />";
		}

		// print a message if the network was succesfully trained
		if ($success) {
			$total_epochs += $n->getEpoch();
		//	echo "Success in $epochs training rounds!<br />";
		}

		echo "<h2>Result</h2>";
		echo "<div class='result'>";
		// in any case, we print the output of the neural network
		for ($i = 0; $i < count($n->trainInputs); $i ++) {
			$output = $n->calculate($n->trainInputs[$i]);
			echo "<div>Testset $i; ";
			echo "given input = (".implode(", ", $n->trainInputs[$i]).") ";
			echo "expected output = (".implode(", ", $n->trainOutput[$i]).") ";
			echo "output from neural network = (".implode(", ", $output).")\n</div>";
		}




			$imp = [100.2, 120.1, -220.31];
		$output = $n->calculate($imp);
		echo "<div>Testset X; ";
		echo "given input = (".implode(", ", $imp).") ";
		echo "expected output = (".implode(", ", [1]).") ";
		echo "output from neural network = (".implode(", ", $output).")\n</div>";
		echo "</div>";
		echo "<h2>Internal network state</h2>";
		$n->showWeights($force=true);

		// Now, play around with some of the network's parameters a bit, to see how it
		// influences the result
		$learningRates = array(0.1, 0.25, 0.5, 0.75, 1);
		$momentum = array(0.2, 0.4, 0.6, 0.8, 1);
		$rounds = array(100, 500, 1000, 2000);
		$errors = array(0.1, 0.05, 0.01, 0.001);

		echo "<h1>Playing around...</h1>";
		echo "<p>The following is to show how changing the momentum & learning rate,
in combination with the number of rounds and the maximum allowable error, can
lead to wildly differing results. To obtain the best results for your
situation, play around with these numbers until you find the one that works
best for you.</p>";
		echo "<p>The values displayed here are chosen randomly, so you can reload
the page to see another set of values...</p>";

		for ($j=0; $j<10; $j++) {
			// no time-outs
			set_time_limit(0);

			$lr = $learningRates[array_rand($learningRates)];
			$m = $momentum[array_rand($momentum)];
			$r = $rounds[array_rand($rounds)];
			$e = $errors[array_rand($errors)];
			echo "<h2>Learning rate $lr, momentum $m @ ($r rounds, max sq. error $e)</h2>";
			$n->clear();
			$n->setLearningRate($lr);
			$n->setMomentum($m);
			$i = 0;
			while (!($success = $n->train($r, $e)) && ++$i<$max) {
				echo "Round $i: No success...<br />";
				flush();
			}

			// print a message if the network was succesfully trained
			if ($success) {
				$epochs = $n->getEpoch();
				echo "Success in $epochs training rounds!<br />";

				echo "<div class='result'>";
				for ($i = 0; $i < count($n->trainInputs); $i ++) {
					$output = $n->calculate($n->trainInputs[$i]);
					echo "<div>Testset $i; ";
					echo "expected output = (".implode(", ", $n->trainOutput[$i]).") ";
					echo "output from neural network = (".implode(", ", $output).")\n</div>";
				}
				echo "</div>";
			}
		}
		?>
	</div>
    </body>
</html>
