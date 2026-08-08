<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user) return response()->json([], 401);

        $services = Service::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['error' => 'Unauthenticated'], 401);

        $validated = $request->validate([
            'jenis_layanan' => 'required|string',
            'nama_layanan' => 'required|string',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|string',
            'harga_coret' => 'nullable|string',
            'durasi_kuota' => 'nullable|string',
            'wajib_pilih_kuota' => 'boolean',
            'tampilkan_publik' => 'boolean',
            'is_active' => 'boolean',
            'tipe_acara' => 'array',
            'kota' => 'array',
            'biaya_operasional' => 'array',
            'warna_paket' => 'nullable|string',
            'jumlah_edit' => 'nullable|numeric',
            'template_cetak' => 'nullable|string',
        ]);

        $service = Service::create(array_merge($validated, ['user_id' => $user->id]));

        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['error' => 'Unauthenticated'], 401);

        $service = Service::where('user_id', $user->id)->findOrFail($id);

        $validated = $request->validate([
            'jenis_layanan' => 'required|string',
            'nama_layanan' => 'required|string',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|string',
            'harga_coret' => 'nullable|string',
            'durasi_kuota' => 'nullable|string',
            'wajib_pilih_kuota' => 'boolean',
            'tampilkan_publik' => 'boolean',
            'is_active' => 'boolean',
            'tipe_acara' => 'array',
            'kota' => 'array',
            'biaya_operasional' => 'array',
            'warna_paket' => 'nullable|string',
            'jumlah_edit' => 'nullable|numeric',
            'template_cetak' => 'nullable|string',
        ]);

        $service->update($validated);

        return response()->json($service);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['error' => 'Unauthenticated'], 401);

        $service = Service::where('user_id', $user->id)->findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted']);
    }

    public function duplicate($id)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['error' => 'Unauthenticated'], 401);

        $service = Service::where('user_id', $user->id)->findOrFail($id);
        $newService = $service->replicate();
        $newService->nama_layanan = $newService->nama_layanan . ' (Copy)';
        $newService->save();

        return response()->json($newService, 201);
    }
}
