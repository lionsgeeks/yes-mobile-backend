<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NgoController extends Controller
{
    public function index()
    {
        $ngos = Participant::where('role', 'ngo')->get();
        return Inertia::render('ngos/index', [
            'ngos' => $ngos,
        ]);
    }


    public function store(Request $request)
    {
        $partController = new ParticipantController();
        $partController->store($request, $request->role);
    }
}
