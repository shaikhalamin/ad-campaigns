<?php

namespace Tests\Feature;

use App\Models\Advertisement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class AdvertisementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test for index api of advertisement campaign.
     *
     * @return void
     */
    public function test_get_list_of_advertisement_campaigns()
    {
        $advertisement = Advertisement::factory(5)->create();

        $response = $this->get('/api/advertisements');

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'data' => [
                'current_page' => 1,
                'total' => 5,
            ],
        ]);
    }

    /**
     * A basic feature test creating new advertisement campaign.
     *
     * @return void
     */
    public function test_create_new_advertisement_campaign()
    {
        $file = UploadedFile::fake()->image('avatar.png');

        $payload = [
            'name' => 'Test Advertisement',
            'from' => '2020-01-01',
            'to' => '2022-01-01',
            'daily_budget' => '100',
            'total_budget' => '100',
            'images[]' => $file,
        ];

        $response = $this->post('/api/advertisements', $payload, ['Content-Type' => 'multipart/form-data']);

        $response
            ->assertStatus(201)
            ->assertJson([
                'success' => true,

            ]);

        $this->assertDatabaseHas('advertisements', [
            'daily_budget' => '100',
        ]);
    }

    /**
     * A basic feature test for fetching single advertisement campaign.
     *
     * @return void
     */
    public function test_fetch_single_advertisement_campaign()
    {
        $advertisement = Advertisement::factory()->create([
            'name' => 'Single Test Advertisement',
            'from' => '2020-01-01',
            'to' => '2022-01-01',
            'daily_budget' => '100',
            'total_budget' => '100',
        ]);

        $response = $this->get('/api/advertisements/' . $advertisement->id);
        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('advertisements', [
            'name' => 'Single Test Advertisement',
        ]);
    }

    /**
     * A basic feature test for updating single advertisement campaign.
     *
     * @return void
     */
    public function test_update_advertisement_campaign()
    {
        $advertisement = Advertisement::factory()->create([
            'name' => 'Single Test Advertisement',
            'from' => '2020-01-01',
            'to' => '2022-01-01',
            'daily_budget' => '100',
            'total_budget' => '100',
        ]);

        $file = UploadedFile::fake()->image('avatar.png');

        $response = $this->post('/api/advertisements/' . $advertisement->id, [
            'name' => 'Updated Test Advertisement',
            'from' => '2020-01-01',
            'to' => '2022-01-01',
            'daily_budget' => '100',
            'total_budget' => '200',
            'images[]' => $file,
            '_method' => 'PUT',

        ], ['Content-Type' => 'multipart/form-data']);

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => 1,
                    'name' => 'Updated Test Advertisement',
                    'from' => '2020-01-01',
                    'to' => '2022-01-01',
                    'total_budget' => '200',
                    'daily_budget' => '100',
                ],
            ]);

        $this->assertDatabaseHas('advertisements', [
            'name' => 'Updated Test Advertisement',
            'total_budget' => '200',
        ]);
    }
}
