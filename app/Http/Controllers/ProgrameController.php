<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Participant;
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
        // dd(Participant::where("role" , "speaker")->get());
        return Inertia::render('programes/index', [
            'programes' => Programe::all()->load('participants'),
            "moderators" => Participant::where("role", "moderator")->get(),
            "speakers" => Participant::where("role", "speaker")->get(),
            'categories' => Categorie::all(),
        ]);
    }
    public function index2()
    {
        //
        // dd(Participant::where("role" , "speaker")->get());
        return Inertia::render('programes/category', [
            'programes' => Programe::all()->load('participants'),
            "moderators" => Participant::where("role", "moderator")->get(),
            "speakers" => Participant::where("role", "speaker")->get(),
            'categories' => Categorie::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $programes = Programe::with(['participants', 'participantes.qrCodes', 'participantes'])
            ->orderBy('date', 'asc')
            ->orderBy('start_date', 'asc')
            ->get();


        foreach ($programes as $programe) {
            $category = Categorie::find($programe->category_id);
        }

        return response()->json([
            'message' => 'Programe fetched successfully',
            'programes' => $programes,
            // "categorie"=>$category,
            'categorie' => Categorie::all(),
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

        ]);
        $programe =   Programe::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'date' => $request->date,

        ]);
        if ($request->category_id) {
            $programe->category_id = $request->category_id;
            $programe->save();
        };
        // dd($programe);

        $programe->participants()->attach($request->speaker_ids);
        $programe->participants()->attach($request->moderator_ids);

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
    public function showw(Programe $programe)
    {
        //
        // dd($programe->name);
        return Inertia::render('programes/show', [
            'programe' => $programe,
        ]);
        // return response()->json([
        //     'programe' => $programe,
        // ]);
    }


    public function MyPrograme(Programe $programe)
    {
        //
        $reservations = Resarvation::where('programe_id', $programe->id)->first();

        if (!$reservations) {
            return response()->json([
                'message' => 'No reservations found for this programe.',
            ], 404);
        }
        $programes = Programe::where('id', $reservations->programe_id)->with(['participants', 'participantes.qrCodes', 'participantes'])
            ->orderBy('date', 'asc')
            ->orderBy('start_date', 'asc')
            ->get();




        return response()->json([
            'message' => 'Programe fetched successfully',
            'programes' => $programes,
            // "categorie"=>$category,
            'categorie' => Categorie::all(),
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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required',
            'end_date' => 'required',
            'capacity' => 'required|integer',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $programe->update([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'date' => $request->date,
            'category_id' => $request->category_id,

        ]);


        if ($request->has('speaker_ids')) {
            $programe->participants()->detach();
        }

        $programe->participants()->attach($request->speaker_ids);

        if ($request->has('moderator_ids')) {
            $programe->participants()->detach();
        }
        $programe->participants()->attach($request->moderator_ids);

        return back()->with('success', 'Programe updated successfully.');
    }


    public function enrolled(Request $request)
    {
        // dd();
        $request->validate([
            "programe_id" => 'required|integer',
            "participant_id" => 'required|integer',
        ]);

        $programe = Programe::find($request->programe_id);

        if ($programe->capacity <= 0) {
            return response()->json([
                'message' => 'Programe is full.',
            ], 422); // 409 Conflict
        }

        $alreadyEnrolled = Resarvation::where('programe_id', $request->programe_id)
            ->where('participant_id', $request->participant_id)
            ->exists();

        if ($alreadyEnrolled) {
            return response()->json([
                'message' => 'You are already enrolled in this programe.',
            ], 409);
        }

        Resarvation::create([
            "programe_id" => $request->programe_id,
            "participant_id" => $request->participant_id,
        ]);

        $programe->update([
            'capacity' => $programe->capacity - 1,
        ]);
        $programe->save();

        return response()->json([
            'message' => 'Programe enrolled successfully',
        ]);
    }



    public function cancel(Request $request)
    {
        // dd();
        $request->validate([
            "programe_id" => 'required|integer',
            "participant_id" => 'required|integer',
        ]);

        $reservation = Resarvation::where('programe_id', $request->programe_id)
            ->where('participant_id', $request->participant_id)
            ->first();

        if (!$reservation) {
            return response()->json([
                'message' => 'You are not enrolled in this programe.',
            ], 409);
        }

        $reservation->delete();

        $programe = Programe::find($request->programe_id);
        $programe->update([
            'capacity' => $programe->capacity + 1,
        ]);
        $programe->save();

        return response()->json([
            'message' => 'Programe cancelled successfully',
        ]);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programe $programe)
    {
        //
        $programe->delete();
        return back()->with('success', 'Programe deleted successfully.');
    }
}
