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
            'nama' => 'required|string|min:2|max:255',
            'peran' => 'required|string|max:100',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|string|min:8|max:20',
            'email' => 'nullable|email|max:255',
            'tags' => 'nullable|array',
            'pricelist' => 'nullable|array',
        ], [
            'nama.required' => 'Nama tim harus diisi',
            'nama.min' => 'Nama tim minimal 2 karakter',
            'phone_number.required' => 'Nomor WhatsApp harus diisi',
            'phone_number.min' => 'Nomor WhatsApp minimal 8 digit',
            'email.email' => 'Format email tidak valid',
        ]);

        $member = $request->user()->teamMembers()->create($request->all());

        return response()->json(['message' => 'Team member created successfully', 'data' => $member], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|min:2|max:255',
            'peran' => 'required|string|max:100',
            'phone_country_code' => 'required|string',
            'phone_number' => 'required|string|min:8|max:20',
            'email' => 'nullable|email|max:255',
            'tags' => 'nullable|array',
            'pricelist' => 'nullable|array',
        ], [
            'nama.required' => 'Nama tim harus diisi',
            'nama.min' => 'Nama tim minimal 2 karakter',
            'phone_number.required' => 'Nomor WhatsApp harus diisi',
            'phone_number.min' => 'Nomor WhatsApp minimal 8 digit',
            'email.email' => 'Format email tidak valid',
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
