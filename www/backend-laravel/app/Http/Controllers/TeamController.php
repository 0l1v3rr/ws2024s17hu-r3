<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TeamResource::collection(Team::all()->load('runners'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'contactEmail' => 'required',
            'plannedStartingTime' => 'required'
        ]);

        if ($validator->fails()) {
            return response(null, 400);
        }

        $request->merge([
            'accessCode' => rand(100000000, 999999999),
        ]);

        return response()->json(new TeamResource(Team::create($request->all())->load('runners')), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $team->update($request->all());
        return response()->json(new TeamResource($team->load('runners')), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $team->runners()->delete();
        $team->delete();
        return response(null, 204);
    }
}
