import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Sample from './pages/Sample';
import MyPageLayout from './layouts/MyPageLayout';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import ProfileUpdate from './pages/member/ProfileUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>   
              {/* <Route path="profileUpdate/:memberCode" element={ <ProfileUpdate /> } /> */}
        </Route>
        <Route path="/sample" element={ <Sample/> } />
        <Route path="profileUpdate/:memberId" element={ <ProfileUpdate/> } >
            <Route index element={ <ProfileUpdate /> } />
            {/* <Route path="ProfileUpdate" element={ <ProfileUpdate /> } /> */}
        </Route>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;