import { FunctionComponent, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavConfiguration {
  title: string;
  link: string;
}

interface NavigationProps {
  navConfiguration: NavConfiguration[];
}
const Navigation: FunctionComponent<NavigationProps> = ({ navConfiguration }): ReactElement => {
  const { pathname } = useLocation();

  const linkItems = navConfiguration.map((navElement): ReactElement => {
    const key = `link-to-${navElement.title}`;
    const content = pathname === navElement.link ?
      (<b>{navElement.title}</b>) :
      (<em>{navElement.title}</em>);

    return (
      <li key={ key }>
        <Link to={ navElement.link }>{ content }</Link>
      </li>
    );
  });

  return (
    <nav>
      <ul>
        { linkItems }
      </ul>
    </nav>
  );
};

export {
  Navigation
};
