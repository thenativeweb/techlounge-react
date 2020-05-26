import { Headline } from "./core-components/headline.js";
import { Paragraph } from "./core-components/paragraph.js";

export class Message extends React.Component {
  render() {
    const headline = this.props.headline;
    const text = this.props.text;
    return (
      <div>
        <Headline content={headline} />
        <Paragraph text={text} />
      </div>
    );
  }
}
