<template>
  <div id="wrapper">
    <div id="step-counter">      
      <p>Etapa <label>{{ currentStep }}</label> de 4</p>
    </div>
    <div id="step-title">
      <h1> {{ currentStepTitle }}</h1>
    </div>   
    <template v-if="currentStep == 1">
      <mb-input
        inputType="text" 
        inputName="userEmail" 
        labelText="Endereço de e-mail" 
        :changeHandler ="changeUser"/>
      <input type="radio" id="pf" name="typeUser" value="pf" v-model="userType" />
      <label for="pf" class="radiolabel">Pessoa física</label>
      <input type="radio" id="pj" name="typeUser" value="pj" v-model="userType" />
      <label for="pj" class="radiolabel">Pessoa jurídica</label>
      <mb-button @click="getFormFields"> Continuar</mb-button>      
    </template>    
    <template v-else-if="currentStep == 2">
      <div>
        <dynamic-form 
          :formFields="formFields" 
          @back="handleBackStepEvent"
          @next="handleNextStepEvent"
          />
      </div>
    </template>
    <template v-else-if="currentStep == 3">
      <div>
        <mb-input
          inputType="password" 
          inputName="userPassword" 
          labelText="Sua senha" 
          :changeHandler ="changeUser"/>
          <div class="dynamic-footer">
            <div>
              <mb-button @click="handleBackStepEvent" :outlined="true" > Voltar</mb-button>      
            </div>
            <div>
              <mb-button @click="handleNextStepEvent"> Continuar</mb-button>              
            </div>          
          </div>
      </div>
    </template>   
    <template v-else-if="currentStep == 4 ">
      <div>
        <div class="input">
          <label>Endereço de email</label>
          <input v-model="userEmail" type="text" />
        </div>
        <div class="input">
          <label>{{ userType==='pf'? 'Nome': 'Razão social'}}</label>
          <input v-model="userName" type="text" />
        </div>
        <div class="input">
          <label>{{ userType==='pf'? 'CPF': 'CNPJ'}}</label>
          <input v-model="userDoc" type="text" />
        </div>
        <div class="input">
          <label>{{ userType==='pf'? 'Data de nascimento': 'Data de abertura'}}</label>
          <input v-model="userDate" type="date" />
        </div>
        <div class="input">
          <label>Telefone</label>
          <input v-model="userPhone" type="number" />
        </div>
        <div class="input">
          <label>Senha</label>
          <input v-model="userPassword" type="text" />
        </div>
        <div class="dynamic-footer">
            <div>
              <mb-button @click="handleBackStepEvent" :outlined="true" > Voltar</mb-button>      
            </div>
            <div>
              <mb-button @click="handleNextStepEvent"> Continuar</mb-button>              
            </div>          
          </div>
          
      </div>
    </template>   
  </div>
</template>

<script>
/* eslint-disable */

import apiFetch from '@/infraestructure/http/apiFetch';
import mbButton from '@/components/mbButton.vue';
import mbInput from '@/components/mbInput.vue';
import utils from '@/utils/process'
import DynamicForm from '@/components/DynamicForm.vue';

export default {
  name: 'registrationPage',
  components:{       
    mbButton, 
    mbInput,
    DynamicForm   
  },
  data: ()=>{
    return{
      currentStep: 1,
      currentStepTitle: 'Seja bem vindo(a)',
      userEmail:'',
      userName:'',
      userType:'pf',
      userDoc:'',
      userDate:'',
      userPhone:'',
      userPassword:'',
      isEnabledNext: false,
      formFields: null,      
    };
  },
  methods: {
    changeUser({field, value}){   
      this[field] = value
    }, 
    handleBackStepEvent(){
      this.currentStep--;
      if(this.currentStep === 1){
        this.formFields = null
        this.currentStepTitle = 'Seja bem vindo(a)'
      }
    },
    handleNextStepEvent(data){            
      if(this.currentStep === 2){
        this.currentStepTitle = "Senha de acesso"
        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            this[`user${prop}`] = data[prop]
          }
        }
      }
      if(this.currentStep === 3){
        this.currentStepTitle = "Revise suas informações"        
      }
      
      if(this.currentStep === 4){
        this.submitRegistration()
      }
      this.currentStep++       
      
    },

    async submitRegistration(){
      const body = {userName: this.userName,
        userDate: this.userDate,
        userDoc: this.userDoc,
        userEmail: this.userEmail,
        userName: this.userName,
        userPassword: this.userPassword,
        userPhone: this.userPhone,
        userType: this.userType       

      }
      await apiFetch.post('registration', body)
        .then(res => {
          this.currentStep = 1;
          this.currentStepTitle = "Seja bem vindo(a)"            
          this.formFields = null
          utils.processSuccessFeedback()
          })
          .catch(error => {
            console.error('Erro ao obter HTML do formulário:', error);
          });
      
    },
    
    async getFormFields() {
      if (!this.userEmail) {
        utils.processRequiredField()
      } else {
        await apiFetch.get('registration', { type: this.userType })
        .then(data => {
          this.currentStep = 2;
          this.currentStepTitle = this.userType === 'pf'? 'Pessoa Física' : 'Pessoa Jurídica';  
          
            this.formFields = this.parseFormFields(data)
          })
          .catch(error => {
            console.error('Erro ao obter HTML do formulário:', error);
          });
      }
    },

    parseFormFields(html){
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const inputElements = doc.querySelectorAll('input');

      const formFields = [];
      inputElements.forEach((input, index) => {
        const id = input.id;
        const type = input.type;
        const name = input.name;
        const label = input.name; // Você pode ajustar isso conforme necessário

        formFields.push({ id, type, name, label });
      });

      return formFields;
    }    
  },
}
</script>

<style lang="scss">
#wrapper {
  width: 250px;
  margin-top:25px
}
#step-title {
  margin-bottom: 35px;
}
#step-counter {
  font-size: 0.8rem;
  & label {
    color:red
  }
}
.radiolabel {
  font-size: 0.8rem;
  margin-right: 15px;
}
#pf {
  margin-bottom: 25px;  
}
.click {
  cursor: pointer;
}
.dynamic-footer {
  & > div{
    float: left;
    width: 47%;
    margin-top: 10px;
    
  }
  & > div:first-child{
    margin-right: 5%;
  }
}
</style>