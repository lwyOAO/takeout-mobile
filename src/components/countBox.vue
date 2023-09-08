<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
// 定义监听事件
const addValue = () => {
  emit('update:modelValue', +props.modelValue + 1)
}
const subValue = () => {
  emit('update:modelValue', +props.modelValue - 1)
}
const changeValue = (e) => {
  if (e.target.value === '') {
    e.target.value = 0
  }
  const num = +e.target.value
  if (!isNaN(num) || num >= 0) {
    emit('update:modelValue', +e.target.value)
  } else {
    e.target.value = 0
  }
}
</script>

<template>
  <div class="count-box">
    <button class="minu" @click="subValue" :disabled="modelValue <= 0">
      -
    </button>
    <input class="value" :value="value" @input="changeValue" type="number" />
    <button class="add" @click="addValue">+</button>
  </div>
</template>

<style lang="scss" scoped>
.count-box {
  display: flex;
  .add,
  .minu {
    widows: 40px;
    height: 25px;
    padding: 0 10px;
    margin: 0 5px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .value {
    width: 30px;
    height: 25px;
    outline: none;
    border: none;
    max-width: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
s
