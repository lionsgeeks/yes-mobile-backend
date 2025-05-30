<?php

namespace App\Http\Controllers;

use Ably\AblyRest;
use App\Exports\ParticipantsExport;
use App\Mail\InvitationMail;
use App\Mail\SignInMail;
use App\Models\CurrentUser;
use App\Models\General;
use App\Models\Participant;
use App\Models\Programe;
use App\Models\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = Participant::where('role', 'visitor')->with('social')->with('interesets')->get();
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
        ]);


        $file = $request->file('image');
        if ($file) {
            $fileName = $file->store('images/participants', 'public');
        }

        // funder || ngo 'dont' have account so no need for random password or an email
        $password = ($role == 'funder' || $role == 'ngo') ? 'lionsgeek' : Str::random(8);

        $email = ($role == 'funder' || $role == 'ngo')
            ? strtolower($role) . Str::random(10) . '@example.com'
            : $request->email;


        $participant = Participant::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => $request->role ?? $role,
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $file ? $fileName : 'images/participants/avatar.png'
        ]);

        $link = General::all()->first();
        Mail::to($request->email)->send(new InvitationMail($participant->name, $participant->email, $password, $link->appstore, $link->playstore));


        $participant->social()->create([
            'website' => $request->website,
            'linkedin' => $request->linkedin,
            'youtube' => $request->youtube,
            'instagram' => $request->instagram,
        ]);

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
            'speakers' => Participant::where('role', 'speaker')->with('social')->with('programs')->get(),
            'programs' => Programe::all(),
        ]);
    }

    public function moderatorIndex()
    {
        return Inertia::render('moderators/index', [
            'moderators' => Participant::where('role', 'moderator')->with('social')->with('programs')->get(),
            'programs' => Programe::all(),
        ]);
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
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);


        $file = $request->file('image');
        if ($file) {
            $fileName = $file->store('images/participants', 'public');
            if ($participant->image !== 'images/participants/avatar.png') {
                Storage::disk('public')->delete($participant->image);
            }
        }

        $participant->update([
            'name' => $request->name,
            'email' => $request->email,
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $file ? $fileName : $participant->image,
        ]);

        $participant->social()->update([
            'website' => $request->website,
            'linkedin' => $request->linkedin,
            'youtube' => $request->youtube,
            'instagram' => $request->instagram,
        ]);

        // TODO if email is modified then send an email ?
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
            ->whereNot('role', "admin")
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
            // 'related_participant_id' => 'required|exists:participants,id',
            'action' => 'required|in:connect,skip',
        ]);
        if ($request->badge_id) {
            $participant_id = QrCode::where('badge_id', $request->badge_id)->first()->participant_id;
            $connection = Participant::find($participant_id);
        }
        $currentId = $validated['currentParticipant'];
        $participant = Participant::find($currentId);
        // if the connection already exist, no need to store it again
        if (!$participant->connections()->where('related_participant_id', $request->badge_id ? $connection->id :  $request->related_participant_id)->exists()) {
            // return response()->json(['message' => 'Connection already exists'], 200);
            // }
            // if ($participant) {
            $participant->connections()->attach($request->badge_id ? $connection :  $request->related_participant_id, [
                'action' => $validated['action'],
            ]);
        }
        return $this->sendMatches($request);
    }

    public function sendMatches(Request $request)
    {
        // dd($request);
        if ($request->currentParticipant) {
            $participant = Participant::find($request->currentParticipant);
        } else {
            $participant = Participant::find($request->auth);
        }

        // Log::info('Participant:', ['participant'=> $participant]);
        if (!$participant) {
            return response()->json(['error' => 'Participant not found'], 404);
        }

        $connectedParticipants = $participant->connections()
            ->withPivot('action')
            ->wherePivot('action', 'connect')
            ->get();
        if ($request->badge_id) {
            $participant_id = QrCode::where('badge_id', $request->badge_id)->first()->participant_id;
            $connection = Participant::find($participant_id);
        }


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
            'matches' => $matches,
            'scanned' => $connection ?? null,
        ]);
    }


    public function export(string $role)
    {
        $fileName = $role == 'visitor' ? 'participants' : $role;
        return Excel::download(new ParticipantsExport($role), $fileName . '.xlsx');
    }
}
