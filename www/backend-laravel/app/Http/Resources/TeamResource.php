<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        JsonResource::withoutWrapping();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'contactEmail' => $this->contactEmail,
            'plannedStartingTime' => $this->plannedStartingTime,
            'startingTime' => $this->startingTime,
            'accessCode' => $this->accessCode,
            'averagePace' => $this->averagePace(),
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        ];
    }
}
