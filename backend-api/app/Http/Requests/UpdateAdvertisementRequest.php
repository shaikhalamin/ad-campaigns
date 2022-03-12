<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdvertisementRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'from' => 'sometimes|required|date',
            'to' => 'sometimes|required|date',
            'total_budget' => 'sometimes|required|numeric',
            'daily_budget' => 'sometimes|required|numeric',
            'images.*' => 'sometimes|required',
        ];
    }
}
