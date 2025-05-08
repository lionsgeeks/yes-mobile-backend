<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class ParticipantController extends Controller
{
    // TODO SIMPLIFY THE CODE FOR CHECKING THE TOKEN

    public function update(Request $request, string $participant_id)
    {
        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        $token = PersonalAccessToken::where('token', $request->header('Token'))->first();

        $token->update([
            'name' => $request->email ?? $participant->email,
        ]);

        $participant->update([
            'name' => $request->fullName ?? $participant->name,
            'email' => $request->email ?? $participant->email,
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->bio,
        ]);

        return response()->json(['message', 'Participant Updated Successfully'], 200);
    }

    public function updateImage(Request $request, string $participant_id)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $profile = Participant::find($participant_id);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filePath = $file->store('images/participants', 'public');

            // if it's not the default avatar image
            if ($profile->image !== 'avatar') {
                Storage::disk('public')->delete('images/participants/' . $profile->image);
            }

            $profile->update([
                'image' => basename($filePath),
            ]);



            return response()->json([
                'message' => 'Photo uploaded successfully!',
            ], 200);
        }

        return response()->json(['message' => "Error with image upload"], 400);
    }



    public function updatePassword(Request $request, string $participant_id)
    {
        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        if (!Hash::check($request->oldPass, $participant->password)) {
            return response()->json(['message' => 'Wrong password'], 401);
        }

        $participant->update([
            'password' => Hash::make($request->newPass),
        ]);

        return response()->json(['message' => 'Password updated successfully'], 200);
    }




    public function destroy(Request $request, string $participant_id)
    {

        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        $token = PersonalAccessToken::where('token', $request->header('Token'))->first();

        $participant->delete();
        $token->delete();

        return response()->json(['message' => 'Participant deleted successfully.'], 200);
    }




    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $participant = Participant::where('email', $request->email)->first();
        if (! $participant || ! Hash::check($request->password, $participant->password)) {
            return response()->json([
                'message' => 'Participant not found or password is incorrect',
            ], 500);
        }

        // create a token based on the user's email
        $token = $participant->tokens->firstWhere('name', $request->email)->token ?? $participant->createToken($request->email)->plainTextToken;

        if (!$token) {
            return response()->json([
                'message' => 'Token Could Not Be Created',
            ], 500);
        }

        // return the user and its token
        return response()->json([
            'participant' => $participant,
            'token' => $token,
        ], 200);
    }



    public function userinfo(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        // return the $participant that has the access token equivalent to the one provided
        $participant = Participant::whereHas('tokens', function ($query) use ($request) {
            $query->where('token', $request->token);
        })->first();

        if (! $participant) {
            return response()->json([
                'message' => 'Participant not found',
            ], 500);
        }

        return response()->json([
            'user' => $participant,
        ], 200);
    }


    public function validateParticipant($requestToken, $participant_id)
    {
        $token = PersonalAccessToken::where('token', $requestToken)->first();
        if (!$token) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        // compare the morph id with the participant id
        if ($token->tokenable_id != $participant_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // find the participant
        $participant = Participant::find($participant_id);
        if (!$participant) {
            return response()->json(['message' => 'Participant not found.'], 404);
        }


        return $participant;
    }
}
