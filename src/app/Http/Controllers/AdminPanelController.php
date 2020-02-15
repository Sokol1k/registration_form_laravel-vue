<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\AdminPanelRequest;

class AdminPanelController extends Controller
{
    public function panel(AdminPanelRequest $request)
    {
        $request = User::where('email', $request->email)->where('password', $request->password)->firstOrFail();
        return response([
            "id" => $request
        ], 200);
    }
}
