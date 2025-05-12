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
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);



        // create 10 participants with a random email and the same password 'lionsgeek'
        for ($i = 1; $i <= 15; $i++) {
            Participant::create([
                'name' => 'Participant ' . $i,
                'email' => 'pt' . $i . '@yes.com',
                'password' => Hash::make('lionsgeek'),
                "role" => "visitor",
                "image" => 'https://randomuser.me/api/portraits/men/85.jpg',
                'description' => 'hello from participant'
            ]);
        }
        for ($i = 0; $i < 20; $i++) {
            Interest::create([
                'name' => fake()->word(), 
                
            ]);
        }

       
        $interests = Interest::all();
        $participants = Participant::all();

        foreach ($participants as $participant) {
            $participant->interesets()->attach($interests->random(2)->pluck('id')->toArray());
        }

    }
}
