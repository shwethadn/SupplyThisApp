// //authorization grant type: Resource owner password-based.
// const HOST_ADRESS = "192.168.104.137:8000"; //change with your own host 
// const client_id   = "ee20416081d097b4564ed571577caf23fb7f21830c4821a7def33e1b83218a2b";
// fetch('http://'+HOST_ADRESS+"/oauth/token/", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Cache-Control': 'no-cache'
//     },
//     body: "client_id=sfjwepifjpfweijgpeijSGIOEJOPGIWSJA35340537530708&grant_type=password&username="+username+"&password="+password
// })
// .then((response) => response.text())
// .then((responseText) => {
//     console.log(responseText);
//     //redux succed do something.
//     //dispatch(actionsCreators.succesLogin(responseText));
// })
// .catch((error) => {
//     const data = {error: "A error happened"};
//     //redux error.   
//     //dispatch(actionsCreators.errorLogin(data));
//     console.warn(error);
// });
   

module.exports = {
  app_key: 'st7hbd0gtbk5ud3',
  access_token: 'f9de3c900c25da73c85a0c6c73deac1d365e74035107599d43205ef78770ad5d'
}
