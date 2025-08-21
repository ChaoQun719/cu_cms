
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn'; // 引入解决antd中DatePicker组件中月和周显示英文的问题
import { router } from './routes';
import zhCN from 'antd/locale/zh_CN';
import './App.css'

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        // algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
