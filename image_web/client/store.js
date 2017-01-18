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
      let res1 = await fetch(`${process.env.READ_API_URL}/api/things`);
      let things1 = await res1.json(); 
      let res2 = await fetch(`${process.env.COMMAND_API_URL}/api/things`);
      let things2 = await res2.json(); 
      this.things = things1.concat(things2); 
    } catch (err) { alert(err); }
  }
}
