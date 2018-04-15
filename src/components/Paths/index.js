const currentLink = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')

const ajaxProdUrl = 'https://pesawise.co.ke/api';
const ajaxDevUrl = currentLink+'/ajax';

const prodUrl = 'https://pesawise.co.ke';
const devUrl = currentLink;

const adsense = {
   client: "ca-pub-9133489553464763",
   slot: "2012366852"
}

export const ajaxUrl = process.env.NODE_ENV == 'production' ? ajaxProdUrl : ajaxDevUrl;
export const canonUrl = process.env.NODE_ENV == 'production' ? prodUrl : devUrl;
export const gaAddress = process.env.NODE_ENV == 'production' ? adsense : adsense;