<?php

namespace App\Services\UploadDriver;

use App\Services\Interfaces\FileUploadInterface;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class Local implements FileUploadInterface
{
    public function upload(UploadedFile $file, string $fileName, ?array $options = []): File
    {
        $path = array_key_exists('path', $options) ? $options['path'] : '/uploads/files';
        $uploaded = $file->move(public_path($path), $fileName);

        //dump($uploaded);

        return $uploaded;
    }
}
