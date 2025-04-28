<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Participant;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }



    public function chats($userId)
    {

        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->get();

        $participantIds = [];

        foreach ($messages as $message) {
            if ($message->sender_id == $userId) {
                $participantIds[] = $message->receiver_id;
            } else {
                $participantIds[] = $message->sender_id;
            }
        }

        $participantIds = array_unique($participantIds);

        $users = Participant::whereIn('id', $participantIds)->get();

        return response()->json([
            'status' => 200,
            'conversations' => $users,
        ]);
    }



    public function conversation($sender, $receiver)
    {

        $messages = Message::where(function ($query) use ($sender, $receiver) {
            $query->where('sender_id', $sender)->where('receiver_id', $receiver);
        })->orWhere(function ($query) use ($sender, $receiver) {
            $query->where('sender_id', $receiver)->where('receiver_id', $sender);
        })->orderBy('created_at', 'asc')->get();

        $mappedMessages = $messages->map(function ($message) use ($sender) {
            return [
                'id' => $message->id,
                'text' => $message->message,
                'sender' => $message->sender_id == $sender ? 'me' : 'user',
            ];
        });

        return response()->json([
            'status' => 200,
            'messages' => $mappedMessages,
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
        return response()->json([
            "status" => 200,
            "messages" => "hhhh"
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
