<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/chaos', function () {
    return view('hello');
});

Route::get('/leaf', function () {
    return view('leaf');
});

Route::get('/life', function () {
    return view('life');
});

Route::get('/sound', function () {
    return view('sound');
});

Route::get('/mold', function () {
    return view('mold');
});


Route::get('/network', function () {
    return view('network');
});

Route::get('/cell', 'CellController@index');


Route::get('/docs', function () {
    return view('docs');
});

Route::any('{all}', function () {
    return view('app');
})
    ->where(['all' => '.*']);