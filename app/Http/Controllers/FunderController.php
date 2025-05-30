<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $funders = Participant::where('role', 'funder')->with('social')->get();
        return Inertia::render('funders/index', [
            'funders' => $funders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $partController = new ParticipantController();
        $partController->store($request, $request->role);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $funder = Participant::where('id', $id)->first();

        return Inertia::render('funders/show', [
            'funder' => $funder,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
