<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama',
        'peran',
        'phone_country_code',
        'phone_number',
        'email',
        'tags',
        'pricelist',
        'status',
    ];

    protected $casts = [
        'tags' => 'array',
        'pricelist' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_team_member');
    }
}
