import { inject, observer, Provider } from 'mobx-react';
import Api from '../api';
import { State } from './state';

type ContainerKeyToInject = 'state' | 'api';

export interface ContainerProps {
  state: State;
  api: Api;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type CProps<P> = Omit<P, ContainerKeyToInject>;

const container = <K extends ContainerKeyToInject>(...providedKeys: K[]) => (
  // fn - Class or functional component
  fn: React.ComponentType<Pick<ContainerProps, K>>
): React.ComponentType<CProps<K>> => inject(...providedKeys)(observer<any>(fn));

export { Provider, container };

export function containerDecorator<K extends ContainerKeyToInject>(
  ...providedKeys: K[]
) {
  return (target: React.ComponentType<Pick<ContainerProps, K>>) => {
    return inject(...providedKeys)(observer<any>(target));
  };
}
