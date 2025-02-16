import {
  Button,
  Col,
  InputNumber,
  notification,
  Row,
  Select,
  Card,
  Typography,
  Space,
} from "antd";
import {
  Product,
  Receipt,
  ReceiptRequest,
} from "../interfaces/GenericInterfaces";
import { useState } from "react";
import { NotificationPlacement } from "antd/es/notification/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { setReceiptService } from "../services/ReceiptService";

const { Title, Text } = Typography;

interface IBuyProductProps {
  products: Product[];
  setReceipts: React.Dispatch<React.SetStateAction<Receipt[]>>;
}

interface Order {
  productId?: number;
  name?: string;
  price?: number;
  quantity?: number;
}

const BuyProduct: React.FC<IBuyProductProps> = (props: IBuyProductProps) => {
  const [order, setCurrentOrder] = useState<Order>({});
  const [cart, setCart] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const openNotification = (placement: NotificationPlacement) => {
    notification.open({
      message: `Error`,
      description: "All fields are required",
      placement,
      duration: 2,
    });
  };

  const itemList =
    props.products.map((product) => {
      return { id: product?.id, name: product?.name };
    }) ?? [];

  const options =
    itemList?.map((item) => {
      return { value: item.id, label: item.name };
    }) ?? [];

  const addItemToCart = () => {
    if (!order?.productId || !order?.quantity) {
      openNotification("topRight");
      return;
    }

    const existingItemIndex = cart.findIndex(
      (item) => item.productId === order.productId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity! += order.quantity!;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, order]);
    }

    setCurrentOrder({});
  };

  const handleSelectItem = (value: number) => {
    const selectedProduct: Product =
      props.products.find((prod) => prod.id === value) ?? {};

    if (selectedProduct) {
      setCurrentOrder((prev) => {
        return {
          ...prev,
          productId: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
        };
      });
    }
  };

  const handleBuyProducts = async () => {
    setLoading(true);
    try {
      const newReceipt: Receipt = await setReceiptService(
        cart as ReceiptRequest[]
      );
      // Non rifaccio la get delle receipt ma la aggiorno con la response della post
      props.setReceipts((prev) => {
        return [...prev, newReceipt];
      });
      notification.success({
        message: "Success",
        description: "Products purchased successfully!",
      });
      setCart([]);
    } catch (error) {
      console.error("Failed to set receipts:", error);
      notification.error({
        message: "Error",
        description: "Failed to purchase products.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className='d-flex justify-center'>
        <Title level={3}>Insert Product</Title>
      </Col>
      <Col span={24}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space direction='vertical' style={{ width: "100%" }}>
                <Text strong>Item:</Text>
                <Select
                  style={{ width: "100%" }}
                  options={options}
                  value={order?.productId}
                  onChange={(value: number) => handleSelectItem(value)}
                  disabled={props.products.length === 0}
                  placeholder='Select a product'
                />
              </Space>
            </Col>
            <Col span={12}>
              <Space direction='vertical' style={{ width: "100%" }}>
                <Text strong>Quantity:</Text>
                <InputNumber
                  style={{ width: "100%" }}
                  value={order?.quantity}
                  onChange={(value: number | null) =>
                    setCurrentOrder((prev) => {
                      return { ...prev, quantity: value ?? undefined };
                    })
                  }
                  placeholder='Enter quantity'
                />
              </Space>
            </Col>
            <Col span={24} className='d-flex justify-between'>
              <Button type='primary' onClick={addItemToCart}>
                Add to Cart
              </Button>
              {cart.length > 0 && (
                <Button
                  type='primary'
                  onClick={handleBuyProducts}
                  loading={loading}
                >
                  Buy Products
                </Button>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Cart'>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Card
                key={index}
                style={{ marginBottom: "16px" }}
                actions={[
                  <DeleteOutlined
                    key='delete'
                    onClick={() => removeItemFromCart(item.productId!)}
                  />,
                ]}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text strong>Product Name:</Text> {item.name}
                  </Col>
                  <Col span={24}>
                    <Text strong>Price:</Text> ${item.price?.toFixed(2)}
                  </Col>
                  <Col span={24}>
                    <Text strong>Quantity:</Text> {item.quantity}
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <Text type='secondary'>Your cart is empty.</Text>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default BuyProduct;
