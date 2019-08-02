let domainURL;
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    domainURL = 'https://driftisland-api.herokuapp.com'
} else {
    domainURL = 'http://localhost:5000'
}

export {domainURL};