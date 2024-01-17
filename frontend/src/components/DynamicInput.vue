<template>
  <div class="input">
    <label>{{ field.label }}</label>
    <input :type="field.type" :name="field.name" v-model="model" />
  </div>
</template>

<script>
export default {
  props: {
    field: Object, // Objeto representando um campo do formulário
    value: String, // Valor associado ao v-model
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
