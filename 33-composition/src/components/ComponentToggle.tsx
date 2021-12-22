import { ComponentType, Fragment, FunctionComponent, ReactElement, useState } from 'react';

interface TriggerComponentProps {
  onClick: () => void;
}

interface ComponentToggleProps {
  closedElement: ReactElement;
  openedElement: ReactElement;
  TriggerComponent: ComponentType<TriggerComponentProps>;
}

const ComponentToggle: FunctionComponent<ComponentToggleProps> = ({ closedElement, openedElement, TriggerComponent }): ReactElement => {
  const [ isToggleOpen, setIsToggleOpen ] = useState(false);

  const onToggleClick = (): void => {
    setIsToggleOpen((currentState): boolean => !currentState);
  };

  const selectedElement = isToggleOpen ? openedElement : closedElement;

  return (
    <Fragment>
      <TriggerComponent onClick={ (): void => onToggleClick() } />
      {selectedElement}
    </Fragment>
  );
};

export {
  ComponentToggle
};
