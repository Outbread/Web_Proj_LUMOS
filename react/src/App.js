import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Sample from './pages/Sample';
import MyPageLayout from './layouts/MyPageLayout';                          // 마이페이지
import Profile from './pages/member/Profile';                               // 회원 개인정보 조회
import QuestionRegistration from './pages/member/QuestionRegistration';     // 문의사항 등록
import QuestionList from './pages/member/QuestionList';                     // 회원별 문의사항
import QuestionDetail from './pages/member/QuestionDetail';                 // 문의사항 상세 조회
import Login from './pages/member/Login';                                   // 로그인
import Register from './pages/member/Register';                             // 회원가입
import ProfileUpdate from './pages/member/ProfileUpdate';
import OrderDashBoard from './pages/order/OrderDashBoard';                  // 주문대시보드
import OrderManagement from './pages/order/OrderManagement';                // 주문목록
import OrderDetail from './pages/order/OrderDetail';                        // 주문내역상세

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main/> }/>   
            <Route path="mypage" element={ <MyPageLayout/> } >
                <Route index element={ <ProfileUpdate /> } />
                <Route path="profileUpdate" element={ <ProfileUpdate /> } />
                <Route path="questionregistration" element={ <QuestionRegistration /> } />
                <Route path="question" element={<QuestionList />} />
            <Route path="question/detail/:questionCode" element={<QuestionDetail />} />
            </Route>
            <Route path="order-dashboard" element={<OrderDashBoard/>}/>
            <Route path="order-management" element={<OrderManagement/>}/>
            <Route path="order-management/:orderCode" element={<OrderDetail/>}/>
            <Route path="/login" element={ <Login/> } />
            <Route path="/register" element={ <Register/> } />  
        </Route>
        <Route path="/sample" element={ <Sample/> } />
        {/* <Route path="profileUpdate/:memberId" element={ <ProfileUpdate/> } >
            <Route index element={ <ProfileUpdate /> } /> */}
            {/* <Route path="ProfileUpdate" element={ <ProfileUpdate /> } /> */}
        {/* </Route> */}
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;