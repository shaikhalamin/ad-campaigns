<?php

namespace App\Services\AdCampaign;

use App\Models\Advertisement;
use Illuminate\Contracts\Pagination\Paginator;

class AdCampaignService
{
    public function list(): Paginator
    {

        return Advertisement::with('images')->paginate(20);
    }

    public function create(array $data): Advertisement
    {
        return Advertisement::create($data);
    }


    public function update(array $data, Advertisement $advertisement): Advertisement
    {
        $advertisement->update($data);
        return $advertisement;
    }
}