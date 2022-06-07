import React , { useEffect }from "react";
import { Button, Form, Input, message ,Row , Col } from "antd";
import { Link , useNavigate } from "react-router-dom";
import "../resources/authentication.css"
import axios from 'axios';
import { useDispatch } from "react-redux";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch({type:'showLoading'})
    axios.post('/api/users/register' , values).then((res)=>{
      dispatch({type:'hideLoading'})
      message.success("Registration Successfull, please wait for the verification")
    }).catch(()=>{
      dispatch({type:'hideLoading'})
      message.error("Something Went Wrong")
    })
  };

  useEffect(()=>{
    if(localStorage.getItem('Pos-User'))
    {
      navigate('/home'); 
    }
  } , [])

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            {/* name property shoud match with mongodb columns */}
            <h3>Suplex POS</h3>
            <hr/>
            <h4>Register</h4>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userID" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password'/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered? Click here to Login</Link>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
