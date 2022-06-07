import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import { useReactToPrint } from "react-to-print";

function Bills() {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);

  const dispatch = useDispatch();

  const [printbillModalVisibility, setPrintBillModalVisibility] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (_id, record) => <div>{record.quantity}</div>,
    },
    {
      title: "Total fare",
      dataIndex: "_id",
      render: (_id, record) => <div>{record.quantity * record.price}</div>,
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills</h3>
      </div>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />

      {printbillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibility(false);
          }}
          visible={printbillModalVisibility}
          title="Bill Detais"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>Suplex City</b>
                </h1>
              </div>
              <div>
                <p>Bhupgadh</p>
                <p>Rajkot</p>
                <p>9898418818</p>
              </div>
            </div>
            <div className="bill-customer-detail my-2">
              <p>
                <b>Name</b> : {selectedBill.customerName}
              </p>
              <p>
                <b>Phone Nuber</b> : {selectedBill.customerPhoneNumber}
              </p>
              <p>
                <b>Date</b> :{" "}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table dataSource={selectedBill.cartItems} columns={cartcolumns} />
            <div className="d-border">
              <p>
                <b>Sub Total</b> : {selectedBill.subTotal}
              </p>
              <p>
                <b>tax : </b>
                {selectedBill.tax}
              </p>
            </div>
            <div>
              <h2>
                <b>Grand Total : {selectedBill.totalAmount}</b>
              </h2>
            </div>
            <div className="d-border"></div>
            <div className="text-center">
              <p>Thanks</p>
              <p>Visit Again :)</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={handlePrint}>
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Bills;
