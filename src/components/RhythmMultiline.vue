<template>
<div>
  {{playingTime}}
  <svg :width="svgWidth" :height="svgHeight">
    <rect v-if="$store.state.player.videoLength" id="time" width="1" height="20" :x="indicatorX" :y="indicatorY"/>
  </svg>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PlayerState } from '@/model/player-state.model';

@Component
export default class RhythmMultiline extends Vue {
  private currentTime = 0;
  private intervalRef = 0;
  private lineTime = 20;
  private width = 640;
  private height = 20;

  get playerState(): PlayerState {
    return this.$store.state.player;
  }
  get playingTime(): number {
    const timePassed = this.playerState.playing ? (this.currentTime - this.playerState.lastRealTime) / 1000 : 0;
    return this.playerState.lastPlayerTime + timePassed;
  }
  get indicatorX(): number {
    return (this.playingTime % this.lineTime) * this.width / this.lineTime;
  }
  get indicatorY(): number {
    return Math.floor(this.playingTime / this.lineTime) * this.height;
  }
  get svgWidth(): number {
    return this.width;
  }
  get svgHeight(): number {
    return Math.ceil(this.playerState.videoDuration / this.lineTime) * this.height;
  }

  private mounted() {
    this.intervalRef = setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 100);
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
</style>
