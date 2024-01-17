export class RegistrationController {
  #service;
  constructor(registrationService) {
    this.#service = registrationService
  }

  getHtmlForm(req, res) {  
    let formHTML = ''
    if(req.query?.type === 'pj') {
      formHTML = `<form id="formulario">
        <input type="text" id="Name" name="Razão social" required>
        <input type="text" id="Doc" name="CNPJ" required>
        <input type="date" id="Date" name="Data de abertura" required>        
        <input type="number" id="Phone" name="Telefone" required>
        </form>`;
    }else{
      formHTML = `<form id="formulario">
        <input type="text" id="Name" name="Nome" required>
        <input type="text" id="Doc" name="CPF" required>
        <input type="date" id="Date" name="Data de nascimento" required>        
        <input type="number" id="Phone" name="Telefone" required>
        </form>`;
    }
    res.send(formHTML);
  }  

  postRegistration(req, res){      
    const { body } = req;
    console.log(body)
    res.status(201).json(body);    
  }
}