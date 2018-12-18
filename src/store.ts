import { RhythmsState, defaultRhythms } from './model/rhythms-state.model';
import { PlayerState } from './model/player-state.model';
import { PlayingState } from './model/playing-state.payload';
import Vue from 'vue';
import Vuex from 'vuex';
import { VideoState } from './model/video-state.payload';

Vue.use(Vuex);

const playerState = new PlayerState();
const rhythmsState: RhythmsState = defaultRhythms;

export default new Vuex.Store({
  state: {
    player: playerState,
    rhythms: rhythmsState,
  },
  mutations: {
    playingStateChange(state, payload: PlayingState) {
      state.player.lastRealTime = new Date().getTime();
      state.player.playing = payload.playing;
      state.player.lastPlayerTime = payload.time;
    },
    playerLoaded(state, videoState: VideoState) {
      state.player.videoId = videoState.videoId;
      state.player.videoDuration = videoState.duration;

      const rhythmsString = window.localStorage.getItem(videoState.videoId);
      if (rhythmsString) {
        state.rhythms = JSON.parse(rhythmsString);
      } else {
        state.rhythms = defaultRhythms;
      }
    },

    addPoint(state, lineIndex: number) {
      const timePassed = state.player.playing ? (new Date().getTime() - state.player.lastRealTime) / 1000 : 0;
      let time = state.player.lastPlayerTime + timePassed;
      time = Math.round(time * 1000) / 1000;

      let line = state.rhythms[lineIndex];
      if (!line) {
        line = [];
        state.rhythms.splice(lineIndex, 1, line);
      }
      line.splice(line.length, 1, time);

      // TODO to it more proper way. No side effects in mutations
      setTimeout(() => {
        window.localStorage.setItem(state.player.videoId, JSON.stringify(state.rhythms));
      }, 0);
    },
    removePoint(state, [lineIndex, pointIndex]: [number, number]) {
      const line = state.rhythms[lineIndex];
      if (line) {
        line.splice(lineIndex, 1);
        // TODO to it more proper way. No side effects in mutations
        window.localStorage.setItem(state.player.videoId, JSON.stringify(state.rhythms));
      }
    },
    clearLine(state, lineIndex: number) {
      state.rhythms.splice(lineIndex, 1, []);

      // TODO to it more proper way. No side effects in mutations
      window.localStorage.setItem(state.player.videoId, JSON.stringify(state.rhythms));
    },
  },
  actions: {
  },
});
