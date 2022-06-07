import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";

function Items() {
  const [itemsData, setItemsData] = useState([]);

  const dispatch = useDispatch();

  const [addEditModelOpen, setAddEditModelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        //console.log(response.data)
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);



  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item" ,{ItemId : record._id})
      .then((response) => {
        //console.log(response.data)
        dispatch({ type: "hideLoading" });
        message.success("Item Deleted Successfully");
        getAllItems();

      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Somethong went Wrong");
        console.log(error);
      });
  };




  //   submit form to add item
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    // if block = add else block = edit
    if (editingItem === null) {
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item Added Successfully");
          setAddEditModelOpen(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          console.log(error);
          message.error("Somethong went Wrong");
        });
    } else {
      axios
        .post("/api/items/edit-item", {...values , ItemId : editingItem._id})
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item Edited Successfully");
          setEditingItem(null)
          setAddEditModelOpen(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          console.log(error);
          message.error("Somethong went Wrong");
        });
    }
  };



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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModelOpen(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=>deleteItem(record)}/>
        </div>
      ),
    },
  ];




  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setAddEditModelOpen(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModelOpen && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModelOpen(false);
          }}
          visible={addEditModelOpen}
          title={`${editingItem != null ? "Edit Item" : "Add New Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            {/* name property shoud match with mongodb columns */}
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="pulses">Pulses</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;
