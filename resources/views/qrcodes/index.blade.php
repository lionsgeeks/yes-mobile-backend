<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QR Codes List</title>
</head>
<body>
    <h1>QR Codes</h1>
    <a href="{{ route('qrcodes.create') }}">Create New QR Code</a>

    @if(session('success'))
        <p style="color: green">{{ session('success') }}</p>
    @endif

    <ul>
        @foreach($qrCodes as $qr)
            <li>
                {{ $qr->content }}<br>
                <img src="{{ asset('storage/' . $qr->file_path) }}" width="100" alt="QR Code">
            </li>
        @endforeach
    </ul>
</body>
</html>
