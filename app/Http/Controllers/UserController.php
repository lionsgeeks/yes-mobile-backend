<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class UserController extends Controller
{


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
}
