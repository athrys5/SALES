import React, { useEffect, useState } from "react";
import { Col, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import { ActiveComponent } from "./enums/Enums";
import AssignmentDescription from "./components/AssignmentDescription";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "@ant-design/v5-patch-for-react-19";
import { Product, Receipt } from "./interfaces/GenericInterfaces";
import BuyProduct from "./components/BuyProduct";
import { getProductsService } from "./services/ProductService";
import ReceiptsLog from "./components/ReceiptsLog";
import { getReceiptsService } from "./services/ReceiptService";

const App: React.FC = () => {
  const [currentActiveComponent, setActiveComponent] =
    useState<ActiveComponent>(ActiveComponent.Home);
  const [products, setProducts] = useState<Product[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData: Product[] = await getProductsService();
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchReceipts = async () => {
    try {
      const receiptsData: Receipt[] = await getReceiptsService();
      setReceipts(receiptsData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Description",
      children: <AssignmentDescription />,
    },
    {
      key: "1",
      label: "Add Product",
      children: <ProductForm setProducts={setProducts} />,
    },
    {
      key: "2",
      label: "Products catalog",
      children: <ProductList products={products} />,
    },
    {
      key: "3",
      label: "Buy Product",
      children: <BuyProduct products={products} setReceipts={setReceipts} />,
    },
    {
      key: "4",
      label: "Receipts log",
      children: <ReceiptsLog receipts={receipts} />,
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <Row justify={"center"} className='App'>
      <Col span={12}>
        <Tabs
          defaultActiveKey={currentActiveComponent.toString()}
          items={items}
          onChange={(key) => setActiveComponent(Number(key))}
        />
      </Col>
    </Row>
  );
};

export default App;
