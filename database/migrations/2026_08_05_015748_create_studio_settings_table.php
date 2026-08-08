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
        Schema::create('studio_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('vendor_name')->nullable();
            $table->string('custom_url')->nullable();
            $table->string('phone_country_code')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('disable_slug')->default(false);
            $table->string('logo_url')->nullable();
            $table->text('address')->nullable();
            $table->boolean('working_hours_enabled')->default(true);
            $table->boolean('close_booking_outside_hours')->default(false);
            $table->json('working_days')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studio_settings');
    }
};
