import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Sample from './pages/Sample';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>   
        </Route>
        <Route path="/sample" element={ <Sample/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;