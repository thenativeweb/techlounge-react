'use strict';

const domTarget = document.querySelector('#my-react-app');
const myContent = React.createElement('p', { id: 'my-content' }, 'My first React content!');

ReactDOM.render(myContent, domTarget);
