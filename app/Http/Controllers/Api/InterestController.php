<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Interest;
use App\Models\Participant;
use Illuminate\Http\Request;

class InterestController extends Controller
{
    public function index()
    {
        $interests = Interest::select('id', 'name')->get();

        return response()->json([
            'interests' => $interests,
        ]);
    }

    public function participantInterests(Request $request, string $participant_id)
    {
        $participant = Participant::find($participant_id);

        $participant->interesets()->sync($request->selectedInterests);
        return response()->json([
            'message' => 'assigned successfully!!',
        ]);
    }
}
