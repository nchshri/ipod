# iPod Desktop Widget ٩(^ᗜ^ )و 

Custom desktop music display widget to quickly show what you're listening to on spotify. Styled to replicate a retro ipod look!

## Sample:
![Screenshot 2025-07-01 145811](https://github.com/user-attachments/assets/33f3afd3-c6d3-43d9-90a6-367a714c782f)

## Tech Stack:
⋆ Electron.JS
⋆ React.JS
⋆ Vite
⋆ CSS
⋆ Spotify API

## Requirements:
⋆ Node.JS
⋆ Electron
⋆ Concurrrently
⋆ Wait-on
⋆ Cross-env

## Good-to-know
⋆ You will have to setup your own Spotify API using your own account. Navigate to https://developer.spotify.com/. Log in to your spotify account and then go to your dashboard. Click create app and input your project information. You will then be able to access your client id and client secret. 
⋆ To create the refresh token you will need the client id and redirect uri. Create the following link in your browser using your information. IF your redirect is local, make sure to start the development server before searching the link.
  > https://accounts.spotify.com/en/authorize?client_id=**<your_client_id>**&response_type=code&redirect_uri=**<your_redirect_uri>**&scope=user-read-currently-playing
⋆ 
