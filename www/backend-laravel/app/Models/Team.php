<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $table = 'Team';
    public $timestamps = true;
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $guarded = ['id'];
    protected $casts = [
        'accessCode' => 'string',
        'plannedStartingTime' => 'datetime',
        'startingTime' => 'datetime'
    ];

    public function averagePace()
    {
        if ($this->runners()->count() <= 0) {
            return "6:00";
        }

        $seconds = $this->runners->map(function ($runner) {
            [$min, $sec] = explode(':', $runner->pace);
            return $min * 60 + $sec;
        });

        return gmdate('i:s', $seconds->avg());
    }

    public function runners()
    {
        return $this->hasMany(Runner::class, 'teamId');
    }
}
