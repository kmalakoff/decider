import {observable} from 'mobx';

export default class Store {
  @observable timer = 0;
  @observable things = [];

  constructor() {
    setInterval(() => { this.timer += 1; }, 1000);
    this.fetch();
  }

  resetTimer() { this.timer = 0; }

  async fetch() {
    try {
      let res = await fetch(`${process.env.API_URL}/api/things`);
      this.things = await res.json();
    } catch (err) { alert(err); }
  }
}
