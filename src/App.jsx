import React from "react";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "./App.css";
import Layout from "./module/layout/Layout";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PageNotFound from "./module/layout/PageNotFound";
import LoginAndRegisterForm from "./module/auth/LoginAndRegister";
import { AuthProvider } from "./module/auth/useAuth";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginAndRegisterForm />} />

            <Route element={<Layout />}>
              <Route path="/draw" element={<div>画布</div>} />
              <Route path="/list" element={<div>我保存的电路列表</div>} />
            </Route>

            <Route path="/" element={<Navigate to="/draw" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
