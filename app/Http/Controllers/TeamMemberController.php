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
        if ($request->has('phone_number') && !empty($request->phone_number)) {
            $phone = preg_replace('/[^0-9]/', '', $request->phone_number);
            if (str_starts_with($phone, '0')) {
                $phone = '62' . substr($phone, 1);
            } elseif (!str_starts_with($phone, '62')) {
                $phone = '62' . $phone;
            }
            $request->merge(['phone_number' => '+' . $phone]);
        }

        $request->validate([
            'nama' => 'required|string',
            'peran' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|phone:ID,mobile',
            'email' => 'nullable|email',
            'tags' => 'nullable|array',
            'pricelist' => 'nullable|array',
        ]);

        $member = $request->user()->teamMembers()->create($request->all());

        return response()->json(['message' => 'Team member created successfully', 'data' => $member], 201);
    }

    public function update(Request $request, $id)
    {
        if ($request->has('phone_number') && !empty($request->phone_number)) {
            $phone = preg_replace('/[^0-9]/', '', $request->phone_number);
            if (str_starts_with($phone, '0')) {
                $phone = '62' . substr($phone, 1);
            } elseif (!str_starts_with($phone, '62')) {
                $phone = '62' . $phone;
            }
            $request->merge(['phone_number' => '+' . $phone]);
        }

        $request->validate([
            'nama' => 'required|string',
            'peran' => 'required|string',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|phone:ID,mobile',
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
