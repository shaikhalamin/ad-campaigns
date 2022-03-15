<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Advertisement>
 */
class AdvertisementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'from' => $this->faker->date,
            'to' => $this->faker->date,
            'total_budget' => $this->faker->randomNumber(),
            'daily_budget' => $this->faker->randomNumber(),
        ];
    }
}
