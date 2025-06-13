<?php

namespace App\Exports;

use App\Models\Participant;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ParticipantsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{

    public $role;

    public function __construct(string $role)
    {
        $this->role = $role;
    }

    public function query()
    {
        return Participant::query()->where('role', $this->role);
    }

    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Role',
            'Company',
            'Country',
            'City',
            'Location',
            'Description',
            'Creation Date',
            'Last Sign-in',
            'website',
            'linkedin',
            'youtube',
            'instagram',
        ];
    }

    public function map($participant): array
    {
        return [
            $participant->name,
            $participant->email,
            $participant->role,
            $participant->company,
            $participant->country,
            $participant->city,
            $participant->location,
            $participant->description,
            $participant->created_at,
            $participant->updated_at,
            $participant->social?->website,
            $participant->social?->linkedin,
            $participant->social?->youtube,
            $participant->social?->instagram,
        ];
    }
}
