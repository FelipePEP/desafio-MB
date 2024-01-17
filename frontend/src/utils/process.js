const processUrl = (endpoint) =>{
  return `http://localhost:3000/api/v1/${endpoint}`
}

const processResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }    
  return await response.text();
}

const processError = (error) =>{
  console.error('Erro na requisição:', error.message);
  throw error;
}
const processRequiredField = () =>{
  alert('O preenchimento de todos os campos é obrigatório')
}
const processSuccessFeedback = () =>{
  alert('Operação realizada coom sucesso')
}

const process = { 
  processUrl, 
  processResponse, 
  processError,
  processRequiredField,
  processSuccessFeedback
}


export default process