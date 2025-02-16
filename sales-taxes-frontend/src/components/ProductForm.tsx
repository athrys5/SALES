import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Card,
  Typography,
  notification,
  Spin,
} from "antd";
import { useState } from "react";
import { Product } from "../interfaces/GenericInterfaces";
import {
  getProductsService,
  setProductsService,
} from "../services/ProductService";

const { Title } = Typography;

interface IProductFormProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductForm: React.FC<IProductFormProps> = ({ setProducts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const createNewProduct = async (values: Product) => {
    setLoading(true);
    try {
      await setProductsService(values);
      const refetchedProducts: Product[] = await getProductsService();
      setProducts(refetchedProducts);
      notification.success({
        message: "Success",
        description: "Product added successfully!",
      });
      form.resetFields();
    } catch (error) {
      console.error("Failed to set products:", error);
      notification.error({
        message: "Error",
        description: "Failed to add product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify='center' style={{ marginTop: 20 }}>
      <Col xs={24} sm={18} md={12} lg={10}>
        <Card>
          <Title level={3} style={{ textAlign: "center" }}>
            Insert Product
          </Title>
          <Spin spinning={loading}>
            <Form
              form={form}
              layout='vertical'
              onFinish={createNewProduct}
              initialValues={{ isImported: false }}
            >
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  { required: true, message: "Please enter a product name" },
                ]}
              >
                <Input placeholder='Enter product name' />
              </Form.Item>

              <Form.Item
                label='Price'
                name='price'
                rules={[{ required: true, message: "Please enter a price" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0.01}
                  step={0.01}
                  placeholder='Enter product price'
                />
              </Form.Item>

              <Form.Item
                label='Category'
                name='category'
                rules={[{ required: true, message: "Please enter a category" }]}
              >
                <Input placeholder='Enter product category' />
              </Form.Item>

              <Form.Item name='isImported' valuePropName='checked'>
                <Checkbox>Is Imported?</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  loading={loading}
                >
                  Create Product
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductForm;
