<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Requests\UpdateAdvertisementRequest;
use App\Models\Advertisement;
use App\Services\AdCampaign\AdCampaignFilesService;
use App\Services\AdCampaign\AdCampaignService;
use App\Services\AdCampaign\FileUploadService;

class AdvertisementController extends Controller
{

    public function __construct(public AdCampaignService $adCampaignService, public FileUploadService $fileUploadService, public AdCampaignFilesService $adCampaignFilesService)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->adCampaignService->list();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAdvertisementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAdvertisementRequest $request)
    {
        $advertisement = $this->adCampaignService->create($request->validated());

        if ($request->hasFile('images')) {
            $files = $this->fileUploadService->uploadFiles($request->file('images'), $advertisement, "local");

            $this->adCampaignFilesService->saveMany($files, $advertisement->id);
        }
        return [
            "data" => $advertisement,
        ];
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAdvertisementRequest  $request
     * @param  \App\Models\Advertisement  $advertisement
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAdvertisementRequest $request, Advertisement $advertisement)
    {

        $updatedAdvertisement =  $this->adCampaignService->update($request->validated(), $advertisement);

        if ($request->hasFile('images')) {
            $files = $this->fileUploadService->uploadFiles($request->file('images'), $updatedAdvertisement, "local");
            $this->adCampaignFilesService->saveMany($files, $updatedAdvertisement->id);
        }

        return [
            "data" => $updatedAdvertisement,
        ];
    }
}
