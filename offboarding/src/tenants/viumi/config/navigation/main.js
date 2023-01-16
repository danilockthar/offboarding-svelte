import * as React from 'react';
import Start from '../../components/Start';
import Success from '../../components/Success';
import MoneyAvailable from '../../components/MoneyAvailable';
import ServiceUnavailable from '../../components/ServiceUnavailable';

const main = {
  
  home: {
    component: Start,
  },
  Success: {
    component: Success,
  },
  MoneyAvailable: {
    component: MoneyAvailable,
  },
  ServiceUnavailable: {
    component: ServiceUnavailable,
  },
};

console.log('main component', main)

export default main;
