const domTarget = document.querySelector('#my-react-app');
const myContent = React.createElement('p', { id: 'my-content' }, 'My first React Content!');
ReactDOM.render(myContent, domTarget);