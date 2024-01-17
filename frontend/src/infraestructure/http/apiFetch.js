import utils from '@/utils/process'

const get = async (endpoint, params, config)=> {
    const queryString = new URLSearchParams(params).toString();
    const url = utils.processUrl(endpoint)
    const fullUrl = queryString ? `${url}?${queryString}` : url;  
    return await execRequest(fullUrl, 'GET', config )    
}

const post = async (endpoint, data, config)=> {
  const url = utils.processUrl(endpoint)
  return await execRequest(url, 'POST', config, data)      
}

const execRequest = async ( url, method, config, body)=>{
  try {    
    console.log(body);
    console.log(JSON.stringify(body));
    const response = await fetch(url, {
      method,      
      headers: {
        'Content-Type': 'application/json',
        ...(config?.headers || {})
      },
      body: body? JSON.stringify(body) : null,
      mode: 'cors',
      ...(config || {})
    });        
    return await utils.processResponse(response)    
  } catch (error) {
    utils.processError(error);
  }
}



const apiFetch = {
  get, post
}

export default apiFetch
