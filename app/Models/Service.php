<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'jenis_layanan',
        'nama_layanan',
        'deskripsi',
        'harga',
        'harga_coret',
        'durasi_kuota',
        'wajib_pilih_kuota',
        'tampilkan_publik',
        'tipe_acara',
        'kota',
        'biaya_operasional',
        'is_active',
        'warna_paket',
        'jumlah_edit',
        'template_cetak',
    ];

    protected $casts = [
        'wajib_pilih_kuota' => 'boolean',
        'tampilkan_publik' => 'boolean',
        'is_active' => 'boolean',
        'tipe_acara' => 'array',
        'kota' => 'array',
        'biaya_operasional' => 'array',
    ];
}
