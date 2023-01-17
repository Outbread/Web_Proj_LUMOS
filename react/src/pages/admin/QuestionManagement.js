import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";

import {
    callQuestionListAdminAPI
} from '../../apis/QuestionAPICalls';

function QuestionManagement() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questions  = useSelector(state => state.questionReducer);      
    const questionList = questions.data;
    console.log('questionManagement', questionList);

    const pageInfo = questions.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);            
            dispatch(callQuestionListAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickQuestionUpdate = () => {
        console.log('[QuestionManagement] onClickQuestionUpdate');
        navigate("/questionregistration", { replace: false })
    }

    const onClickTableTr = (questionCode) => {
        navigate(`/questionupdate/${questionCode}`, { replace: false });
    }

    return (
        <>
        <div>
            <div>
                <button
                    onClick={ onClickQuestionUpdate }
                >
                    답변 등록
                </button>
            </div>            
            <table>
                <colgroup>
                    <col width="5%" />
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>문의 번호</th>
                        <th>문의 유형</th>
                        <th>문의 제목</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(questionList) && questionList.map((q) => (
                        <tr
                            key={ q.questionCode }
                            onClick={ () => onClickTableTr(q.questionCode) }
                        >
                            <td>{q.questionCode}</td>
                            <td>{q.questionCategory}</td>
                            <td>{ q.questionTitle }</td>
                        </tr>
                    )) 
                    }
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
export default QuestionManagement;