<?php

namespace App\Services\AdCampaign;

use App\Models\Advertisement;
use App\Services\Factories\FileUploadFactory;

class FileUploadService
{

    public function uploadFiles(array $files, Advertisement $advertisement, string $uploadDriver): array
    {
        $fileNames = [];

        $fileUploadFactory = FileUploadFactory::create($uploadDriver);

        foreach ($files as $key => $file) {
            $name = md5($advertisement->name . $advertisement->from . $advertisement->to . $advertisement->daily_budget . time()) . '.' . $file->getClientOriginalExtension();
            $fileUploadFactory->upload($file, $name);
            $fileNames[] = $name;
        }

        return $fileNames;
    }
}
