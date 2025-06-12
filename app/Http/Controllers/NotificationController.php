<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Participant;
use ExpoSDK\Expo;
use ExpoSDK\ExpoMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifs = Notification::all();
        return Inertia::render('notifications/index', [
            'notifs' => $notifs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function sendNotifications()
    {
        $notifs = Notification::select('title', 'body', 'created_at')->latest()->get();
        return response()->json([
            'notifications' => $notifs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $expo = Expo::driver('file');
        $message = (new ExpoMessage([
            'title' => $request->title,
            'body' => $request->body,
        ]));

        $subs = $expo->getSubscriptions('default');
        //? to check : what happens if there're too many in one channel
        $expo->send($message)->toChannel('default')->push();

        // $expo->send($message)->to([
        //     'EXPOpeoazpeoa[ezieoxiajoezixa]'
        // ])->push();

        Notification::create([
            'title' => $request->title,
            'body' => $request->body,
            'sender' => Auth::user()->name,
            'receivers' => count($subs),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        $participant->update([
            'expoToken' => $request->pushToken,
        ]);

        $expo = Expo::driver('file');
        $channel = 'default';
        $expo->subscribe($channel, $request->pushToken);

        return response()->json([
            'message' => 'Updated Token Successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();
    }

    public function clearSubscribers()
    {
        $expo = Expo::driver('file');
        $subs = $expo->getSubscriptions('default');

        $expo->unsubscribe('default', $subs);

        return redirect()->back();
    }
}
