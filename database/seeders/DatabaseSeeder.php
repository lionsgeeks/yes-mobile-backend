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


        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->words(3),
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->words(2),
            ]);
        }
        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->word(),
            ]);
        }
    }
}
