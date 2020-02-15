<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("store", "ParticipantController@store");
Route::post("update/{id}", "ParticipantController@update");
Route::get("index", "ParticipantController@index");
Route::post("panel", "AdminPanelController@panel");
Route::post("destroy/{id}", "ParticipantController@destroy");
