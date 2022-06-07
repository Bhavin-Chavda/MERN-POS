import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/item";
import { useDispatch } from "react-redux";
import '../resources/HomePage.css'

function HomePage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectdCategory, setSelectedCategory] = useState("fruits");
  const dispatch = useDispatch();

  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2022/1/1/food-prevent-sun-tan.jpg",
    },
    {
      name: "vegetables",
      imageURL:
        "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlc2glMjB2ZWdldGFibGVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      name: "pulses",
      imageURL:
        "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/2/11/pulses.jpg",
    },
  ];

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

  return (
    <DefaultLayout>
      <div className="d-flex categories">
          {categories.map((category)=>{
            return <div
             onClick={()=>setSelectedCategory(category.name)}
             className={`d-flex category ${selectdCategory===category.name && 'selected-category'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} height='60' width='80'/>
            </div>
          })}

      </div>

      <Row gutter={20}>
        {itemsData.filter((i)=>i.category===selectdCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default HomePage;
