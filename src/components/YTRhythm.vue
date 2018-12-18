<template>
  <div class="container">
    <div class="yt-link">Link: <input type="text" :value="videoLink" @change="changeVideoId"/>{{videoLink}}</div>
    <div id="player"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PlayingState } from '@/model/playing-state.payload';
import { VideoState } from '@/model/video-state.payload';

declare var YT: any;
declare global {
  interface Window {
    onYouTubeIframeAPIReady: any;
  }
}

@Component
export default class YTRhythm extends Vue {
  private videoLink: string = 'RQUuqbzQVsY';

  private player: any;

  private changeVideoId(event: any) {
    this.videoLink = event.target.value;
    if (this.player) {
      let playerElement = document.getElementById('player');
      if (playerElement && playerElement.parentElement) {
        const parent = playerElement.parentElement;
        parent.removeChild(playerElement);

        playerElement = document.createElement('div');
        playerElement.setAttribute('id', 'player');
        parent.appendChild(playerElement);

        this.createPlayer();
      }
    }
  }

  private mounted() {
    if (YT) {
      YT.ready(this.createPlayer);
    } else {
      window.onYouTubeIframeAPIReady = this.createPlayer;
    }
  }

  private createPlayer() {
    this.player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: this.videoLink,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  private onPlayerReady(event: any) {
    const playload: VideoState = {
      videoId: event.target.getVideoData().video_id,
      duration: event.target.getDuration(),
    };

    this.$store.commit('playerLoaded', playload);
  }
  private onPlayerStateChange(event: any) {
    const payload: PlayingState = {
      playing: event.data === YT.PlayerState.PLAYING,
      time: event.target.getCurrentTime(),
    };

    this.$store.commit('playingStateChange', payload);
  }
}
</script>

<style scoped lang="scss">
  .yt-link {
    display: flex;
    align-items: center;

    input {
      flex-grow: 1;
      margin: 5px 0 5px 5px;
    }
  }
</style>
