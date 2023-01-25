// import React, {useEffect, useState} from "react";
// // import useDaumPostcodePopup from "react-daum-postcode";
// import DaumPostcode from "react-daum-postcode";

// export default function PostcodePopup(props) {

//     // const CURRENT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
//     // const open = useDaumPostcodePopup(CURRENT_URL);

//     const completeHandler = (data) => {
//         let fullAddress = data.address;
//         let extraAddress = '';

//         if (data.addressType === 'R') {
//             if (data.bname !== '') extraAddress += data.bname;
//             if (data.buildingName !== '') {
//                 extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
//             }
//             fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
//         }

//         console.log("data", data);
//         console.log("fullAddress", fullAddress);

//         // props.setForm({
//         //     ...props.form,
//         //     cgAdsNum:fullAddress,
//         //     cgAdsDetail: 
//         // })
//     };

//     // const apiClickHandler = () => {
//     //     open({onComplete: completeHandler});
//     // };

//     const postCodeCSS = {
//         display: "block",
//         position: "absolute",
//         top: "10%",
//         width: "600px",
//         height: "600px",
//         padding: "7px"
//     };

//     return (
//         <>
//             {/* <button 
//                 style={postCodeCSS} 
//                 onClick={apiClickHandler} 
//             >Open
//             </button> */}
//             <div>
//             <DaumPostcode
//                 style={postCodeCSS}
//                 autoClose
//                 onComplete={completeHandler} />
//             </div>
//         </>
//     );
// };