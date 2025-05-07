<?php

namespace App\Http\Controllers;

use App\Models\Programe;
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
        ]);
        Programe::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'date' => $request->date,
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
        return Inertia::render('programshow', [
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programe $programe)
    {
        //
    }
}
