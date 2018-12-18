<template>
<div>
  <svg :width="width" :height="height" :viewBox="svgViewBox">
    <rect v-if="$store.state.player.videoLength" id="time" width="1" :height="height" :x="indicatorX"/>
    <circle v-for="point in rhythmPoints" :key="point.key" :class="point.class" :cx="point.x" :cy="point.y" r="4" />
  </svg>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PlayerState } from '@/model/player-state.model';
import { RhythmsState } from '@/model/rhythms-state.model';
import { Rhythm } from '@/model/rhythm.model';

interface RhythmPoint {
  key: string;
  class: string;
  x: number;
  y: number;
}

@Component
export default class RhythmLine extends Vue {
  private width = 640;
  private height = 100;
  private addX = this.width * 1 / 4;

  private currentTime = 0;
  private lineTime = 10;

  private intervalRef = 0;

  get playerState(): PlayerState {
    return this.$store.state.player;
  }
  get playingTime(): number {
    const timePassed = this.playerState.playing ? (this.currentTime - this.playerState.lastRealTime) / 1000 : 0;
    return this.playerState.lastPlayerTime + timePassed;
  }
  get transformX(): number {
    return this.playingTime / this.lineTime * this.width;
  }
  get svgViewBox(): string {
    return `${this.transformX} 0 ${this.width} ${this.height}`;
  }
  get indicatorX(): number {
    return this.transformX + this.addX;
  }

  get rhythms(): Rhythm[] {
    return this.$store.state.rhythms;
  }
  get rhythmPoints(): RhythmPoint[] {
    return this.rhythms.flatMap((rhythm, lineIndex) => rhythm.map((point, pointIndex) => { return {
      key: lineIndex + ' ' + pointIndex,
      class: 'point' + lineIndex,
      x: point / this.lineTime * this.width + this.addX,
      y: 5 + lineIndex * 10,
    }; }));
  }

  private mounted() {
    this.intervalRef = setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 50);
  }
  private destroyed() {
    clearInterval(this.intervalRef);
  }
}
</script>

<style scoped lang="scss">
  svg {
    outline: 1px solid blue;
  }

  #time {
    stroke-width: 1;
    stroke: #aaaaaa;
  }

  circle {
    stroke-width: 1;
    stroke: black;
  }

  .point0 {
    fill: white;
  }
  .point1 {
    fill: green;
  }
  .point2 {
    fill: yellow;
  }
  .point3 {
    fill: blue;
  }
  .point4 {
    fill: orange;
  }
  .point5 {
    fill: purple;
  }
  .point6 {
    fill: lightblue;
  }
  .point7 {
    fill: red;
  }
  .point8 {
    fill: lime;
  }
  .point9 {
    fill: pink;
  }
  
</style>
