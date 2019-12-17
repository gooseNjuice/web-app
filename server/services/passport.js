// Passport imports
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

// .env imports
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

// Mongoose
const mongoose = require("mongoose");
const User = mongoose.model("users");
const FollowedArtists = mongoose.model("followed_Artists");

passport.serializeUser((user, done) => {
  done(null, { user: { id: user.id, access_token: user.accessToken } });
});

passport.deserializeUser((userID, done) => {
  console.log("userID:", userID);
  User.findOne({ spotify_uid: userID }, (err, user) => {
    return done(null, userID);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      User.findOne({ spotify_uid: profile.id }, (err, user) => {
        if (!user) {
          const newUser = new User({
            spotify_uid: profile.id,
            spotify_access_token: accessToken,
            spotify_refresh_token: refreshToken,
            display_name: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos
          });
          const followedArtists = new FollowedArtists({
            spotify_uid: profile.id
          });

          try {
            followedArtists.save(err => {
              if (err) throw new Error(err);

              newUser.save(err => {
                if (err) throw new Error(err);
                return done(null, { ...profile, accessToken });
              });
            });
          } catch (err) {
            console.log("Error saving new user.. : ", err);
          }
        } else {
          return done(null, { ...profile, accessToken });
        }
      });
    }
  )
);