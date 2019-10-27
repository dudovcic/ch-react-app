import { inject, observer, Provider } from 'mobx-react';
import Api from '../api';
import { State } from './state';

type ContainerKeyToInject = 'state' | 'api';

export interface ContainerProps {
  state: State;
  api: Api;
}

const container: any = <K extends ContainerKeyToInject>(
  ...providedKeys: K[]
) => (
  // fn - Class or functional component
  fn: (props: Pick<ContainerProps, K>) => React.ComponentType<any> | JSX.Element
): React.ComponentType<{}> =>
  inject(...(providedKeys as string[]))(observer<any>(fn));

export { Provider, container };
