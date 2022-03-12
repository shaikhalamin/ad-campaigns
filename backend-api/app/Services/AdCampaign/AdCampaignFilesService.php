<?php

namespace App\Services\AdCampaign;

use App\Models\Image;

class AdCampaignFilesService
{
    public function saveMany(array $fileNames, int $advertisementId): void
    {
        foreach ($fileNames as $url) {
            $saved = $url ? Image::create(['url' => $url, 'advertisement_id' => $advertisementId]) : null;
        }
    }
}
