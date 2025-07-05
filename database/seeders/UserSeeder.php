<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Administrador BBKits',
            'email' => 'admin@bbkits.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create Finance User
        User::create([
            'name' => 'Financeiro BBKits',
            'email' => 'financeiro@bbkits.com',
            'email_verified_at' => now(),
            'password' => Hash::make('financeiro123'),
            'role' => 'financeiro',
        ]);

        // Create Sales Users (Vendedoras)
        $vendedoras = [
            [
                'name' => 'Maria Silva',
                'email' => 'maria@bbkits.com',
                'password' => Hash::make('vendedora123'),
            ],
            [
                'name' => 'Ana Santos',
                'email' => 'ana@bbkits.com',
                'password' => Hash::make('vendedora123'),
            ],
            [
                'name' => 'Juliana Costa',
                'email' => 'juliana@bbkits.com',
                'password' => Hash::make('vendedora123'),
            ],
            [
                'name' => 'Carla Oliveira',
                'email' => 'carla@bbkits.com',
                'password' => Hash::make('vendedora123'),
            ],
            [
                'name' => 'Patricia Lima',
                'email' => 'patricia@bbkits.com',
                'password' => Hash::make('vendedora123'),
            ],
        ];

        foreach ($vendedoras as $vendedora) {
            User::create([
                'name' => $vendedora['name'],
                'email' => $vendedora['email'],
                'email_verified_at' => now(),
                'password' => $vendedora['password'],
                'role' => 'vendedora',
            ]);
        }

        $this->command->info('Users created successfully!');
        $this->command->info('Admin: admin@bbkits.com / admin123');
        $this->command->info('Financeiro: financeiro@bbkits.com / financeiro123');
        $this->command->info('Vendedoras: maria@bbkits.com, ana@bbkits.com, etc. / vendedora123');
    }
}