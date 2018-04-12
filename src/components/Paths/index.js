const ajaxProdUrl = 'https://pesawise.co.ke/api';
const ajaxDevUrl = 'http://marcossi.duckdns.org:8080/ajax';
// const ajaxDevUrl = 'http://localhost:8080/ajax';

const prodUrl = 'https://pesawise.co.ke';
const devUrl = 'http://marcossi.duckdns.org:8080';
// const devUrl = 'http://localhost:8080';

export const ajaxUrl = process.env.NODE_ENV == 'production' ? ajaxProdUrl : ajaxDevUrl;
export const canonUrl = process.env.NODE_ENV == 'production' ? prodUrl : devUrl;