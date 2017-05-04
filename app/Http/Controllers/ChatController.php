<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use App\Events\ChatMessage;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Send chat message
     * @param $request
     * @return void
     */
    public function sendMessage(Request $request)
    {
        $message = [
            "id" => $request->userid,
            "sourceuserid" => Auth::user()->id,
            "name" => Auth::user()->name,
            "message" => $request->message
        ];
        event(new ChatMessage($message));
        return "true";
    }

    public function chatPage()
    {
       
        $users = User::take(10)->get();
        return view('chat',['users'=> $users]);
    }
}
