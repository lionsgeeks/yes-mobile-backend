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
        $sponsors = Sponsor::orderByRaw("
        CASE rank
            WHEN 'major' THEN 1
            WHEN 'valued' THEN 2
            WHEN 'supporter' THEN 3
            ELSE 4
        END
    ")->get();

        return response()->json([
            'sponsors' => $sponsors
        ]);
    }
}
