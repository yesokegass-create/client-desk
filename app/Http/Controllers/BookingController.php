<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\StudioSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            // For dev purposes, fall back to first user if no auth token is passed
            $user = \App\Models\User::first();
        }

        $bookings = Booking::where('user_id', $user->id)
            ->with('freelancers')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($bookings);
    }

    public function submitPublicBooking(Request $request, $alias)
    {
        $settings = StudioSetting::where('custom_url', $alias)
            ->orWhere('vendor_name', $alias)
            ->first();

        if (!$settings) {
            return response()->json(['error' => 'Vendor not found'], 404);
        }

        $validated = $request->validate([
            'namaLengkap' => 'required|string',
            'noWhatsapp' => 'required',
            'instagram' => 'nullable|string',
            'tipeAcara' => 'required|string',
            'jadwal' => 'nullable|string',
            'jam' => 'nullable|string',
            'lokasi' => 'nullable|string',
            'detailLokasi' => 'nullable|string',
            'namaPasangan' => 'nullable|string',
            'instagramPasangan' => 'nullable|string',
            'estimasiTamu' => 'nullable',
            'catatan' => 'nullable|string',
            'selectedPackages' => 'nullable|array',
            'selectedAddons' => 'nullable|array',
            'totalPrice' => 'required|numeric',
            'dpAmount' => 'required|numeric',
            'paymentMethod' => 'nullable|string',
        ]);

        $invoiceCode = 'INV-' . date('dmY') . strtoupper(Str::random(4));

        $booking = Booking::create([
            'invoice' => $invoiceCode,
            'user_id' => $settings->user_id,
            'client_name' => $validated['namaLengkap'],
            'client_whatsapp' => $validated['noWhatsapp'],
            'client_instagram' => $validated['instagram'],
            'event_type' => $validated['tipeAcara'],
            'event_date' => $validated['jadwal'],
            'event_time' => $validated['jam'],
            'event_location' => $validated['lokasi'],
            'event_location_detail' => $validated['detailLokasi'],
            'partner_name' => $validated['namaPasangan'] ?? null,
            'partner_instagram' => $validated['instagramPasangan'] ?? null,
            'guest_estimation' => $validated['estimasiTamu'] ?? null,
            'notes' => $validated['catatan'] ?? null,
            'selected_package_id' => null,
            'selected_packages' => $validated['selectedPackages'] ?? null,
            'selected_addons' => $validated['selectedAddons'] ?? null,
            'total_price' => $validated['totalPrice'],
            'dp_amount' => $validated['dpAmount'],
            'payment_method' => $validated['paymentMethod'] ?? null,
            'status' => 'pending',
        ]);

        $vendorSettings = $settings->user->studioSetting;
        $vendorPhone = $vendorSettings->phone_number ?? '';
        $vendorCountryCode = $vendorSettings->phone_country_code ?? '62';
        
        $fullVendorPhone = $vendorPhone;
        if ($fullVendorPhone) {
            $fullVendorPhone = ltrim($fullVendorPhone, '0');
            $fullVendorPhone = $vendorCountryCode . $fullVendorPhone;
        }

        return response()->json([
            'message' => 'Booking berhasil dibuat', 
            'booking' => $booking,
            'vendor_phone' => $fullVendorPhone
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $booking = Booking::where('user_id', auth()->id())->findOrFail($id);
        $booking->status = $request->status;
        $booking->save();

        return response()->json(['message' => 'Status updated successfully', 'booking' => $booking]);
    }

    public function destroy($id)
    {
        $booking = Booking::where('user_id', auth()->id())->findOrFail($id);
        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully']);
    }

    public function syncFreelancers(Request $request, $id)
    {
        $request->validate([
            'freelancer_ids' => 'array',
            'freelancer_ids.*' => 'exists:team_members,id'
        ]);

        $booking = Booking::where('user_id', auth()->id())->findOrFail($id);
        
        // Ensure freelancers belong to user
        $validIds = \App\Models\TeamMember::where('user_id', auth()->id())
            ->whereIn('id', $request->freelancer_ids)
            ->pluck('id');
        
        $booking->freelancers()->sync($validIds);

        return response()->json([
            'message' => 'Assignment tersimpan, tetapi sinkron Google Calendar gagal: Koneksi Google Calendar belum lengkap. Silakan hubungkan ulang di Pengaturan.',
            'booking' => $booking->load('freelancers')
        ]);
    }
}
