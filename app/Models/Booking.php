<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'invoice', 'user_id', 'client_name', 'client_whatsapp', 'client_instagram', 
        'event_type', 'event_date', 'event_time', 'event_location', 'event_location_detail', 
        'partner_name', 'partner_instagram', 'guest_estimation', 'notes', 
        'selected_package_id', 'selected_packages', 'selected_addons', 'total_price', 'dp_amount', 
        'payment_method', 'status'
    ];

    protected $casts = [
        'selected_packages' => 'array',
        'selected_addons' => 'array',
        'total_price' => 'decimal:2',
        'dp_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function freelancers()
    {
        return $this->belongsToMany(TeamMember::class, 'booking_team_member');
    }
}
