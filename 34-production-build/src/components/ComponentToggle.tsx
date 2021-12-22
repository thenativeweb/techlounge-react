import React, { ComponentType, Fragment, FunctionComponent, ReactElement, useState } from 'react';

interface TriggerComponentProps {
  onClick: () => void;
}

interface ContentComponentProps {
  toggle: () => void;
}

type TriggerComponent = ComponentType<TriggerComponentProps>;
type ContentComponent = ComponentType<ContentComponentProps>;

interface ComponentToggleProps {
  closedElement: ReactElement | ContentComponent;
  openedElement: ReactElement | ContentComponent;
  TriggerComponent: TriggerComponent;
}

const ComponentToggle: FunctionComponent<ComponentToggleProps> = ({ closedElement, openedElement, TriggerComponent }): ReactElement => {
  const [ isToggleOpen, setIsToggleOpen ] = useState(false);

  const handleToggle = (): void => {
    setIsToggleOpen((currentState): boolean => !currentState);
  };

  const SelectedElement = isToggleOpen ? openedElement : closedElement;

  let elementToRender;

  if (React.isValidElement(SelectedElement)) {
    elementToRender = SelectedElement;
  } else {
    elementToRender = <SelectedElement toggle={ handleToggle } />;
  }

  return (
    <Fragment>
      <TriggerComponent onClick={ (): void => handleToggle() } />
      {elementToRender}
    </Fragment>
  );
};

export {
  ComponentToggle,
  TriggerComponent,
  ContentComponent
};
