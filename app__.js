const express = require('express')
const app = express()
const port = 8888

app.get('/', (req, res) => {
  console.log('testt')
  res.send('Hello World! test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var client_id = 'aa7601bf18b64ac1ac3e9ce8132c1853';
var client_secret = '6bc9825b4a114b61b6e843baed3c30bc';
var redirect_uri = 'http://localhost:8888/callback';

// var app = express();

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const uriEncode = (obj) => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


app.get('/login', function(req, res) {
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  const qStr = {
    response_type: 'code',
    scope: scope,
    state: state,
    redirect_uri: redirect_uri,
    client_id: client_id,
    ...req.query,
  }

  res.redirect('https://accounts.spotify.com/authorize?' + uriEncode(qStr));
  // res.redirect('https://accounts.spotify.com/authorize?' + uriEncode(qStr))
  /*
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
    }));
  */
});

app.get('/callback', function(req, res) {

  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    
    res.redirect('/#' +
      uriEncode({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true
    };


    console.log('testt')
  }
});

// function zei() {
//   console.log(qStr);
// }

// zei();