<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminEmailIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->email_verified_at === null) {
            return to_route('verification.notice');
        }

        return $next($request);
    }
}
