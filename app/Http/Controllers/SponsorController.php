<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('sponsors/index', [
            'sponsors' => Sponsor::all(),
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
            'image' => 'nullable|image',
            'website' => 'nullable|url',
        ]);

        $file = $request->file('image');
        if ($file) {
            $fileName = $file->store('images/sponsors', 'public');
        }


        Sponsor::create([
            'name' => $request->name,
            'website' => $request->website,
            'type' => $request->type,
            'description' => $request->description,
            'image' => $fileName ?? 'images/sponsors/default.png',
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Sponsor $sponsor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sponsor $sponsor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sponsor $sponsor)
    {
        $request->validate([
            'name' => 'required|string',
            'website' => 'nullable|url',
        ]);

        $file = $request->file('image');
        if ($file) {
            if ($sponsor->image !== 'images/sponsors/default.png') {
                Storage::disk('public')->delete($sponsor->image);
            }
            $fileName = $file->store('images/sponsors', 'public');
        }

        $sponsor->update([
            'name' => $request->name,
            'website' => $request->website,
            'type' => $request->type,
            'description' => $request->description,
            'image' => $fileName ?? $sponsor->image,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sponsor $sponsor)
    {
        // only delete the image if not the default
        if ($sponsor->image !== 'images/sponsors/default.png') {
            Storage::disk('public')->delete($sponsor->image);
        }

        $sponsor->delete();
    }
}
