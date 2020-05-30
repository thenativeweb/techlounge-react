import { Headline } from './core-components/Headline';
import { Paragraph } from './core-components/Paragraph';

export class Message extends React.Component {
  render () {
    const { headline } = this.props;
    const { text } = this.props;

    return (
      <div>
        <Headline content={ headline } />
        <Paragraph text={ text } />
      </div>
    );
  }
}
