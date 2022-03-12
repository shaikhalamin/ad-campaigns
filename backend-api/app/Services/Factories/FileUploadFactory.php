<?php

namespace App\Services\Factories;

use App\Services\Interfaces\FileUploadInterface;
use Exception;

class FileUploadFactory
{
    public static function create(string $driver): FileUploadInterface | Exception
    {
        $driverClass = 'App\\Services\\UploadDriver\\' . ucwords($driver);

        if (class_exists(!$driverClass)) {
            throw new Exception('UploadDriver class of type driver' . $driver . 'not found ');
        }

        return new $driverClass();
    }
}
