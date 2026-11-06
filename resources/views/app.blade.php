<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Find nearby pickleball courts, check availability, and plan your next game with DinkZone.">
        <meta name="theme-color" content="#071b14">

        <title inertia>DinkZone</title>
        <link rel="icon" type="image/png" href="{{ asset('images/fav.png') }}">
        <meta property="og:site_name" content="DinkZone">
        <meta property="og:title" content="DinkZone">
        <meta property="og:description" content="Find nearby pickleball courts, check availability, and plan your next game with DinkZone.">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ asset('images/fav.png') }}">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="DinkZone">
        <meta name="twitter:description" content="Find nearby pickleball courts, check availability, and plan your next game with DinkZone.">
        <meta name="twitter:image" content="{{ asset('images/fav.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
