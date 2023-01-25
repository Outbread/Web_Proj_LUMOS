import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import{
    callQuestionDetailAPI,
    callQuestionUpdateAPI
} from '../../apis/QuestionAPICalls'

function QuestionDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const questionDetail  = useSelector(state => state.questionReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [modifyMode, setModifyMode] = useState(false);    
    const [form, setForm] = useState({});
 

    useEffect(        
        () => {
            console.log('[QuestionDetail] QuestionCode : ', params.questionCode);

            dispatch(callQuestionDetailAPI({	// 리뷰코드로 리뷰 조회 API 실행
                questionCode: params.questionCode, 
                memberId: token.sub
            }));            
        }
        ,[]
    );

    // console.log(questionDetail.questionCategory);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            questionCode: questionDetail.question.questionCode,
            questionTitle: questionDetail.question.questionTitle,
            questionContent: questionDetail.question.questionContent
        });
    }

    const onClickQuestionUpdateHandler = () => {        

        dispatch(callQuestionUpdateAPI({	// 리뷰 정보 업데이트
            form: form
        }));         

        window.location.reload();
        navigate(``, { replace: true});
    }    


    return (
        <>
            {questionDetail.question &&
            <div>
                <table>
                <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>            
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    name='questionTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.question.questionTitle : form.questionTitle) || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input 
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ token.sub }
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사진</th>
                            <td>
                            <img src={ questionDetail.newName } alt="테스트" />
                            </td>
                        </tr>    
                        <tr>
                            <th>작성일</th>
                            <td>
                                <input 
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ questionDetail.question && questionDetail.question.questionCreateDate || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>문의유형</th>
                            <td>
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } value="배송"/>배송</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } value="교환"/>교환</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="상품" />상품</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="환불" />환불</label>
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="기타" />기타</label>
                            </td>
                        </tr>
                        <tr>
                            <th>문의내용</th>
                            <td colSpan={2}>
                                <textarea
                                    name='questionContent'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.question.questionContent : form.questionContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                    </tbody>                    
                </table>            
            </div>
            }
            { questionDetail.question && 
                <div>
                    <button
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>                   
                            <div>{!modifyMode &&
                                <button       
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    수정모드
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    onClick={ onClickQuestionUpdateHandler }             
                                >
                                    리뷰 수정 저장하기
                                </button>
                            }
                            </div>

                </div>
            }
        </>
    );
}

export default QuestionDetail;