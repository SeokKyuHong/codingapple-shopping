import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FillExample from './FillExample';
import { addItem } from '../store';
import { useDispatch } from 'react-redux';

const DetailPage = (props) => {
    let {id} = useParams();
    let findYeji = props.yeji.find( (x)=> x.id == id );
    let [topAlert, setAlert] = useState(true);
    let [num, setNum] = useState('');
    let dispatch = useDispatch();

    useEffect(()=>{
        
        let data = localStorage.getItem('watched');
        data = JSON.parse(data);

        if (!(data.find( (x)=> x == findYeji.id))){
            data.push(findYeji.id);
        }
        localStorage.setItem('watched', JSON.stringify(data));
    }, [])

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
    }, [])

    

    
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
                
                <button className="btn btn-danger" onClick={()=>{
                    dispatch(addItem({}))
                }}>구매하기</button> 
            </div>
        </div>

        {/* 상세페이지 탭메뉴 */}
        <FillExample/>
    </div> 
  );
}

export default DetailPage
