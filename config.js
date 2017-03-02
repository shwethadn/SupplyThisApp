//authorization grant type: Resource owner password-based.
const HOST_ADRESS = "http://192.168.0.113:3000"; //change with your own host 
const client_id   = "ee20416081d097b4564ed571577caf23fb7f21830c4821a7def33e1b83218a2b";
const client_secrete = "a1e94abb64858a72f4b17392c731ef7705396ebe5c6681211940f464f11e403f";
const aut_code = "8c3408ad5ee44614418c08624ff4d78f919c3ac26380f9342e1954758dd365a6";
const redir_uri = "urn:ietf:wg:oauth:2.0:oob";

var accessTokenRequest = new Request(HOST_ADRESS+"/oauth/token/", {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }, 
  body: JSON.stringify({
    client_id: client_id,
    client_secrete: client_secrete,
    grant_type: "authorization_code",
    code: aut_code,
    redirect_uri: redir_uri,
  })
});

fetch(accessTokenRequest)
.then((response) => response.json())
.then((responseText) => {
    console.log(responseText);
    //redux succed do something.
    //dispatch(actionsCreators.succesLogin(responseText));
})
.catch((error) => {
    const data = {error: "A error happened"};
    //redux error.   
    //dispatch(actionsCreators.errorLogin(data));
    console.warn(error);
});


module.exports = {
  access_token: 'be80d65ce2ccf2e108f14b22c418fc5e6a6094d38f4081855d9ec969293d287b'
}
