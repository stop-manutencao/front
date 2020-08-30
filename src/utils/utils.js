export function isEmailValid(email)
{
    let szEmail = String(email);
    let emailRegex = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegex.test(szEmail);
}

export function isNicknameValid(nick)
{
   let szNick = String(nick);
   let nickRegex = /^([a-zA-Z0-9_-\s]){3,32}$/
   return nickRegex.test(szNick);
}
