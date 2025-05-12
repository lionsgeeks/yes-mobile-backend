<?php

namespace App\Http\Controllers;

use App\Models\Programe;
use App\Models\Resarvation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgrameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('programe', [
            'programes' => Programe::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $programes = Programe::all();

        return response()->json([
            'message' => 'Programe created successfully',
            'programes' => $programes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'start_date' => 'required',
            'end_date' => 'required',
            'capacity' => 'required|integer',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'edition' => 'required',
        ]);
        Programe::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'date' => $request->date,
            'edition' => $request->edition,
        ]);
        return back()->with('success', 'Programe created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Programe $programe)
    {
        //
        // dd($programe->name);
        // return Inertia::render('programshow', [
        //     'programe' => $programe,
        // ]);
        return response()->json([
            'programe' => $programe,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programe $programe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Programe $programe)
    {
        //
        dd($request->all());
    }


    public function enrolled(Request $request)
    {
        $request->validate([
            "programe_id" => 'required|integer',
            "participant_id" => 'required|integer',
        ]);

        $alreadyEnrolled = Resarvation::where('programe_id', $request->programe_id)
            ->where('participant_id', $request->participant_id)
            ->exists();

        if ($alreadyEnrolled) {
            return response()->json([
                'message' => 'You are already enrolled in this programe.',
            ], 409); // 409 Conflict
        }

        Resarvation::create([
            "programe_id" => $request->programe_id,
            "participant_id" => $request->participant_id,
        ]);

        return response()->json([
            'message' => 'Programe enrolled successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programe $programe)
    {
        //
    }
}
