<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
    $this->get(route('dashboard.section', 'analytics/overview'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->where('auth.user.email', $user->email));
});

test('authenticated users can visit nested dashboard sections', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.section', 'analytics/reports/sales'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('section')
            ->where('section', 'analytics/reports/sales'));
});

test('dashboard sections reject invalid paths', function () {
    $this->actingAs(User::factory()->create())
        ->get('/dashboard/Invalid_Section!')
        ->assertNotFound();
});
