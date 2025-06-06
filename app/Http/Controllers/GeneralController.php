<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $general = General::firstOrCreate(
            ['id' => 1],
            ['version' => '1.0.0', 'token' => 'token']
        );

        return response()->json([
            'general' => $general
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
    }

    /**
     * Display the specified resource.
     */
    public function show(General $general)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(General $general)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, General $general)
    {
        General::updateOrCreate(
            ['id' => 1],
            [
                'version' => $request->version,
                'token' => $request->token,
                'playstore' => $request->playstore,
                'appstore' => $request->appstore
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(General $general)
    {
        //
    }
}
