import { Product } from "../interfaces/GenericInterfaces";
import { Row, Table } from "antd";

interface IProductListProps {
  products: Product[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "IsImported",
      dataIndex: "isImported",
      key: "isImported",
      render: (text: boolean) => text.toString(),
    },
  ];

  return (
    <Row justify={"center"}>
      <Table
        dataSource={products.map((product) => ({
          ...product,
          key: product.id,
        }))}
        columns={columns}
      ></Table>
    </Row>
  );
};

export default ProductList;
