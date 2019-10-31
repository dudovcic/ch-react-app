import React from 'react';
import { State } from '../state/state';
import Api from '../api/index';
import { company1 } from './mock';
import { shallow } from 'enzyme';
import { Companies } from '../containers/Companies';
import Company from '../components/Company';
require('./setup');

const state = new State();
const api = new Api(state);

beforeEach(() => {
  state.setCompanies(company1);
});

it('renders correct number of companies', () => {
  const companies = shallow(
    <Companies api={api} state={state} companies={state.companies} />
  );
  const renderedCompanies = companies.getElements();
  expect(renderedCompanies.length).toEqual(company1.length);
});
