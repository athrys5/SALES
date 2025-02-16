import { Col, Row, Table, Typography } from "antd";
import { Receipt } from "../interfaces/GenericInterfaces";

const { Title, Text } = Typography;

interface IReceiptsLogProps {
  receipts: Receipt[];
}

const ReceiptsLog: React.FC<IReceiptsLogProps> = ({ receipts }) => {
  const itemColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {receipts.map((receipt, index) => (
        <Col span={24} key={index}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <Title level={4}>Receipt #{index + 1}</Title>

            <Table
              columns={itemColumns}
              dataSource={receipt.items}
              pagination={false}
              rowKey={(item) => item.productName}
            />

            <Row justify='end' style={{ marginTop: "16px" }}>
              <Col>
                <Text strong>Total Tax: </Text>
                <Text>${receipt.totalTax.toFixed(2)}</Text>
              </Col>
            </Row>
            <Row justify='end'>
              <Col>
                <Text strong>Total Amount: </Text>
                <Text>${receipt.totalAmount.toFixed(2)}</Text>
              </Col>
            </Row>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ReceiptsLog;
