<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create QR Code</title>
</head>
<body>
    <h1>Create New QR Code</h1>

    <form method="POST" action="{{ route('qrcodes.store') }}">
        @csrf
        <label for="content">Content:</label>
        <input type="text" name="content" id="content" required>
        <button type="submit">Generate QR Code</button>
    </form>

    <a href="{{ route('qrcodes.index') }}">Back to QR Codes List</a>
</body>
</html>
