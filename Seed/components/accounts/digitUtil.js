'use strict'
// (digitResult) => { parse out tokens }

// export let validateEmail = (email) => {
//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

export let parseDigit = (device, jsonIn) => {
  var oauthResponse = jsonIn['X-Verify-Credentials-Authorization'];
  // console.log('==> DigiLogin: completion oauthResponse: ', oauthResponse);

  var headers = oauthResponse.split(','); // console.log('DigiLogin: -- headers: ', headers);
  var oauthDigit = {}

  oauthDigit = device === "Simulator" ?
    oauthDigit =  { digitToken: {
        oauth_timestamp:          headers[0].split('=')[1].replace(/["']/g, ""),
        oauth_version:            headers[1].split('=')[1].replace(/["']/g, ""),
        oauth_consumer_key:       headers[2].split('=')[1].replace(/["']/g, ""),
        oauth_signature:          headers[3].split('=')[1].replace(/["']/g, ""),
        oauth_token:              headers[4].split('=')[1].replace(/["']/g, ""),
        oauth_nonce:              headers[5].split('=')[1].replace(/["']/g, ""),
        oauth_signature_method:   headers[6].split('=')[1].replace(/["']/g, ""),
      }
    }
   :
  oauthDigit =  { digitToken: {
      oauth_signature:          headers[0].split('=')[1].replace(/["']/g, ""),
      oauth_nonce:              headers[1].split('=')[1].replace(/["']/g, ""),
      oauth_timestamp:          headers[2].split('=')[1].replace(/["']/g, ""),
      oauth_consumer_key:       headers[3].split('=')[1].replace(/["']/g, ""),
      oauth_token:              headers[4].split('=')[1].replace(/["']/g, ""),
      oauth_version:            headers[5].split('=')[1].replace(/["']/g, ""),
      oauth_signature_method:   headers[6].split('=')[1].replace(/["']/g, ""),
    }
  }

  // console.log('digitUtil: ', oauthDigit)
  return (
    oauthDigit
  )
}
