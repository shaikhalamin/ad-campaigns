<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdvertisementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'from' => 'required|date',
            'to' => 'required|date',
            'total_budget' => 'required|numeric',
            'daily_budget' => 'required|numeric',
            'images.*' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg',
        ];
    }
}
