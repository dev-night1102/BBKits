<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add new role values to enum by modifying the column
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('vendedora', 'admin', 'financeiro', 'finance_admin', 'production_admin') NOT NULL DEFAULT 'vendedora'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to original enum values
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('vendedora', 'admin', 'financeiro') NOT NULL DEFAULT 'vendedora'");
    }
};