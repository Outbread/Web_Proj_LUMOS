import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';

import {
    callAdminQuestionListAPI
} from '../../apis/QuestionAPICalls'

function AdminQuestionList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const question = useSelector(state => state.questionReducer);  
    const questionList = question.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = question.pageInfo;

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {    
            if(token !== null) {
                dispatch(callAdminQuestionListAPI({	
                    currentPage: currentPage
                }));            
            }
        }
        ,[currentPage]
    );

    // const onClickTableTr = (questionCode) => {
    //     navigate(`/mypage/question/detail/${questionCode}`, { replace: false });
    // }

    const onClickAnswer = (questionCode) => {
        navigate(`/questionAnswer/${questionCode}`, { replace: false });
    }


    console.log(currentPage);
    return (
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="20%" />
                        <col width="30%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>문의 번호</th>
                            <th>작성자</th>
                            <th>문의 유형</th>
                            <th>문의 일시</th>
                            <th>문의 제목</th>
                            <th>답변 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(questionList) && questionList.map(
                            (question, index) => (
                                <tr
                                    key={question.questionCode}
                                    // onClick={ () => onClickTableTr(question.questionCode) }
                                >
                                    <td>{(currentPage - 1) * 10 +  (index + 1)}</td>
                                    {/* <td>{ question.questionCode }</td> */}
                                    <td>{ question.member.memberId }</td>
                                    <td>{ question.questionCategory }</td>
                                    <td>{ question.questionCreateDate }</td>                                
                                    <td>{ question.questionTitle }</td>
                                    <td>{ question.questionStatus }</td>
                                    <td>
                                        <button
                                            onClick={() => onClickAnswer(question.questionCode)}
                                        >
                                            답변하기
                                            </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>                    
                </table>            
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(questionList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(questionList) &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default AdminQuestionList;