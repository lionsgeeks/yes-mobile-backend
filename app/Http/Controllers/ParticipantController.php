<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('participants/index', [
            'participants' => Participant::all(),
        ]);
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
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $file = $request->file('image');
        if ($file) {
            $fileName = $file->store('images/participants', 'public');
        }

        // TODO: generate a random password and send it to the participant's email
        Participant::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('lionsgeek'),
            'role' => $request->role ?? 'visitor',
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $file ? $fileName : 'avatar.png'
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
        //
    }
}
