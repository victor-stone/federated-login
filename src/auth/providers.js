
import * as authorizers from './authorizers';

class IDAuthorizationProviders {

  constructor() {
    this.__providers = Object
                        .keys(authorizers)
                        .filter( key => key !== 'default' )
                        .map( key => authorizers[key] );
  }

  add(provider) {
    this.__providers.push(provider);
  }

  find(name) {
    return this.__providers.find( p => p.name === name );
  }
  
  [Symbol.iterator]() {

    const p = [...this.__providers];
    return {
      current: 0,
      last: p.length - 1,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: p[this.current++] };
        } else {
          return { done: true };
        }
      }
    };
  }
}


const providers = new IDAuthorizationProviders();

module.exports = providers;