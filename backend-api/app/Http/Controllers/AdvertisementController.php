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
        $response = [
            'data' => $this->adCampaignService->list()
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Advertisement  $advertisement
     * @return \Illuminate\Http\Response
     */
    public function show(Advertisement $advertisement)
    {
        $response = [
            'data' => $this->adCampaignService->show($advertisement)
        ];

        return response()->json($response, 200);
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
            $files = $this->fileUploadService->uploadFiles($request->file('images'), $advertisement, 'local');

            $this->adCampaignFilesService->saveMany($files, $advertisement->id);
        }

        $response = [
            'data' => $this->adCampaignService->show($advertisement)
        ];

        return response()->json($response, 200);
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
        $updatedAdvertisement = $this->adCampaignService->update($request->validated(), $advertisement);

        if ($request->hasFile('images')) {
            $files = $this->fileUploadService->uploadFiles($request->file('images'), $updatedAdvertisement, 'local');
            $this->adCampaignFilesService->saveMany($files, $updatedAdvertisement->id);
        }

        $response = [
            'data' => $this->adCampaignService->show($updatedAdvertisement)
        ];

        return response()->json($response, 200);
    }
}
