<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\PdfReportMail;
use App\Mail\ResetPasswordMail;
use App\Models\Categorie;
use App\Models\Participant;
use App\Models\Programe;
use App\Models\QrCode;
use App\Models\Resarvation;
use App\Models\Social;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use SimpleSoftwareIO\QrCode\Facades\QrCode as QrCodeGenerator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ParticipantController extends Controller
{

    public function index()
    {
        $participants = Participant::with('social')->with('interesets')->get();
        return response()->json([
            'participants' => $participants
        ]);
    }


    // TODO SIMPLIFY THE CODE FOR CHECKING THE TOKEN

    public function update(Request $request, string $participant_id)
    {
        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        $token = PersonalAccessToken::where('token', $request->header('Token'))->first();

        $token->update([
            'name' => $request->email ?? $participant->email,
        ]);

        $participant->update([
            'name' => $request->fullName ?? $participant->name,
            'email' => $request->email ?? $participant->email,
            'company' => $request->company,
            'country' => $request->country,
            'city' => $request->city,
            'location' => $request->location,
            'description' => $request->bio,
        ]);

        Social::where("participant_id", $participant->id)->first()->update([
            'instagram' => $request->instagram,
            'linkedin' => $request->linkedin,
            'website' => $request->website,
            'youtube' => $request->youtube,
        ]);

        return response()->json(['message', 'Participant Updated Successfully'], 200);
    }

    public function updateImage(Request $request, string $participant_id)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $profile = Participant::find($participant_id);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filePath = $file->store('images/participants', 'public');

            // if it's not the default avatar image
            if ($profile->image !== 'images/participants/avatar.png') {
                Storage::disk('public')->delete($profile->image);
            }

            $profile->update([
                'image' => $filePath,
            ]);



            return response()->json([
                'message' => 'Photo uploaded successfully!',
            ], 200);
        }

        return response()->json(['message' => "Error with image upload"], 400);
    }



    public function updatePassword(Request $request, string $participant_id)
    {
        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        if (!Hash::check($request->oldPass, $participant->password)) {
            return response()->json(['message' => 'Wrong password'], 401);
        }

        $participant->update([
            'password' => Hash::make($request->newPass),
        ]);

        return response()->json(['message' => 'Password updated successfully'], 200);
    }




    public function destroy(Request $request, string $participant_id)
    {

        $participant = $this->validateParticipant($request->header('Token'), $participant_id);
        $token = PersonalAccessToken::where('token', $request->header('Token'))->first();

        $participant->delete();
        $token->delete();

        return response()->json(['message' => 'Participant deleted successfully.'], 200);
    }




    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $participant = Participant::where('email', $request->email)->with('interesets')->first();
        if (! $participant || ! Hash::check($request->password, $participant->password)) {
            return response()->json([
                'message' => 'Participant not found or password is incorrect',
            ], 500);
        }

        // create a token based on the user's email
        $token = $participant->tokens->firstWhere('name', $request->email)->token ?? $participant->createToken($request->email)->plainTextToken;

        if (!$token) {
            return response()->json([
                'message' => 'Token Could Not Be Created',
            ], 500);
        }

        $check = QrCode::where('participant_id', $participant->id)->first();


        if (!$check) {
            // 1. Generate SVG
            $badgeId = Str::uuid();
            $svg = QrCodeGenerator::format('svg')
                ->size(200)
                ->generate($badgeId);

            $fileName = 'qrcode_' . time() . '.svg';
            Storage::disk('public')->put('qrcodes/' . $fileName, $svg);

            $qrcode = QrCode::create([
                'content' => $badgeId,

                'file_path' => 'qrcodes/' . $fileName,
                "participant_id" => $participant->id,
                "badge_id" => $badgeId,
            ]);
            $sponsors = Sponsor::all();
            // Mail::to("boujjarr@gmail.com")->send(new PdfReportMail($participant->name, $fileName, $participant->role, $participant->company, $participant->country, $sponsors));
        }

        // return the user and its token
        return response()->json([
            'participant' => $participant,
            'token' => $token,
        ], 200);
    }



    public function userinfo(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        // return the $participant that has the access token equivalent to the one provided
        $participant = Participant::whereHas('tokens', function ($query) use ($request) {
            $query->where('token', $request->token);
        })->with('interesets')->with('social')->first();

        if (! $participant) {
            return response()->json([
                'message' => 'Participant not found',
            ], 500);
        }

        return response()->json([
            'user' => $participant,
            'socials' => Social::where("participant_id",  $participant->id)->first(),
        ], 200);
    }


    public function validateParticipant($requestToken, $participant_id)
    {
        $token = PersonalAccessToken::where('token', $requestToken)->first();
        if (!$token) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        // compare the morph id with the participant id
        if ($token->tokenable_id != $participant_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // find the participant
        $participant = Participant::find($participant_id);
        if (!$participant) {
            return response()->json(['message' => 'Participant not found.'], 404);
        }


        return $participant;
    }


    public function show(string $participant_id)
    {
        // dd($participant_id);
        // Fetch all QR codes related to the participant, eager load the participant relationship

        $qrCodes = QrCode::where('participant_id', $participant_id)
            ->with('participant') // eager load to avoid N+1
            ->get()
            ->map(function ($qrCode) {
                return [
                    'id' => $qrCode->id,
                    'content' => $qrCode->content,
                    'file_url' => $qrCode->file_path,
                    'participant_id' => $qrCode->participant->id ?? null,
                    'participant_name' => $qrCode->participant->name ?? null,
                    'participant_role' => $qrCode->participant->role ?? null,
                    'participant_company' => $qrCode->participant->company ?? null,
                    'participant_email' => $qrCode->participant->email ?? null,
                    'participant_image' => $qrCode->participant->image ?? null,
                    'participant_country' => $qrCode->participant->country ?? null,
                    'badge_id' => $qrCode->badge_id,
                ];
            });

        // Return a JSON response
        return response()->json([
            'status' => 'success',
            'data' => $qrCodes
        ], 200);
    }

    public function isRegistredToSession(Request $request)
    {
        $request->validate([
            'programe_id' => 'required',
            'badge_id' => 'required',
        ]);
        $isBadge = QrCode::where('badge_id', $request->badge_id)->exists();
        if (!$isBadge) {
            return response()->json(['message' => 'Participant with this badge id not found'], 404);
        }
        $participant_id = QrCode::where('badge_id', $request->badge_id)->first()->participant_id;
        $participant = Participant::find($participant_id);
        if (!$participant) {
            return response()->json(['message' => 'Participant not found'], 404);
        }

        $isRegistered = $participant->programmes()->where('programe_id', $request->programe_id)->exists();

        return response()->json(['isRegistered' => $isRegistered], 200);
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);


        // find if participant exists
        $participant = Participant::where('email', $request->email)->first();
        if (!$participant) {
            return response()->json([
                'message' => 'No participant found with this email'
            ]);
        }

        // create new password
        $newPassword = Str::random(8);

        // update it for participant
        $participant->update([
            'password' => Hash::make($newPassword),
        ]);

        // send it to email
        Mail::to($request->email)->send(new ResetPasswordMail($participant, $newPassword));


        return response()->json([
            'message' => 'Password Updated Successfully. Please Check Your Email'
        ]);
    }


         public function MyPrograme(string $participant_id)
    {
        //
        $reservations = Resarvation::where('participant_id', $participant_id)->first();

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
     public function checkParticipantQr(Request $request)
    {
        $request->validate([
            'badge_id' => 'required',
        ]);
        $checkBadge = QrCode::where('badge_id', $request->badge_id)->exists();
        if ($checkBadge) {
            return response()->json([
                'isEnrolled' => true,
            ]);
        } else {
            return response()->json([
                'isEnrolled' => false,
            ]);
        }
    }
}
