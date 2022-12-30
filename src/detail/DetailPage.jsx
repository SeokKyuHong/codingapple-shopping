import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FillExample from './FillExample';

const DetailPage = (props) => {
    let {id} = useParams();
    let findYeji = props.yeji.find( (x)=> x.id == id );
    let [topAlert, setAlert] = useState(true);
    let [num, setNum] = useState('');

    useEffect( ()=> {
        let a = setTimeout( ()=> {
            setAlert(false);
        }, 2000);
        //기존 요청은 제거해 주고 새로 시작해요
        return ()=>{ clearTimeout(a); }
    }, [])

    useEffect( ()=> {
        if (isNaN(num) == true){
            alert('그러지마세요')
        }
    }, [num])

    
  return (
    <div className="container">
        {/* 2초뒤 사라지는 알럿 */}
        {
            topAlert === true ? 
            <div className='alert alert-warning'>
                2초이내 구매시 할인
            </div>
            : null
        }

        <div className="row">
            <div className="col-md-6">
                <img style={{width: "80%", textAlign: "center"}} alt='예지' src={ require('../img/yeji_0'+ findYeji.id +'.jpg') }/>
            </div>
            <div className="col-md-6">
                
                <h4 className="pt-5">{findYeji.title}</h4>
                <p>{findYeji.content}</p>

                {/* 수량 입력 */}
                <input onChange={(e)=>{ setNum(e.target.value) }}/>
                <p>{findYeji.price}원</p>
                
                <button className="btn btn-danger">구매하기</button> 
            </div>
        </div>
        <FillExample/>
    </div> 
  );
}

export default DetailPage
