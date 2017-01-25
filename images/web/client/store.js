import {observable} from 'mobx';

export default class Store {
  @observable timer = 0;
  @observable things = [];

  constructor() {
    setInterval(() => { this.timer += 1; }, 1000);
    this.fetch();

    this.primus = new Primus(process.env.SERVICEBUS_SERVICE_URL);
    this.primus.on('error', (err) => { console.log('primus error', err); });
    this.primus.on('open', () => { this.primus.write({action: 'subscribe', channel: 'votes'}); });
    this.primus.on('data', (data) => { this.fetch(); });
  }

  resetTimer() { this.timer = 0; }

  async fetch() {
    try {
      let res = await fetch(`${process.env.API_SERVICE_URL}/query/v1/voters`);
      this.things = await res.json();
    } catch (err) { alert(err); }
  }
}
