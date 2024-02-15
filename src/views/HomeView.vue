<template>
  <div>
    <h1>抽獎 Bingo</h1>
    <label for="range">請輸入數字範圍：1 到</label>
    <input type="number" id="range" v-model="maxNumber" />
    <button @click="startDraw" :disabled="isDrawing">開始抽獎</button>

    <div class="drawn-number" v-if="drawnNumber !== null">
      <p class="animated fadeIn">{{ drawnNumber }}</p>
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
import { ref, reactive } from 'vue';

const maxNumber = ref(10);
const isDrawing = ref(false);
const drawnNumber = ref(null);
const drawnNumbers = reactive([]);

const startDraw = () => {
  if (!isDrawing.value) {
    isDrawing.value = true;

    // Generate non-repeating random number for Bingo
    const allNumbers = Array.from({ length: maxNumber.value }, (_, index) => index + 1);
    const shuffledNumbers = allNumbers.sort(() => Math.random() - 0.5);
    const drawInterval = setInterval(() => {
      if (shuffledNumbers.length > 0) {
        drawnNumber.value = shuffledNumbers.pop();
        drawnNumbers.push(drawnNumber.value);
      } else {
        clearInterval(drawInterval);
        isDrawing.value = false;
      }
    }, 1000); // Adjust the interval as needed
  }
};

</script>

<style scoped>
.animated {
  transition: opacity 1s;
}

.fadeIn {
  opacity: 1;
}

.drawn-number {
  font-size: 2em;
  margin: 20px 0;
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
</style>
