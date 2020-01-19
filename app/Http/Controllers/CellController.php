<?php

namespace App\Http\Controllers;

use App\Models\Pixel;
use App\Services\CellService;
use Illuminate\Support\Collection;

class CellController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
   public function index()
   {
       //TODO: fetch data for cell

       //TODO: display data for cell

       for($x=0; $x<100; $x++){
           $pixels = app(CellService::class)->getPixels();
       }

       

       return response()->json($pixels);
   }


    
}
