import { Button, Form, Input, message, Row, Col, Table, Modal , Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/HomePage.css";
import axios from 'axios';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

function CartPage() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [subTotal, setSubTotal] = useState(0);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const inc = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const dec = (record) => {
    if (record.quantity > 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      // console.log(item.price+ '  '+ item.quantity)
      temp = temp + (item.price * item.quantity);
    });
    setSubTotal(temp);
  }, [cartItems]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <PlusCircleOutlined className="mx-3" onClick={() => inc(record)} />
          {record.quantity}
          <MinusCircleOutlined className="mx-3" onClick={() => dec(record)} />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFormCart", payload: record })}
        />
      ),
    },
  ];

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax : Number((subTotal*0.1.toFixed(2))),
      totalAmount : Number(subTotal + Number((subTotal*0.1.toFixed(2)))),
      userID : JSON.parse(localStorage.getItem('Pos-User'))._id
    }
    
    axios.post('/api/bills/charge-bill' , reqObject).then(()=>{
      message.success("Bill Charged SuccessFully");
      navigate("/bills")
      
    }).catch(()=>{
      message.error("Somethig Went Wrong with bills API")
    })

  };

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered pagination={false}/>
      <div className="d-flex justify-content-end flex-column align-items-end">
        <hr />
        <div className="subtotal">
          <h3>
            Sub Total : <b>{subTotal}$/-</b>
          </h3>
        </div>
        <Button type="primary" onClick={() => setBillChargeModal(true)}>
          Charge Bill
        </Button>
      </div>

      <Modal title="Charge bill" visible={billChargeModal} footer={false} onCancel={()=>setBillChargeModal(false)}>
        <Form layout="vertical" onFinish={onFinish}>
          {/* name property shoud match with mongodb columns */} 
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Phone number">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>SubTotal : <b>{subTotal}</b></h5>
            <h5>Tax : <b>{(subTotal*0.1.toFixed(2))}</b></h5>
            <hr/>
            <h2>Grand Total : <b>{subTotal + subTotal*0.1}</b></h2>
          </div>

          <div className="d-flex justify-content-end align-items-center">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}

export default CartPage;
