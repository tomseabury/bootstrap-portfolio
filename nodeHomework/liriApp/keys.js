console.log('this is loaded');
var Twitter = require('twitter');

var twitterKeys = new Twitter( {
  consumer_key: 'j9q6oNytxgf5KTNvRUxY6lHEI',
  consumer_secret: 'hy2FS4NxJnMzafOlNKqZNgHrjXbamSSOPhA7EldFJQumECr1S1',
  access_token_key: '972256036852662272-iGfwpG0K3QJEK5AEGpkiiFiDYH2vvE7',
  access_token_secret: '6da84YLaxWxaeXRgamFDLXt7hHW4r7x97eE5GNeOUf9Lm',
});

module.exports = twitterKeys;