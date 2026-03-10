<template>
  <div class="input">
    <label>{{ labelText }}</label>
    <input v-model="inputValue" :type="inputType" @input="handleInput" />
  </div>
</template>

<script>
export default {
  props: {
    labelText: String,
    inputType: String,
    inputName: String,
    changeHandler: Function,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    handleInput() {
      this.changeHandler({
        field: this.inputName,
        value: this.inputValue,
      });
    },
  },
};
</script>

<style lang="scss">
.input {
  margin-bottom: 10px;
  & label {
    font-size: 0.8rem;
    display: block;
    margin-bottom: 5px;
    text-transform: capitalize;
  }
  & input {
    border: 1px solid black;
    border-radius: 0.3em;
    height: 25px;
    width: 100%;
  }
}
</style>
