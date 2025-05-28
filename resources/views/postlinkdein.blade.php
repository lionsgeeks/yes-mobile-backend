<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Certificate</title>
    <style>
        body,
        html {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: #f3f4f6;
            font-family: sans-serif;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .relative-wrapper {
            position: relative;
            width: 100%;
            max-width: 800px;
        }

        .img {
            width: 100%;
            height: auto;
            display: block;
        }

        .name {
            position: absolute;
            left: 78%;
            top: 59%;
            color: #2952a3;
            width: 150px;
            font-size: 1.1rem;
            font-weight: bolder;
            text-transform: capitalize;
            white-space: pre-line
        }

        .role {
            position: absolute;
            left: 83%;
            top: 68%;
            color: #d4af37;
            font-size: 1rem;
            font-weight: 100;
            text-transform: capitalize;
        }


        #avatar {
            position: absolute;
            left: 80%;
            top: 43%;
            width: 85px;
            height: 82px;
            border-radius: 50%;
            border: 2px solid rgb(13, 12, 12);
            object-fit: cover;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="relative-wrapper">
            <img class="img" src="{{ asset('assets/images/EMAIL_COVER.png') }}" alt="Certificate" />
            <img id="avatar" src="{{ asset('assets/images/avatar-generations_bssq.jpg') }}" alt="profile" />
            <p class="name" id="username">User</p>
            <p class="role" id="userrole">User</p>
        </div>
    </div>

    <script>
        const params = new URLSearchParams(window.location.search);

        const name = params.get('name');
        const role = params.get('role');
        const image = params.get('image');

        if (name) {
            const realName = name.replace(/_/g, ' ');
            document.getElementById('username').textContent = realName;
        }

        if (role) {
            const realrole = role.replace('_', ' ');
            document.getElementById('userrole').textContent = realrole;
        }

        if (image) {
            document.getElementById('avatar').src = `/storage/${image}`;
        }
    </script>
</body>

</html>
