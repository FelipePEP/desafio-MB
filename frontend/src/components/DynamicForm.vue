<template>
  <form>
    <dynamic-input v-for="field in formFields" 
      :key="field.id" 
      :field="field" 
      v-model="formData[field.id]" 
      :value="field.value" />
    <div class="dynamic-footer">
      <div>
        <mb-button @click="emitBackEvent" :outlined="true" > Voltar</mb-button>      
      </div>
      <div>
        <mb-button @click="emitNextEvent"> Continuar</mb-button>
        
      </div>
    </div>
  </form>
</template>

<script>
import DynamicInput from '@/components/DynamicInput.vue';
import mbButton from '@/components/mbButton.vue';
import utils from '@/utils/process'

export default {
  props: {
    formFields: Array, 
  },
  data() {
    return {
      formData: {},
    };
  },
  components: {
    DynamicInput,
    mbButton
  },
  methods: {
    emitBackEvent(){      
      this.$emit('back')
    },
    emitNextEvent(){
      let contador = 0;
      for (const key in this.formData) {
        if (this.formData[key] !== null && this.formData[key] !== undefined && this.formData[key] !== "") {
          contador++;
        }
      }

      if(contador === this.formFields.length){
        this.$emit('next', this.formData)
      }else{
        utils.processRequiredField()
      }
    },
  },
};
</script>
<style lang="scss">
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