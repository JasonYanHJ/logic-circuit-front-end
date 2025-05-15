import { PartitionOutlined, UnorderedListOutlined } from "@ant-design/icons";

const route = {
  path: "/",
  routes: [
    {
      path: "/draw",
      name: "画布",
      icon: <PartitionOutlined />,
    },
    {
      path: "/list",
      name: "我的电路",
      icon: <UnorderedListOutlined />,
    },
  ],
};

export default route;
