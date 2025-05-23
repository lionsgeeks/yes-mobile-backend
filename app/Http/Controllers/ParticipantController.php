<?php

namespace App\Http\Controllers;

use Ably\AblyRest;
use App\Mail\SignInMail;
use App\Models\CurrentUser;
use App\Models\Participant;
use App\Models\Programe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = Participant::where('role', 'visitor')->with('interesets')->get();
        return Inertia::render('participants/index', [
            'participants' => $participants,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $role = 'visitor')
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $file = $request->file('image');
        if ($file) {
            $fileName = $file->store('images/participants', 'public');
        }

        // TODO: uncomment code bellow for random password + email
        // $password = Str::random(8);

        $participant = Participant::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('lionsgeek'),
            // 'password' => Hash::make($password),
            'role' => $request->role ?? $role,
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $file ? $fileName : 'images/participants/avatar.png'
        ]);

        // Mail::to($request->email)->send(new SignInMail($participant, $password));


        $participant->social()->create();

        $ably = new AblyRest(env('ABLY_KEY'));
        $channel = $ably->channel("public_participants");

        $channel->publish('participants', [
            'participant' => $participant
        ]);
    }


    //*show create speaker

    public function showCreateSpeaker()
    {
        return Inertia::render('speakers/index', [
            'speakers' => Participant::where('role', 'speaker')->with('programs')->get(),
            'programs' => Programe::all(),
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        // delete token if it exists
        $participant->tokens->firstWhere('name', $participant->email)?->delete();
        $participant->delete();
        if ($participant->image != 'images/participants/avatar.png') {
            $filePath = public_path('storage/' . $participant->image);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        return back()->with('success', 'Participant deleted successfully');
    }

    public function sendParticipants(Request $request)
    {

        // $loggenInUser = CurrentUser::all()->first();
        $actedUserIds = DB::table('matches')
            ->where('participant_id', $request->auth)
            ->where('action', 'connect')
            ->pluck('related_participant_id');

        $participants = Participant::where('id', '!=', $request->auth)
            ->whereNotIn('id', $actedUserIds)
            ->select('id', 'name', 'role', 'image', 'description')
            ->get();

        // Log::info('Request data:', ['users connected' => $actedUserIds]);


        $participants = $participants->map(function ($participant) {
            return [
                'id' => $participant->id,
                'name' => $participant->name,
                'role' => $participant->role,
                'image' => $participant->image,
                'description' => $participant->description,
                'interests' => $participant->interesets->pluck('name'),

            ];
        });
        // Log::info('Request data:', ['participants' => $participants]);

        return response()->json([
            'participants' => $participants
        ]);
    }

    public function storeAction(Request $request)
    {
        // Log::info('Request data:', $request->all());

        $validated = $request->validate([
            'currentParticipant' => 'required|exists:participants,id',
            'related_participant_id' => 'required|exists:participants,id',
            'action' => 'required|in:connect,skip',
        ]);
        $currentId = $validated['currentParticipant'];

        $participant = Participant::find($currentId);

        if ($participant) {
            $participant->connections()->attach($validated['related_participant_id'], [
                'action' => $validated['action'],
            ]);

            return response()->json(['message' => 'action has been saved successfully']);
        }

        return response()->json(['error' => 'participant not found'], 404);
    }

    public function sendMatches(Request $request)
    {
        $participant = Participant::find($request->auth);

        // Log::info('Participant:', ['participant'=> $participant]);
        if (!$participant) {
            return response()->json(['error' => 'Participant not found'], 404);
        }

        $connectedParticipants = $participant->connections()
            ->withPivot('action')
            ->wherePivot('action', 'connect')
            ->get();



        $matches = $connectedParticipants->map(function ($connectedParticipant) {
            return [
                'id' => $connectedParticipant->id,
                'name' => $connectedParticipant->name,
                'role' => $connectedParticipant->role,
                'image' => $connectedParticipant->image,
                'description' => $connectedParticipant->description,
                'interests' => $connectedParticipant->interesets->pluck('name'),
            ];
        });


        return response()->json([
            'matches' => $matches
        ]);
    }
}
