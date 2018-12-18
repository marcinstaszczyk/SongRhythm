<template>
  <div class="container">
    Linia:
    <select v-model.number="lineIndex">
      <option v-for="index in lineIndexes" :key="index" :value="index">{{index + 1}}</option>
    </select>
    <button class="clear" @click="clear">Wyczyść linię</button>
    <button class="add" @click="add">Krok</button>
    

    Krok:
    <select v-model.number="pointIndex">
      <option v-for="(time, index) in pointsTimes" :key="index" :value="index">{{time}}</option>
    </select>
    <button class="remove" @click="remove">Usuń</button>
    <br/>

    <Modal :visible="false" :showClose="true">
      Test
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RhythmsState } from '@/model/rhythms-state.model';
import { Rhythm } from '@/model/rhythm.model';

@Component
export default class RhythmControls extends Vue {
  private lineIndex: number = 0;
  private pointIndex: number = 0;

  get rhythms(): Rhythm[] {
    return this.$store.state.rhythms;
  }
  get lineIndexes(): number[] {
    return [0, ...this.rhythms.map((line, index) => index + 1)];
  }
  get points(): number[] {
    return this.rhythms[this.lineIndex] || [];
  }
  get pointsTimes(): string[] {
    return this.points.map((point) => {
      const seconds = Math.round((point % 60) * 10) / 10;
      const minutes = Math.floor(point / 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
  }

  private add() {
    this.$store.commit('addPoint', this.lineIndex);
  }
  private remove() {
    this.$dialogConfirm('Czy na pewno chcesz usunąc punkt?').then(() => {
      this.$store.commit('removePoint', [this.lineIndex, this.pointIndex]);
    });
  }
  private clear() {
    this.$dialogConfirm('Czy na pewno chcesz wyczyścić linię?').then(() => {
      this.$store.commit('clearLine', this.lineIndex);
    });
  }
}
</script>

<style scoped lang="scss">
  .add {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
  }
</style>
