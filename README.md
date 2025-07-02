# iPod Desktop Widget ٩(^ᗜ^ )و 

Custom desktop music display widget to quickly show what you're listening to on spotify. Styled to replicate a retro ipod look!

### Sample:
![Screenshot 2025-07-01 145811](https://github.com/user-attachments/assets/33f3afd3-c6d3-43d9-90a6-367a714c782f)

## Tech Stack:
★ Electron.JS\
★ React.JS\
★ JavaScript\
★ Vite\
★ CSS\
★ Spotify API

## Requirements:
★ Node.JS\
★ Electron\
★ Concurrrently\
★ Wait-on\
★ Cross-env

## Creating Spotify API and Refresh Token [^1]

### Create a Spotify App
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/).
2. Log in to your Spotify account.
3. Navigate to the **Dashboard** and click **"Create App"**.
4. Fill in your project details and create the app.
5. You'll now have access to your **Client ID** and **Client Secret**.

### Generate Authorization Code
To get a **refresh token**, you'll need:
- `client_id`
- `client_secret`
- `redirect_uri`

Construct the following URL by replacing the placeholders:</br>
`https://accounts.spotify.com/en/authorize?client_id=<your_client_id>&response_type=code&redirect_uri=<your_redirect_uri>&scope=user-read-currently-playing`
> If your redirect URI is local, make sure your dev server is **running** before visiting the link.
After clicking the link and authorizing, you'll be redirected to your redirect uri, copy the value that occurs after **code**.

### Encode Your Credentials
1. Visit [base64encode.org](https://www.base64encode.org/).
2. Paste your credentials in this format:</br>
`client_id:client_secret`
3. Click **"Encode"** and copy the resulting string.

### Get Your Refresh Token
Use the `curl` command below on [ReqBin](https://reqbin.com/curl) or your terminal.

```bash
curl -H "Authorization: Basic <your_base64_encoded_credentials>" 
  -d grant_type=authorization_code 
  -d code=<your_code> 
  -d redirect_uri=<your_redirect_uri> 
  https://accounts.spotify.com/api/token
```
You’ll get a JSON response like:</br>
```js
{
  "access_token": "BQD...woC",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "AQD...w-e4",
  "scope": "user-read-currently-playing"
}
```
You will only need the "refresh_token".

### Add To Your Code
In your NowPlaying.jsx, insert:</br>
`client_id, client_secret, refresh_token`</br>
</br>
To run your widget locally, run the following command:</br>
`npm run electron:dev`</br>
</br>
**You now have a functional desktop ipod widget!** </br>


[^1]: https://medium.com/@alagappan.dev/create-a-now-playing-widget-using-the-spotify-web-api-in-react-a6cb564ed923
