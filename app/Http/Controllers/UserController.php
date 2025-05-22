<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use Illuminate\Http\Request;
use App\Mail\PdfReportMail;
use App\Models\Participant;
use App\Models\Sponsor;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Str;
class UserController extends Controller

{



    public function sendReport(Request $request)
    {

        //  $badgeId = Str::uuid();
        // dd($badgeId);
        $participant = Participant::where("id", "1")->first();
        // $fileName = "qrcode_1747385519.svg";
        // $sponsors = Sponsor::all();
        // Mail::to("boujjarr@gmail.com")->send(new PdfReportMail($participant->name, $fileName, $participant->role, $participant->company, $participant->country, $sponsors));
        Mail::to('boujjarr@gmail.com')->send(new InvitationMail($participant->name, $participant->email, 'lionsgeek'));
        return back()->with('success', 'Email sent!');
    }
}
