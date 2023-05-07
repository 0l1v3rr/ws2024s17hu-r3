<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Runner extends Model
{
    use HasFactory;
    protected $table = 'Runner';

    public function team()
    {
        return $this->belongsTo(Team::class, 'teamId');
    }
}
