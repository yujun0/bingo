<template>
  <div class="home-container">
    <div class="glass-panel main-panel">
      <div class="header">
        <h1 class="title">BINGO</h1>
        <div class="controls-container">
          <div class="input-group">
            <label for="range">Max Number</label>
            <InputNumber
              id="range"
              v-model="maxNumber"
              inputId="integeronly"
              :min="1"
              :max="1000"
              class="custom-input"
            />
          </div>
        </div>
      </div>

      <div class="display-area">
        <transition name="pop" mode="out-in">
          <div :key="displayNumber" class="current-number">
            {{ displayNumber }}
          </div>
        </transition>
        <p v-if="!moreNumbersLeft" class="status-text">All numbers drawn!</p>
      </div>

      <div class="actions">
        <Button
          class="p-button-lg action-btn draw-btn"
          label="DRAW"
          @click="drawNextNumber"
          :disabled="isDrawing || !moreNumbersLeft"
        />
        <Button
          class="p-button-lg action-btn reset-btn"
          label="RESET"
          icon="pi pi-replay"
          @click="reset"
          :disabled="isDrawing"
        />
      </div>
    </div>

    <div class="glass-panel history-panel" v-if="drawnNumbers.length > 0">
      <h2>History</h2>
      <div class="history-grid">
        <transition-group name="list">
          <span v-for="number in drawnNumbers" :key="number" class="history-chip">
            {{ number }}
          </span>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const maxNumber = ref(75); // Standard Bingo max
const isDrawing = ref(false);
const drawnNumber = ref(null);
const drawnNumbers = reactive([]);
const moreNumbersLeft = ref(true);

const displayNumber = computed(() => {
  return drawnNumber.value !== null ? drawnNumber.value : "?";
});

const drawNextNumber = async () => {
  if (!isDrawing.value && moreNumbersLeft.value) {
    isDrawing.value = true;

    // Simulate shuffling animation
    let shuffleCount = 0;
    const maxShuffle = 10;
    const shuffleInterval = setInterval(() => {
      drawnNumber.value = Math.floor(Math.random() * maxNumber.value) + 1;
      shuffleCount++;
      if (shuffleCount >= maxShuffle) {
        clearInterval(shuffleInterval);
        finalizeDraw();
      }
    }, 50);
  }
};

const finalizeDraw = () => {
  const allNumbers = Array.from({ length: maxNumber.value }, (_, i) => i + 1);
  const remainingNumbers = allNumbers.filter((n) => !drawnNumbers.includes(n));

  if (remainingNumbers.length > 0) {
    const nextNumber =
      remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
    drawnNumber.value = nextNumber;
    drawnNumbers.unshift(nextNumber); // Add to start for history

    if (remainingNumbers.length === 1) {
      moreNumbersLeft.value = false;
    }
  } else {
    moreNumbersLeft.value = false;
  }
  isDrawing.value = false;
};

const reset = () => {
  isDrawing.value = false;
  drawnNumber.value = null;
  drawnNumbers.splice(0, drawnNumbers.length); // Clear array
  moreNumbersLeft.value = true;
};
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  gap: 2rem;
  height: 80vh;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    align-items: center;
  }
}

.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.main-panel {
  flex: 2;
  justify-content: space-between;
  min-width: 350px;
  max-width: 500px;
}

.history-panel {
  flex: 1;
  min-width: 300px;
  overflow-y: auto;
  align-items: flex-start;

  h2 {
    align-self: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

.header {
  text-align: center;
  width: 100%;
}

.title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: 5px;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

.display-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.current-number {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.status-text {
  color: #ffcccc;
  margin-top: 1rem;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.action-btn {
  flex: 1;
  border-radius: 12px;
  font-weight: 700 !important;
  border: none !important;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
}

.draw-btn {
  background: linear-gradient(45deg, #ff6b6b, #feca57) !important;
  color: white !important;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.history-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.history-chip {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Animations */
.pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Deep Selectors for PrimeVue Component Customization */
:deep(.custom-input) {
  .p-inputtext {
    text-align: center;
    padding: 0.75rem;
    border-radius: 10px;
    font-size: 1.2rem;
    width: 15rem; /* Give it a fixed comfortable width */
    max-width: 100%;
  }
}

:deep(.action-btn) {
  display: flex !important;
  justify-content: center;
  align-items: center;
  
  .p-button-icon {
    margin-right: 0.5rem; /* Ensure space between icon and text */
    font-size: 1.2rem;
  }
  
  .p-button-label {
    flex: 0 0 auto;
    margin: 0 !important; /* Reset any default margins */
  }
}
</style>
