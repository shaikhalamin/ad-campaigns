<?php

namespace App\Services\Interfaces;

use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

interface FileUploadInterface
{
    public function upload(UploadedFile $file, string $filePath, ?array $options = []): File;
}
