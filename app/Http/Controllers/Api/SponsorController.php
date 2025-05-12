<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sponsor;
use Illuminate\Http\Request;

class SponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $currentYear = date('Y');
        // $sponsors = Sponsor::where('edition', $currentYear)->get();

        $sponsors = Sponsor::all();

        return response()->json([
            'sponsors' => $sponsors
        ]);
    }
}
