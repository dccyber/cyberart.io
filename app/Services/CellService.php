<?php

namespace App\Services;


use App\Models\Pixel;
use Illuminate\Support\Collection;

class CellService
{

    public function getPixels() :Collection
    {

        $pixels = $this->loadPixels();

        if($pixels->isEmpty()){
            $this->createPixels();
            $pixels = $this->loadPixels();
        } else {

            $pixelCount = 0;
            $maxHealthTotal = 0;
            $speedTotal = 0;
            $atkTotal = 0;
            $defTotal = 0;

            //TODO: pixel battle!!
            while(!$pixels->isEmpty()) {
                $a = $pixels->shift();
                $b = $pixels->shift();

                if (!empty($a) && !empty($b)) {
                    $pixelCount += 2;
                    $speedTotal += $a->speed + $b->speed;
                    $atkTotal += $a->attack + $b->attack;
                    $defTotal += $a->defense + $b->defense;
                    $maxHealthTotal += $a->maxhealth + $b->maxhealth;
                    if( !(rand(0,99) % 2) ) {
                        $this->battle($a, $b);
                    }
                }
            }

            $speed = $pixelCount == 0 ? null : floor(($speedTotal / $pixelCount) + 0.5);
            $maxHealth = $pixelCount == 0 ? null :floor(($maxHealthTotal / $pixelCount) + 0.5);
            $atk = $pixelCount == 0 ? null :floor(($atkTotal / $pixelCount) + 0.5);
            $def = $pixelCount == 0 ? null :floor(($defTotal / $pixelCount) + 0.5);

            $pixels = $this->loadPixels();

            foreach($pixels as $pixel) {
                $pixel->heal();
                $pixel->multiply();
                $pixel->eat();
            }

            //$this->createPixel($maxHealth, $speed, $atk, $def);

            $pixels = $this->loadPixels();
        }

        return $pixels;
    }


    private function loadPixels() :Collection
    {
        return app(Pixel::class)->all()->shuffle();
    }


    /**
     * @return array
     */
    private function createPixel($maxHealth = 45, $speed = 45, $atk = 45, $def = 45)
    {
        $pixel = new Pixel();
        $pixel->seed($maxHealth, $speed, $atk, $def);
    }


    /**
     * @return Collection
     */
    private function createPixels() :Collection
    {
        for($x=0; $x<4; $x++) {
            $this->createPixel();
        }
    }

    private function battle(Pixel $a, Pixel $b)
    {
        //swap a and b if a is slower than b. Then, A always goes first
        if($a->speed < $b->speed) {
            $c = $b;
            $b = $a;
            $a = $c;
        }

        $survived = true;

        while($survived) {

            $survived = $a->attack($b);

            $c = $b;
            $b = $a;
            $a = $c;
        }
    }

}