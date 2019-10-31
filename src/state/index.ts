import { inject, observer, Provider } from 'mobx-react';
import Api from '../api';
import { State } from './state';

type ContainerKeyToInject = 'state' | 'api';

export interface ContainerProps {
  state: State;
  api: Api;
}

function container<K extends ContainerKeyToInject>(...providedKeys: K[]) {
  return (target: React.ComponentType<Pick<ContainerProps, K>>) => {
    return inject(...providedKeys)(observer<any>(target));
  };
}

export { Provider, container };
