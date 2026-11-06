<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureAdminEmailIsVerified;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Onboarding');
})->name('home');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/onboarding', function () {
    return Inertia::render('Onboarding');
})->name('onboarding');

Route::get('/courts', function () {
    return Inertia::render('Courts');
})->name('courts');

Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop');

Route::get('/events', function () {
    return Inertia::render('Events');
})->name('events');

Route::get('/bookings', function () {
    return Inertia::render('Bookings');
})->name('bookings');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', EnsureAdminEmailIsVerified::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/overview', fn () => Inertia::render('Admin/Overview'))->name('overview');
        Route::get('/owner-view', fn () => Inertia::render('Admin/OwnerView'))->name('owner-view');
        Route::get('/bookings', fn () => Inertia::render('Admin/Bookings'))->name('bookings');
        Route::get('/calendar', fn () => Inertia::render('Admin/Calendar'))->name('calendar');
        Route::get('/venues-courts', fn () => Inertia::render('Admin/VenuesCourts'))->name('venues-courts');
        Route::get('/tournaments', fn () => Inertia::render('Admin/Tournaments'))->name('tournaments');
        Route::get('/shop-inventory', fn () => Inertia::render('Admin/ShopInventory'))->name('shop-inventory');
        Route::get('/users-staff', fn () => Inertia::render('Admin/UsersStaff'))->name('users-staff');
        Route::get('/reports', fn () => Inertia::render('Admin/Reports'))->name('reports');
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
