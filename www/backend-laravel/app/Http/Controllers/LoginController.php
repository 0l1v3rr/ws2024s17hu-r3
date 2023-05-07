<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = User::whereUsername($request->username)->wherePassword($request->password)->first();
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }

        $token = Str::random(64);
        $user->token = $token;
        $user->save();

        return response()->json(['token' => $token]);
    }
}
