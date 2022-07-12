<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function index(Request $request)
    {
        switch ($request->method()) {
            case 'POST':
                DB::table('poll')->insert([
                    'title'=>$request->title,
                    'description'=>$request->description,
                    'deadline'=>$request->deadline,
                    'choices'=>json_encode($request->choices),
                ]);
                return response()->json(['message'=>'data berhasil ditambahkan','status'=>'success'], 200);
                break;

            case 'GET':
                $data = DB::table('poll')->get();
                return response()->json(['data'=>$data], 200);
                break;

            default:
                break;
        }
    }

    public function detail(Request $request,$id)
    {
        $data = DB::table('poll')->where('id',$id)->first();
        return response()->json(['data'=>$data], 200);
    }

    public function delete(Request $request,$id)
    {
        $data = DB::table('poll')->where('id',$id)->delete();
        return response()->json(['message'=>'data berhasil dihapus','status'=>'success'], 200);
    }

    public function vote(Request $request,$id,$choices_id)
    {
        DB::table('vote')->insert([
            'poll_id'=>$id,
            'choices_id'=>$choices_id
        ]);

        $data = DB::table('poll')->where('id',$id)->first();
        $data = json_decode($data->choices,TRUE);

        return response()->json(['message'=>'data berhasil ditambahkan','status'=>'success','data'=>$data[$choices_id]], 200);
    }
}
