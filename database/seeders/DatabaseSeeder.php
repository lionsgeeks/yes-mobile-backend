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

        User::insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin@gmail.com'),
        ]);

        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->words(3, true),
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->words(2, true),
            ]);
        }
        for ($i = 0; $i < 5; $i++) {
            Interest::create([
                'name' => fake()->words(1, true),
            ]);
        }
    }
}
