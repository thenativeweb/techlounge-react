import { Fragment, FunctionComponent, ReactElement } from 'react';

interface PageProps {
  title: string;
}
const Page: FunctionComponent<PageProps> = ({ title, children }): ReactElement => (
  <Fragment>
    <h1>{ title }</h1>
    {children}
  </Fragment>
);

export {
  Page
};
