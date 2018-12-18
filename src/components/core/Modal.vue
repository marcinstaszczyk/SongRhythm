<template>
  <div :class="['modal-bg', {visible: isVisible}]" @click="hide"><div>
    <div v-if="showClose" class="close" @click="hide"/>
    <div :class="['content', {'no-padding': noPadding}]" @click.stop>
      <slot/>
    </div>
  </div></div>
</template>

<style scoped lang="scss">
  .modal-bg {
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;

    display: none;
    &.visible {
      display: flex;
    }
    flex-flow: column;
    justify-content: center;
    align-items: center;

    padding: 5%;

    > div {
      position: relative;
    }
  }

  .content {
    background-color: white;
    border: 1px solid darkgray;
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
    max-height: 95vh;

    position: relative;
    overflow-y: auto;

    padding: 30px;
    &.no-padding {
      padding: 0;
    }
  }

  @import '../../assets/scss/utilities';

  .close {
    position: absolute;
    top: -23px;
    right: 0;
    padding: 0 2px;
    background-color: white;
    border: 1px solid darkgray;
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
    cursor: pointer;

    @include fa("\f00d");
    font-size: 20px;
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({type: Boolean, default: false})
  private visible!: boolean;
  private ownVisible: boolean = false;
  @Prop({type: Boolean, default: false})
  private showClose!: boolean;
  @Prop({type: Boolean, default: false})
  private noPadding!: boolean;

  get isVisible() {
    return this.visible || this.ownVisible;
  }

  public hide() {
    this.ownVisible = false;
    this.$emit('hide');
  }
  public show() {
    this.ownVisible = true;
  }

}
</script>

