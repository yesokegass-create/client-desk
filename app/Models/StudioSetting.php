<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudioSetting extends Model
{
    protected $fillable = [
        'user_id',
        'vendor_name',
        'custom_url',
        'phone_country_code',
        'phone_number',
        'disable_slug',
        'logo_url',
        'address',
        'working_hours_enabled',
        'close_booking_outside_hours',
        'working_days',
        'form_booking_settings',
    ];

    protected $casts = [
        'disable_slug' => 'boolean',
        'working_hours_enabled' => 'boolean',
        'close_booking_outside_hours' => 'boolean',
        'working_days' => 'array',
        'form_booking_settings' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
