import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Sample from './pages/Sample';
import MyPageLayout from './layouts/MyPageLayout';
import Profile from './pages/member/Profile';
import QuestionRegistration from './pages/member/QuestionRegistration';
import QuestionManagement from './pages/admin/QuestionManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={<Main />} />   
          <Route path="mypage" element={ <MyPageLayout/> } >
            <Route index element={<QuestionRegistration />} />
            <Route path="questionregistration" element={ <QuestionRegistration /> } />
            <Route path="question" element={<QuestionManagement />} />
          </Route>
        </Route>
        <Route path="/sample" element={ <Sample/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;