const domTarget = document.querySelector('#my-react-app');
const myContent = React.createElement('p', { id: 'my-content' }, 'My first React Content!')
const myJSXContent = <p id='my-content'>My second React-Content!</p>
ReactDOM.render(myJSXContent, domTarget);