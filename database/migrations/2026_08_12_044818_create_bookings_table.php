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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('client_name');
            $table->string('client_whatsapp');
            $table->string('client_instagram')->nullable();
            $table->string('event_type');
            $table->string('event_date')->nullable();
            $table->string('event_time')->nullable();
            $table->string('event_location')->nullable();
            $table->string('event_location_detail')->nullable();
            $table->string('partner_name')->nullable();
            $table->string('partner_instagram')->nullable();
            $table->string('guest_estimation')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('selected_package_id')->nullable();
            $table->json('selected_addons')->nullable();
            $table->decimal('total_price', 15, 2)->default(0);
            $table->decimal('dp_amount', 15, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
