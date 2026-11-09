<?php

use App\Models\User;

test('registration page can be rendered', function () {
    $this->get(route('register'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('auth/register'));
});

test('new users can register and are redirected to the dashboard', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
    expect(User::where('email', 'test@example.com')->exists())->toBeTrue();
});

test('registration requires valid input', function () {
    $this->post(route('register.store'), [
        'name' => '',
        'email' => 'not-an-email',
        'password' => 'password',
        'password_confirmation' => 'different',
    ])->assertSessionHasErrors(['name', 'email', 'password']);

    $this->assertGuest();
});

test('users cannot register with an email that is already taken', function () {
    $user = User::factory()->create();

    $this->post(route('register.store'), [
        'name' => 'Another User',
        'email' => $user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('authenticated users are redirected away from the registration page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('register'))
        ->assertRedirect(route('dashboard', absolute: false));
});
