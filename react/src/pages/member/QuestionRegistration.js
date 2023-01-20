import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callQuestionRegistAPI
} from '../../apis/QuestionAPICalls';

function QuestionRegistration() {


    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [form, setForm] = useState({
        questionTitle : '',
        questionCategory : '',
        questionContent: '',
        memberCode: '',
        questionStatus: '미해결',
        memberId: token.sub
        // questionImgCode : '',
        // originalName : '',
        // newName: ''
    });

    useEffect(() => {

        /* 이미지 업로드시 미리보기 세팅 */
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);


    // useEffect(
    //     () => {    
    //         if(token !== null) {
    //             dispatch(callQuestionRegistAPI({	
    //                 memberId: token.sub
    //             }));            
    //         }
    //     }
    //     ,[]
    // );

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickQuestionRegistrationHandler = () => {

        console.log('[QuestionRegistration] onClickQuestionRegistrationHandler');

        const formData = new FormData();

        formData.append("questionTitle", form.questionTitle);
        formData.append("questionCategory", form.questionCategory);
        formData.append("questionContent", form.questionContent);
        formData.append("memberId", form.memberId);
        formData.append("questionStatus", '미해결');
        console.log(form.memberId);
        if(image){
            formData.append("questionImage", image);
        }

        dispatch(callQuestionRegistAPI({	// 문의 등록 
            form: formData
        }));        
        
        alert('문의 리스트로 이동합니다.');
        // navigate('/mypage/questionregistration', { replace: true});
        // window.location.reload();
    }
    

    return (
        <div>
            <div>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickQuestionRegistrationHandler }             
                >
                    문의등록
                </button>
            </div>        
            <div >
                <div>
                    <div>
                        { imageUrl && <img 
                            src={ imageUrl } 
                            alt="preview"
                        />}
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            onClick={ onClickImageUpload } 
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>문의 제목</label></td>
                                <td>
                                    <input 
                                        name='questionTitle'
                                        placeholder='문의 제목'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>문의 내용</label></td>
                                <td>
                                    <input 
                                        name='questionContent'
                                        placeholder='문의 내용을 입력해주세요'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>문의 종류</label></td>
                                <td>
                                    {/* categoryCode = 1:배송, 2:교환, 3:상품, 4: 환불 5: 기타 */}
                                    <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } value="배송"/>배송</label> &nbsp;
                                    <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } value="교환"/>교환</label> &nbsp;
                                    <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="상품" />상품</label> &nbsp;
                                    <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="환불" />환불</label>
                                    <label><input type="radio" name="questionCategory" onChange={onChangeHandler} value="기타" />기타</label>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default QuestionRegistration;