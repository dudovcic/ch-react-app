import { State } from '../state/state';
import Api from '../api/index';
import { TOKEN1, director1, companyNum1 } from './mock';

const state = new State();
const api = new Api(state);

beforeEach(() => {
  api.setToken(TOKEN1);
});

it('sets token', () => {
  expect(state.token).toEqual(TOKEN1);
});

it('set and get directors', () => {
  state.setDirectors(companyNum1, [director1]);
  const directors = state.getDirectors(companyNum1);
  expect(director1).toEqual(directors![0]);
});
