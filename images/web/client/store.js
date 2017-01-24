import {observable} from 'mobx';

export default class Store {
  @observable timer = 0;
  @observable things = [];

  constructor() {
    setInterval(() => { this.timer += 1; }, 1000);
    this.fetch();

    this.socket = io(process.env.SERVICEBUS_URL);
    this.socket.on('error', function (err) { console.log('socket error', err); });
    this.socket.on('connect', function () { console.log('socket connected'); });
    this.socket.on('change', function (data) { console.log('change', data); });
  }

  resetTimer() { this.timer = 0; }

  async fetch() {
    try {
      let res = await fetch(`${process.env.API_URL}/query/v1/voters`);
      this.things = await res.json();
    } catch (err) { alert(err); }
  }
}
