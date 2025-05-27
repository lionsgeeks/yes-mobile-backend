<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use Illuminate\Http\Request;
use App\Mail\PdfReportMail;
use App\Models\General;
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
        // $fileName = "qrcode_1747385519.svg";
        // $sponsors = Sponsor::all();
        // Mail::to("boujjarr@gmail.com")->queue(new PdfReportMail($participant->name, $fileName, $participant->role, $participant->company, $participant->country, $sponsors));
        $participant = Participant::where("id", "1")->first();
        $link = General::all()->first();
        Mail::to('boujjarr@gmail.com')->queue(new InvitationMail($participant->name, $participant->email, 'lionsgeek' , $link->appstore , $link->playstore));
        return back()->with('success', 'Email sent!');
    }
}
