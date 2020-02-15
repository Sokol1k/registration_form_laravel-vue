<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;
use App\Http\Requests\Requests\RegistrationFormRequest;
use App\Http\Requests\AddingInformationFormRequest;
use Auth;
use Config;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $hideParticipants = Participant::withTrashed()->orderBy('id', "desc")->get();
        $participants = Participant::orderBy('id', "desc")->get();
        return response([
            'hideParticipants' => $hideParticipants,
            'participants' => $participants
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Requests\RegistrationFormRequest; $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegistrationFormRequest $request)
    {
        $result = Participant::create($request->all());
        $userID = $result->id;
        return response([
            'userID' => $userID
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\AddingInformationFormRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AddingInformationFormRequest $request, $id)
    {
        $participant = Participant::findOrFail($id);
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store(Config::get('const.PATH_PHOTO'), 'public');
            $path = explode('/', $path);
        } else {
            $path = null;
        }
        $data = $request->all();
        $data['photo'] = $path[1];
        $participant->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $participant = Participant::withTrashed()->find($id);
        if ($participant->deleted_at) {
            $participant->restore();
        } else {
            $participant->delete();
        }
    }
}
