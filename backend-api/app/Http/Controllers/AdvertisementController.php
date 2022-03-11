<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdvertisementRequest;
use App\Http\Requests\UpdateAdvertisementRequest;
use App\Models\Advertisement;
use App\Models\Image;
use PhpParser\Node\Stmt\TryCatch;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data = Advertisement::with('images')->paginate(20);
        return [
            "data" => $data,
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAdvertisementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAdvertisementRequest $request)
    {

        try {
            $advertisement = Advertisement::create($request->validated());
            $imagesData = [];
            if ($request->hasFile('images')) {

                foreach ($request->file('images') as $key => $file) {
                    $name = md5($request->name . $request->from . $request->to . $request->daily_budget . $key) . '.' . $file->getClientOriginalExtension();
                    $file->move(public_path('/uploads/files/'), $name);
                    $imagesData[] = $name;

                    $image = new Image();
                    $image->url = $name;
                    $image->advertisement_id = $advertisement->id;
                    $image->save();
                }
            }

            return [
                "data" => $advertisement,
            ];
        } catch (\Exception $e) {
            return [
                "status" => $e->getCode(),
                "error" => $e->getMessage()
            ];
        }
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
        //
    }
}
