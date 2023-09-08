<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

// 定义监听事件
const emit = defineEmits(['change', 'update:modelValue'])
const addValue = () => {
  emit('change', 'add')
}
const subValue = () => {
  emit('change', 'sub')
}
const changeValue = (e) => {
  const num = +e.target.value
  if (!isNaN(num) || num >= 0) {
    emit('update:modelValue', e.target.value)
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
    <input type="text" class="value" :value="modelValue" @input="changeValue" />
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
