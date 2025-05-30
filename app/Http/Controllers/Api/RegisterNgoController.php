<?php

namespace App\Http\Controllers\Api;

use Ably\AblyRest;
use App\Http\Controllers\Controller;
use App\Mail\SignInMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterNgoController extends Controller
{
    public function register(Request $request)
    {
        try {
            // dd($request);
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'role' => 'required|string',
            ]);
            $password =  Str::random(8);
            // dd($password);
            $participant = Participant::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($password),
                'role' => $validatedData['role'],
                'company' => $request->input('company') ?? null,
            ]);
            Mail::to($request->email)->send(new SignInMail($participant, $password));
            $participant->social()->create();
            $ably = new AblyRest(env('ABLY_KEY'));
            $channel = $ably->channel("public_participants");
            $channel->publish('participants', [
                'participant' => $participant
            ]);
            return response()->json(['message' => 'Participant registered successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Failed to register participant', 'er' => $th->getMessage()], 500);
        }
    }
}
