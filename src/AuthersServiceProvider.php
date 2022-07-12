<?php

namespace Kigamekun\AuthApi;

use Illuminate\Support\ServiceProvider;

class AuthersServiceProviders extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Controller Publish
        $this->publishes([
            __DIR__.'/../resources/controllers' => app_path('Http/Controllers'),
        ]);
    }
}
