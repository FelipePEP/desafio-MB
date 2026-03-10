<template>
  <div class="button-wrapper">
    <div :class="{ 'outlined': outlined}" @click="$emit('click')">
            <slot></slot>    
    </div>   
  </div>
</template>

<script>
export default {  
  props: {
    outlined: {
      type: Boolean,
      default: false, 
    }, 
  },
  data() {
    return {
      inputValue: '',
    };
  },
}
</script>

<style lang="scss">
.button-wrapper {
  & div { 
    background-color: orange;
    color: white;
    width: 100%;
    height: 30px;  
    border-radius: 0.3em;
    border: none;
    cursor: pointer;
    display: block;  
    text-align: center;
    align-items: center;  
    border: 1px solid orange;
  }
  & div.outlined {
    color: orange;
    background-color: transparent ;
  }
}


</style>