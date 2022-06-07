import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import { useReactToPrint } from "react-to-print";

function Customers(){
    const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);

  const dispatch = useDispatch();


  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        //console.log(response.data)
        dispatch({ type: "hideLoading" });
        const data = response.data;
        data.reverse()
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
        title: "Phone Number",
        dataIndex: "customerPhoneNumber",
      },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value)=><span>{value.toString().substring(0,10)}</span>
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
}

export default Customers;