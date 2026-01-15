const Snoowrap = require('snoowrap');

// Instructions:
// 1. Run `npm install snoowrap` if you haven't already.
// 2. Fill in the credentials below (from reddit.com/prefs/apps).
// 3. Run `node scripts/get-reddit-token.js`
// 4. Copy the Refresh Token to your .env file.

const r = new Snoowrap({
    userAgent: 'MyBot/1.0',
    clientId: 'YOUR_CLIENT_ID_HERE',
    clientSecret: 'YOUR_CLIENT_SECRET_HERE',
    username: 'YOUR_REDDIT_USERNAME',
    password: 'YOUR_REDDIT_PASSWORD'
});

r.getMe().then(user => {
    console.log("Success! Connected as:", user.name);
    console.log("------------------------------------------------");
    console.log("YOUR REFRESH TOKEN:", r.refreshToken);
    console.log("------------------------------------------------");
    console.log("Add this to your .env file as REDDIT_REFRESH_TOKEN");
}).catch(err => {
    console.error("Error:", err);
});
