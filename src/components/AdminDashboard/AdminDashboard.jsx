import React, { useState, useEffect } from 'react';
import { Tabs, Card, Spin, Row, Col, Statistic, Progress, List } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from 'recharts';
import { UserOutlined, ShoppingCartOutlined, ShopOutlined, TrophyOutlined, DollarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import * as DashboardService from '../../services/DashboardService';
import styled from 'styled-components';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(45, 27, 105, 0.95))',
          border: '1px solid rgba(233, 30, 99, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p style={{ color: '#e91e63', margin: '0 0 8px 0', fontWeight: '600' }}>{`Tháng: ${label}`}</p>
        {payload.map((pld, index) => (
          <p key={index} style={{ color: '#fff', margin: 0 }}>
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardContainer = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #5b2c6f 100%);
  min-height: 100vh;
  color: #fff;

  h2 {
    color: #e91e63 !important;
    text-shadow: 0 0 10px rgba(233, 30, 99, 0.4);
    font-weight: 600;
  }

  .ant-tabs {
    .ant-tabs-nav {
      background: rgba(26, 26, 46, 0.8);
      border-radius: 12px;
      padding: 8px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(233, 30, 99, 0.2);
    }

    .ant-tabs-tab {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #b0bec5 !important;
      border-radius: 8px;
      margin: 0 4px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(233, 30, 99, 0.1);
        color: #e91e63 !important;
        border-color: rgba(233, 30, 99, 0.3);
      }

      &.ant-tabs-tab-active {
        background: linear-gradient(135deg, #e91e63, #ad1457);
        color: #fff !important;
        border-color: #e91e63;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
      }
    }

    .ant-tabs-content-holder {
      background: transparent;
    }
  }
`;

const StatsCard = styled(Card)`
  margin-bottom: 16px;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(45, 27, 105, 0.9));
  border: 1px solid rgba(233, 30, 99, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);
    border-color: rgba(233, 30, 99, 0.4);
  }

  .ant-card-body {
    padding: 20px;
  }

  .ant-statistic {
    .ant-statistic-title {
      color: #b0bec5;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .ant-statistic-content {
      .ant-statistic-content-value {
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;

const ChartCard = styled(Card)`
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(45, 27, 105, 0.9));
  border: 1px solid rgba(233, 30, 99, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(233, 30, 99, 0.2);
    border-color: rgba(233, 30, 99, 0.3);
  }

  .ant-card-body {
    padding: 24px;
  }

  .ant-card-head {
    background: transparent;
    border-bottom: 1px solid rgba(233, 30, 99, 0.2);

    .ant-card-head-title {
      color: #e91e63;
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const [userRegistrationData, setUserRegistrationData] = useState([]);
  const [userOrderData, setUserOrderData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Order stats states
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const [productRevenueData, setProductRevenueData] = useState([]);
  const [revenueTarget, setRevenueTarget] = useState(0);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [totalYearRevenue, setTotalYearRevenue] = useState(0);

  // Product stats states
  const [categoryData, setCategoryData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);
  const [productTrendsData, setProductTrendsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);

  const user = useSelector((state) => state.user);

  // Mock data for when API is not ready
  const mockRegistrationData = [
    { month: 'T1', users: 45 },
    { month: 'T2', users: 52 },
    { month: 'T3', users: 61 },
    { month: 'T4', users: 58 },
    { month: 'T5', users: 67 },
    { month: 'T6', users: 73 },
  ];

  const mockOrderData = [
    { month: 'T1', users: 35 },
    { month: 'T2', users: 42 },
    { month: 'T3', users: 48 },
    { month: 'T4', users: 44 },
    { month: 'T5', users: 51 },
    { month: 'T6', users: 57 },
  ];

  // Mock data for order stats
  const mockMonthlyRevenue = [
    { month: 'T1', revenue: 320000 },
    { month: 'T2', revenue: 410000 },
    { month: 'T3', revenue: 380000 },
    { month: 'T4', revenue: 450000 },
    { month: 'T5', revenue: 520000 },
    { month: 'T6', revenue: 380000 },
    { month: 'T7', revenue: 460000 },
    { month: 'T8', revenue: 490000 },
    { month: 'T9', revenue: 550000 },
    { month: 'T10', revenue: 420000 },
    { month: 'T11', revenue: 510000 },
    { month: 'T12', revenue: 580000 },
  ];

  const mockCurrentMonthData = [
    { day: '1', revenue: 15000 },
    { day: '5', revenue: 28000 },
    { day: '10', revenue: 45000 },
    { day: '15', revenue: 67000 },
    { day: '20', revenue: 89000 },
    { day: '25', revenue: 125000 },
    { day: '30', revenue: 158000 },
  ];

  const mockProductRevenue = [
    { name: 'iPhone 15 Pro', revenue: 850000, category: 'Điện thoại' },
    { name: 'MacBook Air M3', revenue: 720000, category: 'Laptop' },
    { name: 'AirPods Pro 2', revenue: 680000, category: 'Phụ kiện' },
    { name: 'iPad Pro 12.9', revenue: 590000, category: 'Tablet' },
    { name: 'Apple Watch S9', revenue: 450000, category: 'Đồng hồ' },
    { name: 'Samsung S24 Ultra', revenue: 420000, category: 'Điện thoại' },
    { name: 'Dell XPS 13', revenue: 380000, category: 'Laptop' },
    { name: 'Sony WH-1000XM5', revenue: 350000, category: 'Phụ kiện' },
    { name: 'Surface Pro 9', revenue: 290000, category: 'Tablet' },
    { name: 'Xiaomi Mi Band 8', revenue: 180000, category: 'Đồng hồ' },
  ];

  // Mock data for product stats
  const mockCategoryData = [
    { name: 'Điện thoại', value: 35, color: '#e91e63' },
    { name: 'Laptop', value: 25, color: '#9c27b0' },
    { name: 'Phụ kiện', value: 20, color: '#673ab7' },
    { name: 'Tablet', value: 12, color: '#3f51b5' },
    { name: 'Đồng hồ', value: 8, color: '#00bcd4' },
  ];

  const mockTopProducts = [
    { name: 'iPhone 15 Pro', sold: 1250, revenue: 850000, trend: '+15%' },
    { name: 'MacBook Air M3', sold: 890, revenue: 720000, trend: '+8%' },
    { name: 'AirPods Pro 2', sold: 2100, revenue: 680000, trend: '+22%' },
    { name: 'iPad Pro 12.9', sold: 650, revenue: 590000, trend: '+5%' },
    { name: 'Apple Watch S9', sold: 780, revenue: 450000, trend: '+12%' },
  ];

  const mockProductTrends = [
    { month: 'T1', electronics: 150, accessories: 120, clothing: 80 },
    { month: 'T2', electronics: 180, accessories: 140, clothing: 95 },
    { month: 'T3', electronics: 160, accessories: 130, clothing: 85 },
    { month: 'T4', electronics: 200, accessories: 160, clothing: 110 },
    { month: 'T5', electronics: 220, accessories: 180, clothing: 125 },
    { month: 'T6', electronics: 240, accessories: 200, clothing: 140 },
  ];

  const mockInventoryData = [
    { category: 'Điện thoại', inStock: 450, lowStock: 25, outOfStock: 5 },
    { category: 'Laptop', inStock: 320, lowStock: 18, outOfStock: 3 },
    { category: 'Phụ kiện', inStock: 680, lowStock: 45, outOfStock: 12 },
    { category: 'Tablet', inStock: 180, lowStock: 8, outOfStock: 2 },
    { category: 'Đồng hồ', inStock: 250, lowStock: 15, outOfStock: 4 },
  ];

  const fetchUserStats = async () => {
    if (!user?.access_token) return;

    setLoading(true);
    try {
      // Try to fetch real data, fallback to mock data if API not ready
      try {
        const [registrationStats, orderStats, usersData, ordersData] = await Promise.all([
          // getUserRegistrationStats(user.access_token),
          // getUserOrderStats(user.access_token),
          // getAllUser(user.access_token),
          // getAllOrder(user.access_token),
        ]);

        if (registrationStats?.status === 'OK' && registrationStats?.data) {
          setUserRegistrationData(registrationStats.data);
        } else {
          setUserRegistrationData(mockRegistrationData);
        }

        if (orderStats?.status === 'OK' && orderStats?.data) {
          setUserOrderData(orderStats.data);
        } else {
          setUserOrderData(mockOrderData);
        }

        if (usersData?.status === 'OK' && usersData?.data) {
          setTotalUsers(usersData.data.length);
        } else {
          setTotalUsers(120); // Mock total users
        }

        if (ordersData?.status === 'OK' && ordersData?.data) {
          setTotalOrders(ordersData.data.length);
        } else {
          setTotalOrders(85); // Mock total orders
        }
      } catch (apiError) {
        console.log('API not ready, using mock data:', apiError);
        // Use mock data when API is not ready
        setUserRegistrationData(mockRegistrationData);
        setUserOrderData(mockOrderData);
        setTotalUsers(120);
        setTotalOrders(85);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Use mock data as fallback
      setUserRegistrationData(mockRegistrationData);
      setUserOrderData(mockOrderData);
      setTotalUsers(120);
      setTotalOrders(85);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    if (!user?.access_token) return;

    setLoading(true);
    try {
      // Try to fetch real data, fallback to mock data if API not ready
      try {
        const [monthlyRevenue, currentMonth, productRevenue, target] = await Promise.all([
          DashboardService.getMonthlyRevenue(user.access_token),
          DashboardService.getCurrentMonthRevenue(user.access_token),
          DashboardService.getProductRevenueStats(user.access_token),
          DashboardService.getRevenueTarget(user.access_token),
        ]);

        if (monthlyRevenue?.status === 'OK' && monthlyRevenue?.data) {
          setMonthlyRevenueData(monthlyRevenue.data);
        } else {
          setMonthlyRevenueData(mockMonthlyRevenue);
        }

        if (currentMonth?.status === 'OK' && currentMonth?.data) {
          setCurrentMonthData(currentMonth.data.dailyData || []);
          setCurrentRevenue(currentMonth.data.total || 242500);
        } else {
          setCurrentMonthData(mockCurrentMonthData);
          setCurrentRevenue(242500);
        }

        if (productRevenue?.status === 'OK' && productRevenue?.data) {
          setProductRevenueData(productRevenue.data);
          setTotalYearRevenue(productRevenue.data.reduce((sum, item) => sum + item.revenue, 0));
        } else {
          setProductRevenueData(mockProductRevenue);
          setTotalYearRevenue(mockProductRevenue.reduce((sum, item) => sum + item.revenue, 0));
        }

        if (target?.status === 'OK' && target?.data) {
          setRevenueTarget(target.data.target || 500000);
        } else {
          setRevenueTarget(500000);
        }
      } catch (apiError) {
        console.log('API not ready, using mock data:', apiError);
        // Use mock data when API is not ready
        setMonthlyRevenueData(mockMonthlyRevenue);
        setCurrentMonthData(mockCurrentMonthData);
        setProductRevenueData(mockProductRevenue);
        setRevenueTarget(500000);
        setCurrentRevenue(242500);
        setTotalYearRevenue(mockProductRevenue.reduce((sum, item) => sum + item.revenue, 0));
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
      // Use mock data as fallback
      setMonthlyRevenueData(mockMonthlyRevenue);
      setCurrentMonthData(mockCurrentMonthData);
      setProductRevenueData(mockProductRevenue);
      setRevenueTarget(500000);
      setCurrentRevenue(242500);
      setTotalYearRevenue(mockProductRevenue.reduce((sum, item) => sum + item.revenue, 0));
    } finally {
      setLoading(false);
    }
  };

  const fetchProductStats = async () => {
    if (!user?.access_token) return;

    setLoading(true);
    try {
      // Try to fetch real data, fallback to mock data if API not ready
      try {
        // Add API calls here when backend is ready
        // const [categories, topProducts, trends, inventory] = await Promise.all([...]);

        // For now, use mock data
        setCategoryData(mockCategoryData);
        setTopProductsData(mockTopProducts);
        setProductTrendsData(mockProductTrends);
        setInventoryData(mockInventoryData);
        setTotalProducts(1250);
        setLowStockProducts(45);
      } catch (apiError) {
        console.log('API not ready, using mock data:', apiError);
        // Use mock data when API is not ready
        setCategoryData(mockCategoryData);
        setTopProductsData(mockTopProducts);
        setProductTrendsData(mockProductTrends);
        setInventoryData(mockInventoryData);
        setTotalProducts(1250);
        setLowStockProducts(45);
      }
    } catch (error) {
      console.error('Error fetching product stats:', error);
      // Use mock data as fallback
      setCategoryData(mockCategoryData);
      setTopProductsData(mockTopProducts);
      setProductTrendsData(mockProductTrends);
      setInventoryData(mockInventoryData);
      setTotalProducts(1250);
      setLowStockProducts(45);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUserStats();
    } else if (activeTab === 'orders') {
      fetchOrderStats();
    } else if (activeTab === 'products') {
      fetchProductStats();
    }
  }, [activeTab, user?.access_token]);

  const renderUserStats = () => (
    <div>
      {/* Overview Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <StatsCard>
            <Statistic
              title="Tổng số người dùng"
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </StatsCard>
        </Col>
        <Col span={8}>
          <StatsCard>
            <Statistic
              title="Người dùng đặt hàng"
              value={Math.floor(totalUsers * 0.7)} // Assume 70% of users have ordered
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col span={8}>
          <StatsCard>
            <Statistic
              title="Tổng đơn hàng"
              value={totalOrders}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={16}>
        <Col span={12}>
          <ChartCard title="Thống kê User đăng ký mới (6 tháng gần nhất)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 30, 99, 0.1)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#b0bec5', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                />
                <YAxis tick={{ fill: '#b0bec5', fontSize: 12 }} axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#b0bec5' }} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#e91e63"
                  strokeWidth={3}
                  name="Số user đăng ký"
                  dot={{ fill: '#e91e63', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#c2185b', stroke: '#e91e63', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
        <Col span={12}>
          <ChartCard title="Thống kê User đã đặt hàng (6 tháng gần nhất)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userOrderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 39, 176, 0.1)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#b0bec5', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(156, 39, 176, 0.2)' }}
                />
                <YAxis tick={{ fill: '#b0bec5', fontSize: 12 }} axisLine={{ stroke: 'rgba(156, 39, 176, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#b0bec5' }} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#9c27b0"
                  strokeWidth={3}
                  name="Số user đặt hàng"
                  dot={{ fill: '#9c27b0', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#7b1fa2', stroke: '#9c27b0', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>
    </div>
  );

  const renderProductStats = () => (
    <div>
      {/* Overview Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <StatsCard>
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#e91e63' }}
            />
          </StatsCard>
        </Col>
        <Col span={6}>
          <StatsCard>
            <Statistic
              title="Sản phẩm bán chạy"
              value={mockTopProducts.length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#9c27b0' }}
            />
          </StatsCard>
        </Col>
        <Col span={6}>
          <StatsCard>
            <Statistic
              title="Sắp hết hàng"
              value={lowStockProducts}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#ff9800' }}
            />
          </StatsCard>
        </Col>
        <Col span={6}>
          <StatsCard>
            <Statistic
              title="Danh mục"
              value={categoryData.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#4caf50' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {/* Category Distribution - Pie Chart */}
        <Col span={8}>
          <ChartCard title="Phân bố theo danh mục">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>

        {/* Top Products */}
        <Col span={8}>
          <ChartCard title="Top 5 sản phẩm bán chạy">
            <List
              dataSource={topProductsData}
              renderItem={(item, index) => (
                <List.Item
                  style={{
                    padding: '12px 0',
                    borderBottom: index < topProductsData.length - 1 ? '1px solid rgba(233, 30, 99, 0.1)' : 'none',
                  }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ color: '#b0bec5', fontSize: '12px' }}>
                        Đã bán: {item.sold} | ${(item.revenue / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div
                      style={{
                        color: item.trend.startsWith('+') ? '#4caf50' : '#f44336',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      {item.trend}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </ChartCard>
        </Col>

        {/* Inventory Status */}
        <Col span={8}>
          <ChartCard title="Tình trạng kho hàng">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 30, 99, 0.1)" />
                <XAxis type="number" tick={{ fill: '#b0bec5', fontSize: 12 }} />
                <YAxis dataKey="category" type="category" tick={{ fill: '#b0bec5', fontSize: 12 }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="inStock" stackId="a" fill="#4caf50" name="Còn hàng" />
                <Bar dataKey="lowStock" stackId="a" fill="#ff9800" name="Sắp hết" />
                <Bar dataKey="outOfStock" stackId="a" fill="#f44336" name="Hết hàng" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>

      {/* Product Trends Chart */}
      <Row gutter={16}>
        <Col span={24}>
          <ChartCard title="xu hướng bán hàng theo danh mục (6 tháng)">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={productTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 30, 99, 0.1)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#b0bec5', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                />
                <YAxis tick={{ fill: '#b0bec5', fontSize: 12 }} axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#b0bec5' }} />
                <Area
                  type="monotone"
                  dataKey="electronics"
                  stackId="1"
                  stroke="#e91e63"
                  fill="#e91e63"
                  fillOpacity={0.6}
                  name="Điện tử"
                />
                <Area
                  type="monotone"
                  dataKey="accessories"
                  stackId="1"
                  stroke="#9c27b0"
                  fill="#9c27b0"
                  fillOpacity={0.6}
                  name="Phụ kiện"
                />
                <Area
                  type="monotone"
                  dataKey="clothing"
                  stackId="1"
                  stroke="#00bcd4"
                  fill="#00bcd4"
                  fillOpacity={0.6}
                  name="Thời trang"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>
    </div>
  );

  const renderOrderStats = () => (
    <div>
      <Row gutter={16} style={{ minHeight: '600px' }}>
        {/* Left Column - Top and Bottom sections */}
        <Col span={18}>
          {/* Top Row - Target and Current Month Chart */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            {/* Revenue Target Progress */}
            <Col span={8}>
              <ChartCard title="Mục tiêu tháng này">
                <div style={{ padding: '20px 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <h2 style={{ color: '#e91e63', fontSize: '32px', margin: 0 }}>
                      ${(currentRevenue / 1000).toFixed(1)}K
                    </h2>
                    <p style={{ color: '#b0bec5', margin: 0 }}>Won (this month)</p>
                  </div>

                  <Progress
                    percent={Math.round((currentRevenue / revenueTarget) * 100)}
                    strokeColor={{
                      '0%': '#e91e63',
                      '100%': '#9c27b0',
                    }}
                    trailColor="rgba(233, 30, 99, 0.1)"
                    strokeWidth={12}
                    format={(percent) => (
                      <span style={{ color: '#e91e63', fontWeight: 'bold' }}>
                        +{((currentRevenue - revenueTarget * 0.8) / 1000).toFixed(1)}K vs target
                      </span>
                    )}
                  />

                  <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <TrophyOutlined style={{ color: '#e91e63', fontSize: '24px' }} />
                      <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>9</span>
                    </div>
                    <p style={{ color: '#b0bec5', margin: 0, fontSize: '14px' }}>No. of deals</p>
                  </div>
                </div>
              </ChartCard>
            </Col>

            {/* Current Month Revenue Chart */}
            <Col span={16}>
              <ChartCard title="Thu nhập tháng này">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={currentMonthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 30, 99, 0.1)" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: '#b0bec5', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                    />
                    <YAxis
                      tick={{ fill: '#b0bec5', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#00bcd4"
                      strokeWidth={3}
                      dot={{ fill: '#00bcd4', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#00acc1', stroke: '#00bcd4', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Col>
          </Row>

          {/* Bottom Row - Yearly Revenue Chart */}
          <Row>
            <Col span={24}>
              <ChartCard title="Doanh thu theo tháng (Won this FY)">
                <div style={{ marginBottom: 16 }}>
                  <h2 style={{ color: '#e91e63', fontSize: '36px', margin: 0 }}>
                    ${(totalYearRevenue / 1000000).toFixed(1)}M
                  </h2>
                  <p style={{ color: '#4caf50', margin: 0, fontSize: '14px' }}>
                    ▲ +${((totalYearRevenue - totalYearRevenue * 0.8) / 1000).toFixed(1)}K vs target
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 30, 99, 0.1)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: '#b0bec5', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                    />
                    <YAxis
                      tick={{ fill: '#b0bec5', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(233, 30, 99, 0.2)' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                      {monthlyRevenueData.map((entry, index) => {
                        // Define beautiful gradient colors
                        const colors = [
                          '#e91e63', // Pink
                          '#9c27b0', // Purple
                          '#673ab7', // Deep Purple
                          '#3f51b5', // Indigo
                          '#2196f3', // Blue
                          '#00bcd4', // Cyan (current month highlight)
                          '#009688', // Teal
                          '#4caf50', // Green
                          '#8bc34a', // Light Green
                          '#cddc39', // Lime
                          '#ffeb3b', // Yellow
                          '#ff9800', // Orange
                        ];

                        // Highlight current month with cyan, others with gradient colors
                        const currentMonth = new Date().getMonth();
                        const fillColor = index === currentMonth ? '#00bcd4' : colors[index];

                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </Col>
          </Row>
        </Col>

        {/* Right Column - Top Products List spanning full height */}
        <Col span={6}>
          <ChartCard title="Open deals" style={{ height: '100%' }}>
            <div style={{ height: 'calc(100% - 60px)', overflowY: 'auto', paddingRight: '8px' }}>
              <List
                dataSource={productRevenueData.slice(0, 15)}
                renderItem={(item, index) => (
                  <List.Item
                    style={{
                      padding: '12px 0',
                      borderBottom: index < productRevenueData.length - 1 ? '1px solid rgba(233, 30, 99, 0.1)' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ color: '#b0bec5', fontSize: '12px' }}>{item.category}</div>
                    </div>
                    <div style={{ color: '#e91e63', fontWeight: 'bold', fontSize: '14px' }}>
                      ${(item.revenue / 1000).toFixed(0)}K
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div
              style={{
                padding: '16px 0 8px 0',
                borderTop: '2px solid rgba(233, 30, 99, 0.3)',
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(45, 27, 105, 0.95))',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ color: '#e91e63', fontWeight: 'bold', fontSize: '16px' }}>Total value</span>
              <span style={{ color: '#e91e63', fontWeight: 'bold', fontSize: '18px' }}>
                ${(totalYearRevenue / 1000).toFixed(0)}K
              </span>
            </div>
          </ChartCard>
        </Col>
      </Row>
    </div>
  );

  const tabItems = [
    {
      key: 'users',
      label: (
        <span>
          <UserOutlined />
          Thống kê User
        </span>
      ),
      children: loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 50px',
            background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(45, 27, 105, 0.9))',
            borderRadius: '12px',
            border: '1px solid rgba(233, 30, 99, 0.2)',
          }}
        >
          <Spin size="large" style={{ color: '#e91e63' }} />
          <p style={{ color: '#b0bec5', marginTop: '16px', fontSize: '16px' }}>Đang tải dữ liệu thống kê...</p>
        </div>
      ) : (
        renderUserStats()
      ),
    },
    {
      key: 'products',
      label: (
        <span>
          <ShopOutlined />
          Thống kê Sản phẩm
        </span>
      ),
      children: renderProductStats(),
    },
    {
      key: 'orders',
      label: (
        <span>
          <ShoppingCartOutlined />
          Thống kê Đơn hàng
        </span>
      ),
      children: renderOrderStats(),
    },
  ];

  return (
    <DashboardContainer>
      <h2 style={{ marginBottom: 24, color: '#1890ff' }}>Dashboard Admin</h2>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} type="card" size="large" />
    </DashboardContainer>
  );
};

export default AdminDashboard;
