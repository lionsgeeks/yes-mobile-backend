<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            $password = str()->random(10);
            // dd($password);
            Participant::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($password),
                'role' => $validatedData['role'],
                'company' => $request->input('company') ?? null,
            ]);
            // TODO: Send email to participant with the password
            return response()->json(['message' => 'Participant registered successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Failed to register participant', 'er' => $th->getMessage()], 500);
        }
    }
}
