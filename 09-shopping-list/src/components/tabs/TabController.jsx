import React from 'react';

export class TabController extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visibleTab: 0
    };
  }

  switchTab (newId) {
    this.setState({
      visibleTab: newId
    });
  }

  render () {
    const tabSelection = this.props.children.map((childElement, index) => {
      const key = `tab-${index}`;
      const content = index === this.state.visibleTab ?
        (<b>{childElement.props.headline}</b>) :
        (<em>{childElement.props.headline}</em>);

      return (
        <li key={ key }>
          <a href='#' onClick={ () => this.switchTab(index) }>{content}</a>
        </li>
      );
    });

    return (
      <React.Fragment>
        <nav className='tabHeader'>
          <ul>
            {tabSelection}
          </ul>
        </nav>
        <article>
          {this.props.children[this.state.visibleTab]}
        </article>
      </React.Fragment>
    );
  }
}
