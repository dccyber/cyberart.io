<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pixel
 * @package App\Models
 */
class Pixel extends Model
{

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','health', 'maxhealth','attack', 'defense', 'speed', 'resources', 'generation', 'parent'];

    /**
     * @return array
     */
    public function getData() :array
    {
        return [
            'name' => $this->name,
            'health'  => $this->health,
            'maxhealth' => $this->maxhealth,
            'attack'  => $this->attack,
            'defense' => $this->defense,
            'speed'   => $this->speed,
            'resources' => $this->resources,
            'generation' => $this->generation,
            'parent' => $this->parent
        ];
    }


    /**
     * 
     */
    public function seed($maxHealth = 45, $speed = 45, $def = 45, $atk = 45) {
        $g =  new \Nubs\RandomNameGenerator\Alliteration();

        $this->name = $g->getName();
        $this->maxhealth = $this->randSeed($maxHealth);
        $this->health = $this->maxhealth;

        $this->attack = $this->randSeed($atk);
        $this->defense = $this->randSeed($def);
        $this->speed = $this->randSeed($speed);
        $this->generation = 1;
        $this->resources = 1;
        $this->parent = null;

        $this->save();
    }


    /**
     * Reteurn false if dead
     * @param float $damage
     * @return bool
     */
    public function takeDamage(float $damage)
    {
        $this->health = $this->health - floor($damage);

        $this->save();

        return ($this->health > 0);
    }


    public function attack(Pixel $b) :bool
    {
        $attackDamage = 10;
        $damage = floor(1 + $attackDamage * ($this->attack / $b->defense));
        $survived = $b->takeDamage($damage);

        if (!$survived) {
            $this->resources = $this->resources + $b->resources;
            $b->resources = 0;
            $b->die();
            $this->save();
        }

        return $survived;
    }

    public function heal()
    {
        if($this->resources > 4 && $this->maxhealth - $this->health > 10){
            $this->resources -= 1;
            $this->health += 10;
        }
    }

    public function multiply()
    {
        if($this->resources < 5) {
            return;
        }

        while($this->resources > 4) {


            $this->resources = $this->resources - 2;
            $this->save();

            //dd($this->name);
            $mods = [
                - 2 + rand(0, 4),
                - 2 + rand(0, 4),
                - 2 + rand(0, 4),
                - 2 + rand(0, 4)
            ];

            //$modSum = $mods[0] + $mods[1] + $mods[2] + $mods[3];

           // if($this->defense + $mods[2] < 1) {
            //    $newDefense = $this->defense + $mods[2] + 5;
           //     $modSum += 5;
            //} else {
                $newDefense = $this->defense + $mods[2];
           //}

            //if($this->speed + $mods[3] < 1) {
            //    $newSpeed = $this->speed + $mods[3] + 5;
            //    $modSum += 5;
            //} else {
                $newSpeed = $this->speed + $mods[3];
            //}

           // while($modSum != 0) {
           //     $i = rand(0,3);
           //     $change = ($modSum / abs($modSum));
           //     $mods[$i] = $mods[$i] - $change;
            //    $modSum = $modSum - $change;
           // }

            $health = $this->maxhealth + $mods[0];

            $clone = Pixel::create([
                'name' => $this->name,
                'health' => $health,
                'maxhealth' => $health,
                'attack' => $this->attack + $mods[1],
                'defense' => $newDefense,
                'speed' => $newSpeed,
                'generation' => $this->generation + 1,
                'resources' => 2,
                'parent' => $this->id
            ]);
        }
    }

    public function eat()
    {
        $total = $this->maxhealth + $this->speed + $this->defense + $this->attack;
        $eat = floor($total / 150 - 2);
        $this->resources = max(0, $this->resources - $eat);
        $this->save();

    }


    private function die()
    {
        $this->delete();
    }


    /**
     * @return int
     */
    private function randSeed($center = 45) :int
    {
        return ($center + rand(0, 10));
    }
}