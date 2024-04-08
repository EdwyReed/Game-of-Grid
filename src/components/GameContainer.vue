<template>
  <div class="game">
    <v-row class="text-center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-text-field label="Size X" type="number" v-model="sizeX"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field label="Size Y" type="number" v-model="sizeY"></v-text-field>
      </v-col>
    </v-row>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-card class="pa-4" width="fit-content" mx-auto>
          <div class="grid" :style="{ gridTemplateColumns: `repeat(${sizeX}, 36px)` }">
            <div
              v-for="square in squares"
              :key="square.x + '-' + square.y"
              class="square"
              :style="{ backgroundColor: square.color }"
              @mouseover="toggleSquareColor(square)"
            ></div>
          </div>
        </v-card>
      </v-row>
    </v-container>

  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';

interface Square {
  x: number;
  y: number;
  color: string;
}

const sizeX = ref(0);
const sizeY = ref(0);
const squares = ref<Square[]>([]);

const drawGrid = () => {
  squares.value = [];
  for (let x = 0; x < sizeX.value; x++) {
    for (let y = 0; y < sizeY.value; y++) {
      squares.value.push({ x, y, color: 'white' });
    }
  }
};

watch([sizeX, sizeY], () => {
  drawGrid()
}, { immediate: true });

const toggleSquareColor = (square: Square) => {
  const squareIndex = squares.value.findIndex(s => s.x === square.x && s.y === square.y);
  if (squareIndex !== -1) {
    squares.value[squareIndex].color = squares.value[squareIndex].color === 'white' ? 'blue' : 'white';
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 2px;
}
.square {
  min-width: 36px;
  min-height: 36px;
  transition: background-color 0.3s;
}
</style>
