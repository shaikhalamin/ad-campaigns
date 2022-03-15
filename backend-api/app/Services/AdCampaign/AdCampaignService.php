<?php

namespace App\Services\AdCampaign;

use App\Models\Advertisement;
use Illuminate\Contracts\Pagination\Paginator;

class AdCampaignService
{
    public function list(): Paginator
    {
        return Advertisement::orderBy('updated_at', 'desc')->with('images')->paginate(20);
    }

    public function create(array $data): Advertisement
    {
        return Advertisement::create($data);
    }

    public function show(Advertisement $advertisement): Advertisement
    {
        return $advertisement->load('images');
    }

    public function update(array $data, Advertisement $advertisement): Advertisement
    {
        $advertisement->update($data);

        return $advertisement;
    }
}
