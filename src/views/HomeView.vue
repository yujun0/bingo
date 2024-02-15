<template>
  <div>
    <h1>Bingo</h1>
    <label for="range">請輸入數字範圍：1 到</label>
    <InputNumber id="range" v-model="maxNumber" inputId="integeronly" />
    <br />
    <br />
    <Button
      class="p-button-sm"
      label="開始抽獎"
      @click="drawNextNumber"
      :disabled="isDrawing || !moreNumbersLeft"
    />
    <Button
      label="重置"
      icon="pi pi-replay"
      @click="reset"
      class="p-button-sm"
      :disabled="isDrawing"
      severity="danger"
    />

    <div v-if="drawnNumber !== null">
      <p
        class="animated"
        :class="{ fadeIn: showNumber }"
        style="font-weight: bold"
      >
        {{ drawnNumber }}
      </p>
      <p v-if="!moreNumbersLeft" class="last-number">這是最後一個數字！</p>
    </div>

    <div class="drawn-numbers" v-if="drawnNumbers.length > 0">
      <h2>已經抽出的數字</h2>
      <ul>
        <li v-for="number in drawnNumbers" :key="number">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const maxNumber = ref(10);
const isDrawing = ref(false);
const drawnNumber = ref(null);
const drawnNumbers = reactive([]);
const showNumber = ref(false);
const moreNumbersLeft = ref(true);

const drawNextNumber = async () => {
  if (!isDrawing.value && moreNumbersLeft.value) {
    isDrawing.value = true;

    const allNumbers = Array.from(
      { length: maxNumber.value },
      // 使用底線 _ 來表示不使用的參數
      (_, index) => index + 1
    );
    const shuffledNumbers = allNumbers.sort(() => Math.random() - 0.5);

    while (shuffledNumbers.length > 0) {
      const nextNumber = shuffledNumbers.pop();

      // Check if the number has been drawn before
      if (!drawnNumbers.includes(nextNumber)) {
        drawnNumber.value = nextNumber;
        drawnNumbers.push(nextNumber);
        showNumber.value = true;

        // Delay for the animation
        // await new Promise(resolve => setTimeout(resolve, 1000));

        showNumber.value = false;

        // Shuffle the remaining numbers
        shuffledNumbers.sort(() => Math.random() - 0.5);
        break; // Exit the loop if a non-drawn number is found
      }
    }

    // Check if more numbers are left to draw
    if (shuffledNumbers.length === 0) {
      moreNumbersLeft.value = false;
    }

    isDrawing.value = false;
  }
};

const reset = () => {
  maxNumber.value = 10;
  isDrawing.value = false;
  drawnNumber.value = null;
  drawnNumbers.length = 0;
  showNumber.value = false;
  moreNumbersLeft.value = true;
};
</script>

<style scoped>
.animated {
  transition: opacity 1s;
}

.fadeIn {
  opacity: 1;
}

.drawn-numbers {
  margin-top: 20px;
}

.drawn-numbers ul {
  list-style: none;
  padding: 0;
}

.drawn-numbers li {
  display: inline-block;
  font-size: 1.2em;
  margin: 0 5px;
}

.last-number {
  font-weight: bold;
  color: red;
}
</style>
