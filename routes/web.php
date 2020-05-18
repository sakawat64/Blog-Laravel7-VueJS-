<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('public.index');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//allpost
Route::get('/post','PostController@all_post')->middleware('auth');
Route::group(['middleware' => ['auth']], function () {
    Route::post('/savepost','PostController@save_post');
    Route::get('/delete/{id}','PostController@delete_post');
    Route::get('/editpost/{id}','PostController@edit_post');
    Route::post('/updatepost/{id}','PostController@update_post');
});
// Route::get('/{anypath}','HomeController@index')->where('path','.*');
//Category
Route::post('/add-category','CategoryController@add_category');
Route::get('/category','CategoryController@all_category');
Route::get('/category/{id}','CategoryController@delete_category');
Route::get('/editcategory/{id}','CategoryController@edit_category');
Route::post('/update-category/{id}','CategoryController@update_category');
Route::get('/deleteitem/{id}','CategoryController@selected_category');
//fronted
Route::get('/blogpost','BlogController@get_all_blog_post');
Route::get('/singlepost/{id}','BlogController@getpost_by_id');
Route::get('/categories','BlogController@all_category');
Route::get('/categorypost/{id}','BlogController@getpost_by_cat_id');
Route::get('/search','BlogController@search_post');
