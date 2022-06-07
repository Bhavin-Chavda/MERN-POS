import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import "../resources/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? 'SC' : 'Suplex City'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: <Link to="/home">Home</Link>,
            },
            {
              key: "/cart",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/cart">Cart</Link>,
            },
            {
              key: "/bills",
              icon: <CopyOutlined />,
              label: <Link to="/bills">Bills</Link>,
            },
            {
              key: "/items",
              icon: <UnorderedListOutlined />,
              label: <Link to="/items">Items</Link>,
            },
            {
              key: "/customers",
              icon: <UserOutlined />,
              label: <Link to="/customers">Customers</Link>,
            },
            {
              key: "/logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick:()=>{
                localStorage.removeItem('Pos-User')
                navigate('/login')
              }
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              // onClick: () => setCollapsed(!collapsed),
              onClick: toggle,
            }
          )}
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              <p className="mt-3 mr-5">{cartItems.length}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "10px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
