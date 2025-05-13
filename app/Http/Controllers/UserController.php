<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\PdfReportMail;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{



public function sendReport(Request $request)
{


    Mail::to("boujjarr@gmail.com")->send(new PdfReportMail("bojo"));

    return back()->with('success', 'Email sent!');
}


}
