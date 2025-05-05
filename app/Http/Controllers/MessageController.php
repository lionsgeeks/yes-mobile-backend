<?php

namespace App\Http\Controllers;

use Ably\AblyRest;
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


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $this->validateToken($request);

        $message = Message::create([
            "sender_id" => $request->sender,
            "receiver_id" => $request->receiver,
            "message" => $request->message,
        ]);

        // Broadcast to receiver in private channel
        $ably = new AblyRest(env('ABLY_KEY'));
        $channel = $ably->channel("private-chat:{$request->receiver}");

        $channel->publish('new-message', [
            'id' => $message->id,
            'text' => $message->message,
            'sender' => $request->sender,
            'created_at' => $message->created_at->toDateTimeString(),
        ]);

        return $this->conversation($request->sender, $request->receiver);

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


    //* hna  kanjbed  l messagat  dyal  chi 2 
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



    //* hna  kanjbed   l convo li deja dwa m3ahom chi wa7d

    public function chats($userId)
    {
        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    
        $participants = [];
    
        foreach ($messages as $message) {
            $otherUserId = $message->sender_id == $userId
                ? $message->receiver_id
                : $message->sender_id;
    
            // Only keep the first (latest) message per participant
            if (!isset($participants[$otherUserId])) {
                $participants[$otherUserId] = [
                    'user' => Participant::find($otherUserId),
                    'last_message' => $message,
                ];
            }
        }
    
        $conversations = array_values($participants); // reset keys
    
        // sort again to ensure order by latest message
        usort($conversations, function ($a, $b) {
            return strtotime($b['last_message']->created_at) - strtotime($a['last_message']->created_at);
        });
    
        return response()->json([
            'status' => 200,
            'conversations' => $conversations,
        ]);
    }
    
}
