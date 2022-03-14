<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Throwable $e, $request) {
            if ($e instanceof NotFoundHttpException) {
                $message = 'Resource not found!';

                return response()->json(['message' => $message, 'errors' => []], $e->getStatusCode());
            }

            if ($e instanceof MethodNotAllowedHttpException) {
                $message = $e->getMessage();

                return response()->json(['message' => $message, 'errors' => []], $e->getStatusCode());
            }

            if ($e instanceof ValidationException) {
                $message = $e->getMessage();
                $errors = $e->errors();

                return response()->json(['message' => $message, 'errors' => $errors], $e->status);
            }

            if ($e instanceof HttpException) {
                $message = 'Something went wrong';

                return response()->json(['message' => $message, 'errors' => []], $e->getStatusCode());
            }
        });
    }
}
