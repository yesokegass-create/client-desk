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
        'working_days' => 'array',
        'form_booking_settings' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getWorkingHoursEnabledAttribute($value)
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setWorkingHoursEnabledAttribute($value)
    {
        $this->attributes['working_hours_enabled'] = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }

    public function getCloseBookingOutsideHoursAttribute($value)
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setCloseBookingOutsideHoursAttribute($value)
    {
        $this->attributes['close_booking_outside_hours'] = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }

    public function getDisableSlugAttribute($value)
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setDisableSlugAttribute($value)
    {
        $this->attributes['disable_slug'] = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }
}
