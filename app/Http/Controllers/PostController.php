<?php

namespace App\Http\Controllers;
use Auth;
use Image;
use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    
    public function all_post()
    {
        $posts = Post::with('user','category')->orderby('id','desc')->get();
      //  $posts = Post::all();
        return response()->json([
            'posts' => $posts
        ],200);
    }
    public function save_post(Request $request)
    {
        $this->validate($request,[
            'title' => 'required|min:2|max:50',
            'description' => 'required|min:2|max:50',
            'cat_id' => 'required'
        ]);
      $strpos = strpos($request->photo,';');
      $sub = substr($request->photo,0,$strpos);
      $ex = explode('/',$sub)[1];
      $name = time() .".". $ex;
      $img = Image :: make($request->photo)->resize(300,200);
      $upload_path = public_path()."/uploadimage/";
      $img->save($upload_path.$name);
      $newname = "uploadimage/$name";
      $post = new Post;
      $post->title = $request->title;
      $post->description = $request->description;
      $post->cat_id = $request->cat_id;
      $post->user_id = Auth::user()->id;
      $post->photo = $newname;
      $post->save();
    }
    public function delete_post($id)
    {
        $post= Post :: find($id);
       // $image_path = public_path()."/uploadimage/";
       //$image = $image_path.$post->photo;
       $image = $post->photo;
       if(file_exists($image)){
           @unlink($image);
       }
        $post->delete();
    }
    public function edit_post($id)
    {
        $post = Post :: find($id);
        return response()->json([
            'post'=>$post
        ],200);
    }
    public function update_post(Request $request,$id)
    {
        $post = Post :: find($id);
        $this->validate($request,[
            'title' => 'required|min:2|max:300',
            'description' => 'required|min:2|max:1000',
            'cat_id' => 'required'
        ]);
      if($request->photo != $post->photo)
      {
        $strpos = strpos($request->photo,';');
        $sub = substr($request->photo,0,$strpos);
        $ex = explode('/',$sub)[1];
        $name = time() .".". $ex;
        $img = Image :: make($request->photo)->resize(300,200);
        $upload_path = public_path()."/uploadimage/";
        $img->save($upload_path.$name);
        $newname = "uploadimage/$name";
        $image = $post->photo;
        if(file_exists($image)){
            @unlink($image);
        }
      }
      else{
        $newname = $post->photo;
      }
      $post->title = $request->title;
      $post->description = $request->description;
      $post->cat_id = $request->cat_id;
      $post->user_id = Auth::user()->id;
      $post->photo = $newname;
      $post->save();
    }
}
