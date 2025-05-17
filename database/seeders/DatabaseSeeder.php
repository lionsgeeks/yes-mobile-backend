<?php

namespace Database\Seeders;

use App\Models\Interest;
use App\Models\Participant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
  public function run(): void
{
    $interests = [
        'Tech & Innovation',
        'Renewable Energy',
        'Youth Empowerment',
        'Agriculture & Food',
        'Financial Inclusion',
        'Health & Wellness',
        'Migration & Security',
        'Volunteering',
        'Education & Training',
        'Disability Inclusion',
    ];

    foreach ($interests as $interest) {
        Interest::create([
            'name' => $interest,
        ]);
    }
}

}
