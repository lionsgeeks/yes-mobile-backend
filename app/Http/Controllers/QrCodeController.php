<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode as QrCodeGenerator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
class QrCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // Fetch all QR codes and map them to the desired format
        $qrCodes = QrCode::all()->map(function ($qrCode) {
            return [
                'id' => $qrCode->id,
                'content' => $qrCode->content,
                'file_url' => Storage::disk('public')->url($qrCode->file_path),
                'participant_id' => $qrCode->participant->id,
                'participant_name' => $qrCode->participant->name,
                'participant_role' => $qrCode->participant->role,
                'participant_company' => $qrCode->participant->company,
                'participant_email' => $qrCode->participant->email,
                'badge_id' => $qrCode->badge_id,
            ];
        });

        // Return a JSON response with a status and the QR codes data
        return response()->json([
            'status' => 'success',  // Optional: you can include any status or metadata
            'data' => $qrCodes      // The actual QR codes data
        ], 200);  // HTTP status code 200 means success
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('qrcodes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'content' => 'required|string',
        ]);

        // 1. Generate SVG
        $svg = QrCodeGenerator::format('svg')
            ->size(200)
            ->generate($request->content);

        $fileName = 'qrcode_' . time() . '.svg';

        // 2. Save to public/qrcodes (via storage disk)
        Storage::disk('public')->put('qrcodes/' . $fileName, $svg);

        // 3. Save to maizzle/images (relative to project root)
        $maizzlePath = base_path('maizzle/images/qrcodes/' . $fileName);

        if (!File::exists(dirname($maizzlePath))) {
            File::makeDirectory(dirname($maizzlePath), 0755, true);
        }

        file_put_contents($maizzlePath, $svg);

        // 3. Save record to database
        $participant = Participant::where('id', "1")->first();
        // dd($participant->id);
        QrCode::create([
            'content' => $request->content,
            'file_path' => 'qrcodes/' . $fileName,
            "participant_id" => $participant->id,
        ]);

        return redirect()->route('qrcodes.index')->with('success', 'QR Code created!');
    }

    /**
     * Display the specified resource.
     */
public function show(QrCode $qrCode)
{
    $qrCodeData = [
        'id' => $qrCode->id,
        'content' => $qrCode->content,
        'file_url' => Storage::disk('public')->url($qrCode->file_path),
        'participant_id' => $qrCode->participant->id ?? null,
        'participant_name' => $qrCode->participant->name ?? null,
        'participant_role' => $qrCode->participant->role ?? null,
        'participant_company' => $qrCode->participant->company ?? null,
        'participant_email' => $qrCode->participant->email ?? null,
        'participant_image' => $qrCode->participant->image ?? null,
        'badge_id' => $qrCode->badge_id,
    ];

    return response()->json([
        'status' => 'success',
        'badge' => $qrCodeData
    ], 200);
}



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(QrCode $qrCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QrCode $qrCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(QrCode $qrCode)
    {
        //
    }
}
