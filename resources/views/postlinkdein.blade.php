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
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .img {
        width: 100%;
        max-width: 800px;
        height: auto;
      }
      .name {
        position: absolute;
        left: 65%;
        top: 58%;
        color: #2952a3;
        font-size: 1rem;
        font-weight: bolder;
        text-transform: capitalize
      }
      .role {
        position: absolute;
        left: 67%;
        top: 61%;
        color: #d4af37;
        font-size: 1rem;
        font-weight: 100;
        text-transform: capitalize
      }
      #avatar {
        position: absolute;
        left: 65.5%;
        top: 45%;
        width: 95px;
        height: 90px;
        border-radius: 50%;
        border: 2px solid white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="img" src={{ asset('assets/images/EMAIL_COVER.png') }} alt="Certificate" />
      <img id="avatar" class="avatar" src={{ asset('assets/images/avatar-generations_bssq.jpg') }} alt="profile" />
      <p class="name" id="username">User</p>
      <p class="role" id="userrole">User</p>
    </div>
    <script>
        const params = new URLSearchParams(window.location.search);

    const name = params.get('name');
    const role = params.get('role');
    const image = params.get('image');

    if (name) {
      const realName = name.replace('_', ' ');
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
