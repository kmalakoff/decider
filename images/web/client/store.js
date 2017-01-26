import {observable} from 'mobx';

export default class Store {
  @observable proposals = [];
  @observable users = [];
  @observable votes = [];

  constructor() {
    this.fetch();

    this.primus = new Primus(process.env.SERVICEBUS_SERVICE_URL);
    this.primus.on('error', (err) => { console.log('primus error', err); });
    this.primus.on('open', () => {
      this.primus.write({action: 'subscribe', channel: 'proposals'});
      this.primus.write({action: 'subscribe', channel: 'users'});
      this.primus.write({action: 'subscribe', channel: 'votes'});
    });
    this.primus.on('data', (data) => { this.fetch(); });
  }

  async fetch() {
    try {
      let res = await fetch(`${process.env.API_SERVICE_URL}/query/v1/proposals`);
      this.proposals = await res.json();
    } catch (err) { alert(err); }

    try {
      let res = await fetch(`${process.env.API_SERVICE_URL}/query/v1/users`);
      this.users = await res.json();
    } catch (err) { alert(err); }

    try {
      let res = await fetch(`${process.env.API_SERVICE_URL}/query/v1/votes`);
      this.votes = await res.json();
    } catch (err) { alert(err); }
  }
}
