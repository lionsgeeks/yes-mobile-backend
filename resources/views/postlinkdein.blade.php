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
      .container img {
        width: 100%;
        max-width: 800px;
        height: auto;
      }
      .name {
        position: absolute;
        left: 30%;
        top: 38%;
        color: black;
        font-size: 2rem;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src={{ asset('assets/images/coursera-certificate-copy.jpg') }} alt="Certificate" />
      <p class="name" id="username">User</p>
    </div>
    <script>
      // Get the URL parameters
      const params = new URLSearchParams(window.location.search);
      // Get the 'name' parameter
      const name = params.get('name');
      let realName = name.replace('_', ' ');
      if (realName) {
        document.getElementById('username').textContent = realName;
      }
    </script>
  </body>
</html>
