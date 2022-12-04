<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>{{ getenv('APP_NAME') }}</title>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/sass/app.scss', 'resources/js/app.jsx'])
</head>

<body>
    <div id="app"></div>
</body>

</html>