<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        // dd($request);
        try {
            //code...
            $validatedData = $request->validate([
                'name' => 'required',
                'participant_id' => 'required',
                'time' => 'required',
                'operator_system' => 'required',
                'screen_name' => 'required',
            ]);
            $report = Report::create($validatedData);
            return response()->json(['message' => 'Report created successfully', 'report' => $report], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Error creating report', 'error' => $th->getMessage()], 500);
        }
    }
}
