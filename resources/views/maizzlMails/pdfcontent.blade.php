<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" media="screen">
</head>
<body style="margin: 0; width: 100%; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div role="article" aria-roledescription="email" aria-label lang="en">
    <div style="width: 100%; margin-left: auto; margin-right: auto; max-width: 256px; border-radius: 12px; border-width: 1px; border-color: #e5e7eb; background-color: #fffffe; padding: 32px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)">
      <div style="margin-bottom: 32px; text-align: center">
        <h1 style="font-size: 30px; font-weight: 800; color: #111827">User Information</h1>
      </div>
      <div style="margin-bottom: 32px">
        <p style="color: #1f2937"><span style="font-weight: 600">Name:</span> {{ $name }}</p>
        <p style="color: #1f2937; margin-top: 12px; margin-bottom: 0"><span style="font-weight: 600">Role:</span> {{ $role }}</p>
        <p style="color: #1f2937; margin-top: 12px; margin-bottom: 0"><span style="font-weight: 600">Company:</span> {{ $company }}</p>
        <p style="color: #1f2937; margin-top: 12px; margin-bottom: 0"><span style="font-weight: 600">Country:</span> {{ $country }}</p>
      </div>
      <div style="margin-top: 32px; display: flex; flex-direction: column; align-items: center">
        <div style="display: flex; height: 144px; width: 144px; align-items: center; justify-content: center; border-radius: 8px; border: 4px dashed #9ca3af; background-color: #f9fafb">
          <img src="/public/storage/qrcodes/{{$fileName}}" alt="QR Code" style="max-width: 100%; vertical-align: middle; height: 128px; width: 128px; object-fit: contain" width="128" height="128">
        </div>
        <img src="/public/storage/images/lionsgeek.png" width="50" alt="Lionsgeek Logo" style="max-width: 100%; vertical-align: middle; margin-top: 24px">
      </div>
      @if (!empty($sponsors) && count($sponsors))
      <div style="margin-top: 40px; text-align: center">
        <h2 style="margin-bottom: 16px; font-size: 20px; font-weight: 700; color: #1f2937">Sponsors</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px">
          @foreach ($sponsors as $sponsor)
          <img src="/public/storage/{{$sponsor->image}}" alt="Sponsor Logo" style="max-width: 100%; vertical-align: middle; height: 64px; width: 64px; object-fit: cover" width="64" height="64">
          @endforeach
        </div>
      </div>
      @endif
      <div>
      </div>
    </div>
  </div>
</body>
</html>