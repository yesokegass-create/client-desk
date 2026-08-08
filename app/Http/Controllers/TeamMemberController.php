<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    public function index(Request $request)
    {
        $members = $request->user()->teamMembers()->orderBy('created_at', 'desc')->get();
        return response()->json($members);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'peran' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'nullable|email',
            'tags' => 'nullable|array',
            'pricelist' => 'nullable|array',
        ]);

        $member = $request->user()->teamMembers()->create($request->all());

        return response()->json(['message' => 'Team member created successfully', 'data' => $member], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string',
            'peran' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'nullable|email',
            'tags' => 'nullable|array',
            'pricelist' => 'nullable|array',
        ]);

        $member = $request->user()->teamMembers()->findOrFail($id);
        $member->update($request->all());

        return response()->json(['message' => 'Team member updated successfully', 'data' => $member]);
    }

    public function destroy(Request $request, $id)
    {
        $member = $request->user()->teamMembers()->findOrFail($id);
        $member->delete();

        return response()->json(['message' => 'Team member deleted successfully']);
    }
}
