import { Outlet } from 'react-router';
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  return (
    <Provider store={store}> <Outlet /> </Provider>
  );
}

export default App;
