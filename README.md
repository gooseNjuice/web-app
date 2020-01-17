# Startup

- npm run dev

- Navigate to: http://localhost:8080/

# Setup

## npm install

- run 'npm install' in your command line.

On the install, be sure that devDependencies have also been downloaded into node_modules. If you're on a windows computer it's likely that production mode is turned on. Turn off production mode and re-run npm install.

https://stackoverflow.com/a/35098833/2303395

You can tell that devDependencies haven't been installed if during startup (kicked off by 'npm run dev') the values from process.env are undefined.

## Spotify Keys and Configuration

- [Go to the spotify api dashboard.](https://developer.spotify.com/dashboard/)
- Click "Create an app"

  ![](https://i.imgur.com/mZuEBd6.png)

- Fill out the form.

  ![](https://i.imgur.com/MXxDN8a.png)

- This is a hobby project (for now!), say no for commercial integration.

- Client ID and Client Secret

  ![](https://i.imgur.com/MCbM9Hf.png)

- Click 'Edit Settings'

  - Fill in the following fields, then scroll to the bottom and click Save.

  - Website

    - http://localhost:3000/

  - Redirect URLs

    - http://localhost:3000/auth/callback
    - http://localhost:8080/api/auth/callback

  - MAKE SURE YOU SCROLL TO THE BOTTOM AND CLICK SAVE

  - ARE YOU SURE YOU SCROLLED TO THE BOTTOM TO CLICK SAVE?!

  ![](https://i.imgur.com/gJMnRTX.png)

## MongoDB Keys and Configuration

- [Create an account for mongoDB atlas](mongodb.com/cloud/atlas)

- Select the starter clusters

  ![](https://i.imgur.com/CWvGsnr.png)

- Set the project name to 'festivus' and click 'create cluster'.

  ![](https://i.imgur.com/oii5sRW.png)

- Click connect

  ![](https://i.imgur.com/8pVcHpf.png)

- Connecting

  - Add the following IP: 0.0.0.0

    - 0.0.0.0 whitelists every IP. If you set this up for prod, remove this and replace it with the specific IP's that'll be accessing MongoDB.

  - Create a MongoDB User

  ![](https://imgur.com/GI6G4k2.png)

- Click 'Connect Your Application'

  ![](https://imgur.com/PbMWrJY.png)

- Get the connection string for the MONGO_URI field in .env

  - MAKE SURE YOU UPDATE \<password> WITH YOUR PASSWORD
  - ARE YOU SURE YOU DELETED \<password> FROM THE STRING AND REPLACED IT WITH THE DB USER PASSWORD??

  ![](https://imgur.com/6hwn039.png)

## Cookie Key

- This can be anything
