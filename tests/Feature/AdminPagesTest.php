<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin section pages redirect guests to login', function () {
    $response = $this->get('/admin/overview');

    $response->assertRedirect('/login');
});

test('admin section pages redirect unverified users to email verification', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get('/admin/overview');

    $response->assertRedirect(route('verification.notice'));
});

test('verified users can open each admin section', function () {
    $user = User::factory()->create();
    $pages = [
        '/admin/overview' => 'Admin/Overview',
        '/admin/owner-view' => 'Admin/OwnerView',
        '/admin/bookings' => 'Admin/Bookings',
        '/admin/calendar' => 'Admin/Calendar',
        '/admin/venues-courts' => 'Admin/VenuesCourts',
        '/admin/tournaments' => 'Admin/Tournaments',
        '/admin/shop-inventory' => 'Admin/ShopInventory',
        '/admin/users-staff' => 'Admin/UsersStaff',
        '/admin/reports' => 'Admin/Reports',
    ];

    foreach ($pages as $uri => $component) {
        $response = $this->actingAs($user)->get($uri);

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component($component));
    }
});
