<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function validateToken(Request $request)
    {
        $requestToken = $request->header('Token');
        $generalToken = DB::table('generals')->value('token');

        if ($requestToken !== $generalToken) {
            abort(Response::HTTP_UNAUTHORIZED, 'Unauthorized: Invalid token.');
        }
    }
}
