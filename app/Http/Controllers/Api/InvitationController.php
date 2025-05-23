<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Spatie\Browsershot\Browsershot;

class InvitationController extends Controller
{
    public function shareInvitationImage(Request $request)
    {
        // dd($request->query('id'));
        $participant = Participant::find($request->query('id'));
        if (!$participant) {
            return response()->json([
                'message' => 'Participant not found'
            ], 404);
        }
        $name = $participant->name;
        $name = str_replace(' ', '_', $name);
        // check the image if exists
        $imagePath = public_path("assets/posts/screenshot_$name.png");
        if (file_exists($imagePath)) {
            return response()->json([
                'message' => 'Screenshot already exists!',
                'image_path' => asset("assets/posts/screenshot_$name.png")
            ]);
        }
        // dd(file_exists($imagePath));
        Browsershot::url("https://app.youthempowermentsummit.africa/linkedinpost?name=$name")
            ->setNodeBinary('C:\Program Files\nodejs\node.exe')
            ->setNpmBinary('C:\Program Files\nodejs\npm.cmd')
            ->windowSize(1000, 700)
            ->timeout(60)
            ->waitUntilNetworkIdle()
            ->save(public_path("assets/posts/screenshot_$name.png"));
        return response()->json([
            'message' => 'Screenshot saved!',
            'image_path' => asset("assets/posts/screenshot_$name.png")
        ]);
    }
}
