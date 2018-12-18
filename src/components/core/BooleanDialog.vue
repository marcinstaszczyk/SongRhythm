<template>
  <Modal :visible="show" @hide="hide" :showClose="true">
    <div class="message">{{message}}</div>
    <div class="commands">
      <button @click="answer(false)">{{noText || 'Nie'}}</button>
      <button @click="answer(true)">{{noText || 'Tak'}}</button>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
  .commands {
    display: flex;
    justify-content: center;
  }

  button {
    margin: 30px 30px 0;
    padding: 5px 20px;
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class BooleanDialog extends Vue {
  private message: string = '';
  private yesText: string = '';
  private noText: string = '';

  private show: boolean = false;

  private resolve: ((answer: boolean) => any) | undefined;

  public ask(message: string, yesText = '', noText = ''): Promise<boolean> {
    this.message = message;
    this.yesText = yesText;
    this.noText = noText;
    this.show = true;

    if (this.resolve) {
      throw new Error('Previous dialog was not closed correctly');
    }

    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  public confirm(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.ask(message).then((answer) => {
        if (answer) {
          resolve();
        }
      });
    });
  }

  private answer(answer: boolean) {
    this.show = false;
    if (this.resolve) {
      this.resolve(answer);
    }
    this.resolve = undefined;
  }

  private hide() {
    this.resolve = undefined;
    this.show = false;
  }

}
</script>

