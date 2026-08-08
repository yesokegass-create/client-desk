<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('jenis_layanan'); // 'paket' or 'addon'
            $table->string('nama_layanan');
            $table->text('deskripsi')->nullable();
            $table->string('harga');
            $table->string('harga_coret')->nullable();
            $table->string('durasi_kuota')->nullable();
            $table->boolean('wajib_pilih_kuota')->default(false);
            $table->boolean('tampilkan_publik')->default(true);
            $table->json('tipe_acara')->nullable();
            $table->json('kota')->nullable();
            $table->json('biaya_operasional')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
