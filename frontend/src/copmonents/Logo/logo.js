import logo from '../../source/messenger.png';

function App({width="auto", height="auto"}) {
  return (
    <img 
      src={logo} 
      style={{width: width, height: height}} 
      alt="logo" 
    />
  );
}

export default App;
