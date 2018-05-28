import React from 'react';
import {render} from 'enzyme';
import {renderToJson} from 'enzyme-to-json';
import OfferCreate from '../OfferCreate';

const offer = {
  author: 'author',
  expert: 'expert',
  remaining: '100',
  closed: false,
  messages: [
    {
      type: 'payment',
      amount: '.5'
    },
    {
      type: 'payment',
      amount: '.0625'
    },
  ]
};

const walletList = [
  {address:'author', nct: '1', eth: '1'},
  {address:'demo', nct: '1', eth: '1'},
  {address:'omed', nct: '1', eth: '1'}
];

it('renders without crashing', () => {
  const wrapper = render(<OfferCreate
    offer={offer}
    walletList={walletList}/>);
  expect(renderToJson(wrapper)).toMatchSnapshot();
});