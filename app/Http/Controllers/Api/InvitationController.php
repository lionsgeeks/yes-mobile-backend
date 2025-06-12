<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Spatie\Browsershot\Browsershot;

class InvitationController extends Controller
{
    private function wrapText($fontSize, $angle, $fontFace, $string, $maxWidth)
    {
        $words = explode(' ', $string);
        $lines = [];
        $currentLine = '';

        foreach ($words as $word) {
            $testLine = $currentLine ? $currentLine . ' ' . $word : $word;
            $box = imagettfbbox($fontSize, $angle, $fontFace, $testLine);
            $lineWidth = $box[2] - $box[0];
            if ($lineWidth > $maxWidth && $currentLine) {
                $lines[] = $currentLine;
                $currentLine = $word;
            } else {
                $currentLine = $testLine;
            }
        }
        if ($currentLine) {
            $lines[] = $currentLine;
        }
        return $lines;
    }

    // Helper function to make avatar rounded
    private function makeRoundedAvatar($srcImg, $size)
    {
        $w = $size;
        $h = $size;

        // Create a transparent true color image
        $finalImg = imagecreatetruecolor($w, $h);
        imagesavealpha($finalImg, true);
        $trans = imagecolorallocatealpha($finalImg, 0, 0, 0, 127);
        imagefill($finalImg, 0, 0, $trans);

        // Draw a circle mask and copy only pixels inside the circle
        $radius = $w / 2;
        for ($x = 0; $x < $w; $x++) {
            for ($y = 0; $y < $h; $y++) {
                $dx = $x - $radius + 0.5;
                $dy = $y - $radius + 0.5;
                if (($dx * $dx + $dy * $dy) <= ($radius * $radius)) {
                    $color = imagecolorat($srcImg, $x, $y);
                    imagesetpixel($finalImg, $x, $y, $color);
                }
            }
        }
        return $finalImg;
    }

    public function shareInvitationImage(Request $request)
    {
        $participant = Participant::find($request->query('id'));
        if (!$participant) {
            return response()->json([
                'message' => 'Participant not found'
            ], 404);
        }

        $name = $participant->name;
        $role = $participant->role;
        $image = $participant->image;
        $nameForFile = str_replace(' ', '_', $name) . '_' . $participant->id;

        // Output file path
        $imagePath = public_path("storage/posts/screenshot_$nameForFile.png");
        $publicUrl = asset("storage/posts/screenshot_$nameForFile.png");

        if (file_exists($imagePath)) {
            return response()->json([
                'message' => 'Screenshot already exists!',
                'image_path' => $publicUrl
            ]);
        }

        // 1. Load the event background image (should match your blade template background)
        $backgroundPath = public_path('assets/images/badge_yesafrica_affiche.jpg');
        if (!file_exists($backgroundPath)) {
            return response()->json(['message' => 'Background image not found'], 500);
        }
        $background = imagecreatefromjpeg($backgroundPath);

        // 2. Load the user avatar
        $avatarPath = public_path('storage/' . $image);
        if (!file_exists($avatarPath)) {
            // fallback to default avatar
            $avatarPath = public_path('assets/images/avatar.png');
        }
        $avatar = @imagecreatefromjpeg($avatarPath) ?: @imagecreatefrompng($avatarPath);
        if (!$avatar) {
            return response()->json(['message' => 'User image not found or invalid'], 500);
        }

        // 3. Resize/crop avatar to 100x100px (object-cover effect)
        $avatarSize = 130;
        $srcWidth = imagesx($avatar);
        $srcHeight = imagesy($avatar);

        // Calculate aspect ratios
        $srcRatio = $srcWidth / $srcHeight;
        $destRatio = 1; // Square

        if ($srcRatio > $destRatio) {
            // Source is wider than destination, crop the sides
            $newHeight = $srcHeight;
            $newWidth = $srcHeight * $destRatio;
            $srcX = ($srcWidth - $newWidth) / 2;
            $srcY = 0;
        } else {
            // Source is taller than destination, crop the top/bottom
            $newWidth = $srcWidth;
            $newHeight = $srcWidth / $destRatio;
            $srcX = 0;
            $srcY = ($srcHeight - $newHeight) / 2;
        }

        $avatarResized = imagecreatetruecolor($avatarSize, $avatarSize);
        imagealphablending($avatarResized, false);
        imagesavealpha($avatarResized, true);
        imagecopyresampled(
            $avatarResized,
            $avatar,
            0, 0, // dest x, y
            $srcX, $srcY, // src x, y
            $avatarSize, $avatarSize, // dest w, h
            $newWidth, $newHeight // src w, h
        );

        // Make avatar rounded
        $avatarRounded = $this->makeRoundedAvatar($avatarResized, $avatarSize);

        // 4. Place avatar on background (left: 75%, top: 33%)
        $bgWidth = imagesx($background);
        $bgHeight = imagesy($background);
        $avatarX = intval($bgWidth * 0.73);
        $avatarY = intval($bgHeight * 0.28);
        imagecopy($background, $avatarRounded, $avatarX, $avatarY, 0, 0, $avatarSize, $avatarSize);

        // 5. Add name and role text
        $fontPath = public_path('fonts/ARIAL.TTF');
        if (!file_exists($fontPath)) {
            return response()->json(['message' => 'Font file not found'], 500);
        }

        $nameColor = imagecolorallocate($background, 41, 82, 163); 

        // Set your max width for the name area (in pixels)
        $maxNameWidth = intval($bgWidth * 0.22);

        // Wrap the name
        $nameLines = $this->wrapText(14, 0, $fontPath, $name, $maxNameWidth);

        // Calculate starting Y so the text block is vertically centered at your desired Y
        $lineHeight = 22;
        $totalTextHeight = count($nameLines) * $lineHeight;
        $startY = intval($bgHeight * 0.70) - intval($totalTextHeight / 2) + $lineHeight;

        // Draw each line centered
        foreach ($nameLines as $i => $line) {
            $box = imagettfbbox(14, 0, $fontPath, $line);
            $textWidth = $box[2] - $box[0];
            $centerX = intval($bgWidth * 0.70) + intval(($maxNameWidth - $textWidth) / 2);
            imagettftext($background, 14, 0, $centerX, $startY + $i * $lineHeight, $nameColor, $fontPath, $line);
        }

        // Role (left: 83%, top: 68%)
        $roleX = intval($bgWidth * 0.78);
        $roleY = intval($bgHeight * 0.65);
        $roleColor = imagecolorallocate($background, 212, 175, 55);
        imagettftext($background, 14, 0, $roleX, $roleY, $roleColor, $fontPath, ucfirst($role));

        // 6. Save the final image
        imagepng($background, $imagePath);

        // 7. Free memory
        imagedestroy($background);
        imagedestroy($avatar);
        imagedestroy($avatarResized);
        imagedestroy($avatarRounded);

        return response()->json([
            'message' => 'Screenshot saved!',
            'image_path' => $publicUrl
        ]);
    }
}
