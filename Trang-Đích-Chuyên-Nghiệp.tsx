// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Button, Rate, Input, Divider, Modal, Form, message } from 'antd';
import {
UserOutlined,
LockOutlined,
RightOutlined,
LeftOutlined,
PhoneOutlined,
MailOutlined,
EnvironmentOutlined,
FacebookOutlined,
TwitterOutlined,
InstagramOutlined,
LinkedinOutlined
} from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const App: React.FC = () => {
const [isScrolled, setIsScrolled] = useState(false);
const [activeTestimonial, setActiveTestimonial] = useState(0);
const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
const [isVpsModalVisible, setIsVpsModalVisible] = useState(false);
const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
const [forgotPasswordForm] = Form.useForm();
const [changePasswordForm] = Form.useForm();
const handleForgotPassword = (values: any) => {
message.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn');
setIsForgotPasswordVisible(false);
forgotPasswordForm.resetFields();
};
const handleChangePassword = (values: any) => {
message.success('Mật khẩu đã được thay đổi thành công');
setIsChangePasswordVisible(false);
changePasswordForm.resetFields();
};
const [showPaymentInfo, setShowPaymentInfo] = useState(false);
const [loginForm] = Form.useForm();
const [registerForm] = Form.useForm();
const [vpsForm] = Form.useForm();
const handleLogin = async (values: any) => {
try {
const response = await fetch(`https://script.google.com/macros/s/AKfycbyhUQvkq6ilcogf-F7ILKK-h-R_zhJRTKJzJGKTBqZGYzuL6XVb0Rn3q-xU3LeYNsSFGw/exec?username=${values.username}&password=${values.password}`);
const data = await response.json();

if (data.success) {
message.success('Đăng nhập thành công!');
setIsLoginModalVisible(false);
loginForm.resetFields();
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('username', values.username);
window.location.href = 'https://static.readdy.ai/image/b8ee466497754c6c7c37fc0fc27d58f1/35aed3feaebe621fd80ddde79c7e6e32.png';
} else {
message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
}
} catch (error) {
message.error('Có lỗi xảy ra khi đăng nhập, vui lòng thử lại sau!');
console.error('Login error:', error);
}
};
const handleRegister = (values: any) => {
console.log('Register values:', values);
message.success('Đăng ký thành công!');
setIsRegisterModalVisible(false);
registerForm.resetFields();
};
const [selectedPlan, setSelectedPlan] = useState({
duration: '1 tháng',
monthlyPrice: '199.000',
totalPrice: '199.000',
discount: 0
});
const handleVpsSubscribe = (values: any) => {
console.log('VPS Subscription values:', values);
setShowPaymentInfo(true);
};
const showVpsModal = (plan: string) => {
let planDetails = {
duration: '1 tháng',
monthlyPrice: '199.000',
totalPrice: '199.000',
discount: 0
};
switch(plan) {
case '3months':
planDetails = {
duration: '3 tháng',
monthlyPrice: '189.050',
totalPrice: '567.150',
discount: 5
};
break;
case '6months':
planDetails = {
duration: '6 tháng',
monthlyPrice: '179.100',
totalPrice: '1.074.600',
discount: 10
};
break;
case '1year':
planDetails = {
duration: '1 năm',
monthlyPrice: '159.200',
totalPrice: '1.910.400',
discount: 20
};
break;
default:
break;
}
setSelectedPlan(planDetails);
setIsVpsModalVisible(true);
setShowPaymentInfo(false);
};
const showLoginModal = () => {
setIsLoginModalVisible(true);
setIsRegisterModalVisible(false);
};
const showRegisterModal = () => {
setIsRegisterModalVisible(true);
setIsLoginModalVisible(false);
};
useEffect(() => {
const handleScroll = () => {
if (window.scrollY > 50) {
setIsScrolled(true);
} else {
setIsScrolled(false);
}
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
const features = [
{
icon: 'fas fa-shield-alt',
title: 'Bảo mật tối đa',
description: 'Hệ thống bảo mật đa lớp, mã hóa dữ liệu theo chuẩn quốc tế giúp thông tin của bạn luôn được an toàn.'
},
{
icon: 'fas fa-bolt',
title: 'Tốc độ vượt trội',
description: 'Tối ưu hóa hiệu suất, giảm thời gian tải trang, mang đến trải nghiệm mượt mà cho người dùng.'
},
{
icon: 'fas fa-sync',
title: 'Đồng bộ hóa liền mạch',
description: 'Tự động đồng bộ dữ liệu trên tất cả thiết bị, giúp bạn làm việc mọi lúc, mọi nơi.'
},
{
icon: 'fas fa-chart-line',
title: 'Phân tích chuyên sâu',
description: 'Công cụ phân tích dữ liệu tiên tiến, biểu đồ trực quan giúp đưa ra quyết định kinh doanh chính xác.'
}
];
const products = [
{
title: 'FlowPro Basic',
description: 'Giải pháp cơ bản cho cá nhân và doanh nghiệp nhỏ',
features: [
'Quản lý công việc cơ bản',
'Tích hợp email',
'Lưu trữ 10GB',
'Hỗ trợ kỹ thuật 24/7'
],
imagePrompt: 'A professional software dashboard interface with clean design, showing analytics graphs and task management features, soft blue color palette, minimalist style, high quality 3D rendering, perfect for business application, white background, modern UI design',
imageUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20software%20dashboard%20interface%20with%20clean%20design%2C%20showing%20analytics%20graphs%20and%20task%20management%20features%2C%20soft%20blue%20color%20palette%2C%20minimalist%20style%2C%20high%20quality%203D%20rendering%2C%20perfect%20for%20business%20application%2C%20white%20background%2C%20modern%20UI%20design&width=600&height=400&seq=1&orientation=landscape'
},
{
title: 'FlowPro Enterprise',
description: 'Giải pháp toàn diện cho doanh nghiệp lớn',
features: [
'Quản lý dự án nâng cao',
'Tích hợp đa nền tảng',
'Lưu trữ không giới hạn',
'Bảo mật cấp doanh nghiệp',
'Phân tích dữ liệu chuyên sâu'
],
imagePrompt: 'An enterprise level software solution dashboard showing advanced data visualization, team collaboration features, and security monitoring, with dark blue and white color scheme, professional 3D rendering, corporate aesthetic, clean interface design',
imageUrl: 'https://readdy.ai/api/search-image?query=An%20enterprise%20level%20software%20solution%20dashboard%20showing%20advanced%20data%20visualization%2C%20team%20collaboration%20features%2C%20and%20security%20monitoring%2C%20with%20dark%20blue%20and%20white%20color%20scheme%2C%20professional%203D%20rendering%2C%20corporate%20aesthetic%2C%20clean%20interface%20design&width=600&height=400&seq=2&orientation=landscape'
}
];
const testimonials = [
{
name: 'Nguyễn Văn A',
position: 'Giám đốc Công nghệ, Tech Solutions',
avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20business%20portrait%20with%20neutral%20background%2C%20wearing%20formal%20business%20attire%2C%20confident%20expression%2C%20high%20quality%20professional%20headshot%2C%20studio%20lighting%2C%20corporate%20style%20photograph&width=100&height=100&seq=3&orientation=squarish',
rating: 5,
comment: 'FlowPro đã thay đổi hoàn toàn cách chúng tôi quản lý dự án. Giao diện trực quan, tính năng đa dạng và khả năng tùy biến cao giúp team của tôi nâng cao hiệu suất đáng kể.'
},
{
name: 'Trần Thị B',
position: 'Quản lý Marketing, Brand Vision',
avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20business%20portrait%20with%20neutral%20background%2C%20wearing%20formal%20business%20attire%2C%20confident%20smile%2C%20high%20quality%20professional%20headshot%2C%20studio%20lighting%2C%20corporate%20style%20photograph&width=100&height=100&seq=4&orientation=squarish',
rating: 5,
comment: 'Tôi đặc biệt ấn tượng với khả năng phân tích dữ liệu của FlowPro. Các báo cáo chi tiết giúp chúng tôi đưa ra quyết định marketing chính xác và hiệu quả hơn.'
},
{
name: 'Lê Minh C',
position: 'Chủ doanh nghiệp, Minh Group',
avatar: 'https://readdy.ai/api/search-image?query=Professional%20Vietnamese%20male%20business%20owner%20portrait%20with%20neutral%20background%2C%20wearing%20smart%20casual%20attire%2C%20confident%20and%20approachable%20expression%2C%20high%20quality%20professional%20headshot%2C%20studio%20lighting&width=100&height=100&seq=5&orientation=squarish',
rating: 4,
comment: 'Sau 6 tháng sử dụng FlowPro, hiệu suất làm việc của công ty tôi tăng 30%. Đặc biệt tính năng đồng bộ hóa giúp nhân viên làm việc linh hoạt từ bất kỳ đâu.'
}
];
return (
<div id="top" className="min-h-screen font-sans">
{/* Header */}
<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
<div className="container mx-auto px-6 flex items-center justify-between">
<div className="flex items-center">
<a href="#" className="text-2xl font-bold text-blue-600">
N8N<span className="text-gray-800">Việt</span>
</a>
</div>
<nav className="hidden md:flex items-center space-x-8">
<a
href="#top"
className="text-gray-800 hover:text-blue-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
onClick={(e) => {
e.preventDefault();
window.scrollTo({ top: 0, behavior: 'smooth' });
}}
>
Trang chủ
</a>
<a
href="#products"
className="text-gray-800 hover:text-blue-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
onClick={(e) => {
e.preventDefault();
document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}}
>
Thanh toán
</a>
<a
href="#template-categories"
className="text-gray-800 hover:text-blue-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
onClick={(e) => {
e.preventDefault();
document.querySelector('.py-20.bg-gray-50')?.scrollIntoView({ behavior: 'smooth' });
}}
>
Công cụ
</a>
<a
href="#features"
className="text-gray-800 hover:text-blue-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
onClick={(e) => {
e.preventDefault();
document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
}}
>
Giới thiệu
</a>
<a
href="#contact"
className="text-gray-800 hover:text-blue-600 font-medium transition-colors whitespace-nowrap cursor-pointer"
onClick={(e) => {
e.preventDefault();
document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}}
>
Liên hệ
</a>
</nav>
<div className="flex items-center space-x-4">
<Button
type="primary"
icon={<UserOutlined />}
className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer"
onClick={showLoginModal}
>
Đăng nhập
</Button>
{/* Login Modal */}
<Modal
title="Đăng nhập"
open={isLoginModalVisible}
onCancel={() => setIsLoginModalVisible(false)}
footer={null}
>
<Form
form={loginForm}
onFinish={handleLogin}
layout="vertical"
className="mt-4"
>
<Form.Item
name="username"
rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
>
<Input
id="username_input"
prefix={<UserOutlined />}
placeholder="Tên đăng nhập"
size="large"
/>
</Form.Item>
<Form.Item
name="password"
rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
>
<Input.Password
id="password_input"
prefix={<LockOutlined />}
placeholder="Mật khẩu"
size="large"
/>
</Form.Item>
<Form.Item>
<div className="flex justify-between mb-4">
<Button
type="link"
className="p-0 text-blue-600 hover:text-blue-700"
onClick={() => {
setIsLoginModalVisible(false);
setIsChangePasswordVisible(true);
}}
>
Đổi mật khẩu
</Button>
<Button
type="link"
className="p-0 text-blue-600 hover:text-blue-700"
onClick={() => {
setIsLoginModalVisible(false);
setIsForgotPasswordVisible(true);
}}
>
Quên mật khẩu?
</Button>
</div>
<div>
<div id="login_error" className="text-red-500 mb-3" style={{ display: 'none' }}>
Tên đăng nhập hoặc mật khẩu không đúng!
</div>
<Button 
id="login_button"
type="primary" 
htmlType="submit" 
className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer"
>
Đăng nhập
</Button>
</div>
</Form.Item>
</Form>
</Modal>
<Modal
title="Quên mật khẩu"
open={isForgotPasswordVisible}
onCancel={() => {
setIsForgotPasswordVisible(false);
setIsLoginModalVisible(true);
}}
footer={null}
>
<Form
form={forgotPasswordForm}
onFinish={handleForgotPassword}
layout="vertical"
className="mt-4"
>
<Form.Item
name="email"
rules={[
{ required: true, message: 'Vui lòng nhập email!' },
{ type: 'email', message: 'Email không hợp lệ!' }
]}
>
<Input
prefix={<MailOutlined />}
placeholder="Nhập email của bạn"
size="large"
/>
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit" className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer">
Gửi yêu cầu
</Button>
</Form.Item>
</Form>
</Modal>
<Modal
title="Đổi mật khẩu"
open={isChangePasswordVisible}
onCancel={() => {
setIsChangePasswordVisible(false);
setIsLoginModalVisible(true);
}}
footer={null}
>
<Form
form={changePasswordForm}
onFinish={handleChangePassword}
layout="vertical"
className="mt-4"
>
<Form.Item
name="currentPassword"
rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
>
<Input.Password
prefix={<LockOutlined />}
placeholder="Mật khẩu hiện tại"
size="large"
/>
</Form.Item>
<Form.Item
name="newPassword"
rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
>
<Input.Password
prefix={<LockOutlined />}
placeholder="Mật khẩu mới"
size="large"
/>
</Form.Item>
<Form.Item
name="confirmPassword"
rules={[
{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
({ getFieldValue }) => ({
validator(_, value) {
if (!value || getFieldValue('newPassword') === value) {
return Promise.resolve();
}
return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
},
}),
]}
>
<Input.Password
prefix={<LockOutlined />}
placeholder="Xác nhận mật khẩu mới"
size="large"
/>
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit" className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer">
Đổi mật khẩu
</Button>
</Form.Item>
</Form>
</Modal>
<button className="md:hidden text-gray-800 cursor-pointer">
<i className="fas fa-bars text-xl"></i>
</button>
</div>
</div>
</header>
{/* Hero Section */}
<section className="relative pt-24 pb-20 overflow-hidden" style={{
background: `url('https://readdy.ai/api/search-image?query=Modern%20automation%20workflow%20diagram%20background%20with%20connected%20nodes%20and%20flowing%20data%20streams%2C%20subtle%20technology%20pattern%20overlay%2C%20clean%20professional%20design%20with%20soft%20blue%20gradient%2C%20perfect%20for%20automation%20platform%20hero%20section&width=1440&height=700&seq=6&orientation=landscape') no-repeat center/cover`,
minHeight: '700px'
}}>
<div className="container mx-auto px-6 h-full flex items-center">
<div className="w-full md:w-1/2 text-left z-10">
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
N8N Việt – Kho template <br />
<span className="text-blue-600">quy trình tự động hóa miễn phí</span>
</h1>
<p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
Chúng tôi cung cấp các mẫu sơ đồ tự động hóa phù hợp cho doanh nghiệp Việt Nam – từ quy trình bán hàng, chăm sóc khách hàng đến marketing. Tải về miễn phí – sẵn sàng dùng ngay!
</p>
<div className="flex flex-col sm:flex-row gap-4">
<Button
type="primary"
size="large"
className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-base px-8 cursor-pointer"
onClick={showVpsModal}
>
Đăng ký ngay
</Button>
{/* VPS Subscription Modal */}
<Modal
title="Đăng ký thuê VPS"
open={isVpsModalVisible}
onCancel={() => {
setIsVpsModalVisible(false);
setShowPaymentInfo(false);
}}
footer={null}
width={600}
>
{!showPaymentInfo ? (
<div className="mb-6">
<div className="bg-blue-50 p-6 rounded-lg mb-6">
<h3 className="text-xl font-semibold text-gray-800 mb-4">Gói VPS {selectedPlan.duration}</h3>
<div className="text-3xl font-bold text-blue-600 mb-4">{selectedPlan.monthlyPrice}đ<span className="text-base font-normal text-gray-600">/tháng</span></div>
{selectedPlan.discount > 0 && (
<div className="text-sm text-green-600 mb-4">Tiết kiệm {selectedPlan.discount}%</div>
)}
<div className="text-gray-600 mb-4">Thanh toán: {selectedPlan.totalPrice}đ</div>
<ul className="space-y-2">
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>2 CPU Cores</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>4GB RAM</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>50GB SSD</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Băng thông không giới hạn</span>
</li>
</ul>
</div>
<Form
form={vpsForm}
onFinish={handleVpsSubscribe}
layout="vertical"
>
<Form.Item
name="fullName"
label="Họ và tên"
rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
>
<Input size="large" placeholder="Nhập họ và tên của bạn" />
</Form.Item>
<Form.Item
name="email"
label="Email"
rules={[
{ required: true, message: 'Vui lòng nhập email!' },
{ type: 'email', message: 'Email không hợp lệ!' }
]}
>
<Input size="large" placeholder="Nhập email của bạn" />
</Form.Item>
<Form.Item
name="phone"
label="Số điện thoại"
rules={[
{ required: true, message: 'Vui lòng nhập số điện thoại!' },
{ pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
]}
>
<Input size="large" placeholder="Nhập số điện thoại của bạn" />
</Form.Item>
<Form.Item>
<Button
type="primary"
htmlType="submit"
size="large"
className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer"
>
Đăng ký thuê VPS
</Button>
</Form.Item>
</Form>
</div>
) : (
<div className="payment-info p-6 bg-blue-50 rounded-lg">
<h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Thông tin chuyển khoản</h3>
<div className="flex justify-center mb-6">
<img
src="https://static.readdy.ai/image/b8ee466497754c6c7c37fc0fc27d58f1/b33daefc697757929b38305072a3c50a.png"
alt="Bank QR Code"
className="w-48 h-48 object-contain"
/>
</div>
<div className="space-y-4">
<div className="flex flex-col">
<span className="text-gray-600 font-medium">Số tài khoản:</span>
<span className="text-xl font-bold text-blue-600">19038570543022</span>
</div>
<div className="flex flex-col">
<span className="text-gray-600 font-medium">Ngân hàng:</span>
<span className="text-lg font-semibold">Techcombank</span>
</div>
<div className="flex flex-col">
<span className="text-gray-600 font-medium">Nội dung chuyển khoản:</span>
<span className="text-lg font-semibold">{vpsForm.getFieldValue('phone')}</span>
<span className="text-sm text-gray-500 mt-1">(Vui lòng ghi đúng số điện thoại của bạn)</span>
</div>
<div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
<p className="text-gray-700">
<i className="fas fa-info-circle text-yellow-500 mr-2"></i>
Sau khi chuyển khoản thành công, chúng tôi sẽ kích hoạt VPS của bạn trong vòng 30 phút và gửi thông tin đăng nhập qua email.
</p>
</div>
</div>
<div className="mt-8">
<Button
type="primary"
size="large"
className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer"
onClick={() => setIsVpsModalVisible(false)}
>
Đã hiểu
</Button>
</div>
</div>
)}
</Modal>
<Button
size="large"
className="!rounded-button whitespace-nowrap border-blue-600 text-blue-600 hover:text-blue-700 hover:border-blue-700 text-base cursor-pointer"
>
Nhận 10 mẫu miễn phí
</Button>
</div>
</div>
</div>
</section>
{/* Template Categories Section */}
<section id="template-categories" className="py-20 bg-gray-50">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<div className="inline-flex items-center space-x-2 mb-2">
<i className="fas fa-robot text-blue-600 text-2xl"></i>
<span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">Powered by AI</span>
</div>
<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Danh mục template mẫu</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
Khám phá bộ sưu tập template đa dạng, được tối ưu hóa bởi AI và thiết kế riêng cho doanh nghiệp Việt Nam
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{[
{
icon: 'fa-shopping-cart',
title: 'Quy trình bán hàng',
description: 'Từ thu lead đến chốt đơn trên n8n',
workflows: [
{
name: 'Tự động hóa quy trình bán hàng Shopee',
description: 'Tự động xử lý đơn hàng, cập nhật tồn kho và gửi thông báo cho khách hàng trên Shopee',
downloadCount: 1234,
lastUpdate: '2025-06-30',
youtubeLink: 'https://youtube.com/watch?v=example1',
jsonFile: 'shopee-workflow.json'
},
{
name: 'Quy trình chốt đơn qua Facebook',
description: 'Tự động phản hồi tin nhắn, tạo đơn hàng và gửi thông tin thanh toán cho khách hàng',
downloadCount: 856,
lastUpdate: '2025-07-01',
youtubeLink: 'https://youtube.com/watch?v=example2',
jsonFile: 'facebook-sales.json'
}
]
},
{
icon: 'fa-headset',
title: 'Chăm sóc khách hàng',
description: 'Tự động hóa quy trình CSKH và hỗ trợ',
workflows: [
{
name: 'Tự động phản hồi khách hàng',
description: 'Tự động phân loại và phản hồi các yêu cầu hỗ trợ của khách hàng',
downloadCount: 987,
lastUpdate: '2025-07-02',
youtubeLink: 'https://youtube.com/watch?v=example3',
jsonFile: 'auto-response.json'
}
]
},
{
icon: 'fa-bullhorn',
title: 'Marketing',
description: 'Chiến dịch marketing và nurturing',
workflows: [
{
name: 'Email Marketing Automation',
description: 'Tự động gửi email marketing theo hành vi người dùng',
downloadCount: 2341,
lastUpdate: '2025-07-01',
youtubeLink: 'https://youtube.com/watch?v=example4',
jsonFile: 'email-marketing.json'
}
]
},
{
icon: 'fa-tasks',
title: 'Quản lý dự án',
description: 'Tự động hóa quy trình quản lý task',
workflows: [
{
name: 'Task Management Automation',
description: 'Tự động phân công và theo dõi tiến độ công việc',
downloadCount: 654,
lastUpdate: '2025-06-29',
youtubeLink: 'https://youtube.com/watch?v=example5',
jsonFile: 'task-management.json'
}
]
},
{
icon: 'fa-chart-line',
title: 'Báo cáo & Phân tích',
description: 'Template tổng hợp và phân tích dữ liệu',
workflows: [
{
name: 'Sales Analytics Dashboard',
description: 'Tự động tổng hợp và phân tích dữ liệu bán hàng',
downloadCount: 876,
lastUpdate: '2025-07-02',
youtubeLink: 'https://youtube.com/watch?v=example6',
jsonFile: 'sales-analytics.json'
}
]
},
{
icon: 'fa-cogs',
title: 'Tích hợp hệ thống',
description: 'Kết nối và đồng bộ dữ liệu đa nền tảng',
workflows: [
{
name: 'Data Sync Automation',
description: 'Tự động đồng bộ dữ liệu giữa các hệ thống',
downloadCount: 1432,
lastUpdate: '2025-07-01',
youtubeLink: 'https://youtube.com/watch?v=example7',
jsonFile: 'data-sync.json'
}
]
}
].map((category, index) => (
<div
key={index}
className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100/30 backdrop-blur-sm"
onClick={() => {
Modal.info({
title: category.title,
width: 800,
content: (
<div className="py-4">
{category.workflows.map((workflow, wIndex) => (
<div key={wIndex} className="mb-8 last:mb-0">
<div className="flex items-center justify-between mb-4">
<h3 className="text-xl font-semibold text-gray-800">{workflow.name}</h3>
<div className="flex items-center space-x-4">
<a
onClick={() => {
message.info('Vui lòng đăng nhập để xem hướng dẫn chi tiết');
showLoginModal();
}}
className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
>
<i className="fab fa-youtube text-2xl"></i>
</a>
<a
onClick={() => {
message.info('Vui lòng đăng nhập để tải template');
showLoginModal();
}}
className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
>
<i className="fas fa-download"></i>
<span>Tải về</span>
</a>
</div>
</div>
<p className="text-gray-600 mb-4">{workflow.description}</p>
<div className="flex items-center space-x-6 text-sm text-gray-500">
<span className="flex items-center">
<i className="far fa-clock mr-2"></i>
Cập nhật: {workflow.lastUpdate}
</span>
<span className="flex items-center">
<i className="fas fa-download mr-2"></i>
{workflow.downloadCount.toLocaleString()} lượt tải
</span>
</div>
<Divider className="my-6" />
</div>
))}
</div>
),
className: 'workflow-modal'
});
}}
>
<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
<i className={`fas ${category.icon} text-blue-600 text-2xl`}></i>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
<p className="text-gray-600">{category.description}</p>
</div>
))}
</div>
</div>
</section>
{/* Features Section */}
<section id="features" className="py-20 bg-gray-50">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tính năng nổi bật</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
FlowPro cung cấp các công cụ mạnh mẽ giúp doanh nghiệp của bạn vận hành hiệu quả hơn
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{features.map((feature, index) => (
<div
key={index}
className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center cursor-pointer"
>
<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
<i className={`${feature.icon} text-blue-600 text-2xl`}></i>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
<p className="text-gray-600">{feature.description}</p>
</div>
))}
</div>
</div>
</section>
{/* VPS Packages Section */}
<section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Gói dịch vụ VPS</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
Lựa chọn gói VPS phù hợp với nhu cầu sử dụng của bạn
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{/* 1 Month Plan */}
<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
<div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
Cơ bản
</div>
<div className="text-center mb-8">
<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i className="fas fa-clock text-blue-600 text-2xl"></i>
</div>
<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói 1 tháng</h3>
<div className="text-3xl font-bold text-blue-600 mb-2">199.000đ<span className="text-base font-normal text-gray-500">/tháng</span></div>
<p className="text-gray-600">Thanh toán: 199.000đ</p>
</div>
<ul className="space-y-4 mb-8">
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>2 CPU Cores</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>4GB RAM</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>50GB SSD NVMe</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Băng thông không giới hạn</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Bảo vệ DDoS</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>IP riêng</span>
</li>
</ul>
<Button type="primary" onClick={() => showVpsModal('1month')} className="w-full !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 cursor-pointer">
Đăng ký ngay
</Button>
</div>
{/* 3 Months Plan */}
<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden transform scale-105">
<div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
Tiết kiệm 5%
</div>
<div className="text-center mb-8">
<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i className="fas fa-calendar-alt text-orange-500 text-2xl"></i>
</div>
<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói 3 tháng</h3>
<div className="text-3xl font-bold text-orange-500 mb-2">189.050đ<span className="text-base font-normal text-gray-500">/tháng</span></div>
<p className="text-gray-600">Thanh toán: 567.150đ</p>
</div>
<ul className="space-y-4 mb-8">
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>2 CPU Cores</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>4GB RAM</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>50GB SSD NVMe</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Băng thông không giới hạn</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Bảo vệ DDoS</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>IP riêng</span>
</li>
</ul>
<Button type="primary" onClick={() => showVpsModal('3months')} className="w-full !rounded-button whitespace-nowrap bg-orange-500 hover:bg-orange-600 cursor-pointer">
Đăng ký ngay
</Button>
</div>
{/* 6 Months Plan */}
<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
<div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
Tiết kiệm 10%
</div>
<div className="text-center mb-8">
<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i className="fas fa-calendar-check text-purple-600 text-2xl"></i>
</div>
<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói 6 tháng</h3>
<div className="text-3xl font-bold text-purple-600 mb-2">179.100đ<span className="text-base font-normal text-gray-500">/tháng</span></div>
<p className="text-gray-600">Thanh toán: 1.074.600đ</p>
</div>
<ul className="space-y-4 mb-8">
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>2 CPU Cores</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>4GB RAM</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>50GB SSD NVMe</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Băng thông không giới hạn</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>Bảo vệ DDoS</span>
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
<span>IP riêng</span>
</li>
</ul>
<Button type="primary" onClick={() => showVpsModal('6months')} className="w-full !rounded-button whitespace-nowrap bg-purple-600 hover:bg-purple-700 cursor-pointer">
Đăng ký ngay
</Button>
</div>
</div>
<div className="mt-16 text-center">
<p className="text-gray-600 mb-8">Tất cả các gói VPS đều bao gồm:</p>
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
<div className="flex flex-col items-center">
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
<i className="fas fa-shield-alt text-blue-600"></i>
</div>
<h4 className="font-medium text-gray-800">Bảo mật SSL</h4>
</div>
<div className="flex flex-col items-center">
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
<i className="fas fa-headset text-blue-600"></i>
</div>
<h4 className="font-medium text-gray-800">Hỗ trợ 24/7</h4>
</div>
<div className="flex flex-col items-center">
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
<i className="fas fa-sync text-blue-600"></i>
</div>
<h4 className="font-medium text-gray-800">Backup hàng tuần</h4>
</div>
<div className="flex flex-col items-center">
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
<i className="fas fa-tachometer-alt text-blue-600"></i>
</div>
<h4 className="font-medium text-gray-800">99.9% Uptime</h4>
</div>
</div>
</div>
</div>
</section>
{/* Testimonials Section */}
<section className="py-20 bg-gray-50">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Khách hàng nói gì về chúng tôi</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
Hàng nghìn doanh nghiệp đã tin tưởng và sử dụng FlowPro
</p>
</div>
<div className="relative">
<Swiper
modules={[Pagination, Autoplay, Navigation]}
spaceBetween={30}
slidesPerView={1}
pagination={{ clickable: true }}
autoplay={{ delay: 5000 }}
loop={true}
className="testimonial-swiper"
onSlideChange={(swiper) => setActiveTestimonial(swiper.realIndex)}
>
{testimonials.map((testimonial, index) => (
<SwiperSlide key={index}>
<div className="bg-white rounded-xl p-8 md:p-10 shadow-sm max-w-4xl mx-auto">
<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
<img
src={testimonial.avatar}
alt={testimonial.name}
className="w-20 h-20 rounded-full object-cover"
/>
<div className="flex-1">
<div className="mb-4">
<Rate disabled defaultValue={testimonial.rating} />
</div>
<p className="text-gray-700 text-lg italic mb-6">"{testimonial.comment}"</p>
<div>
<h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
<p className="text-gray-600">{testimonial.position}</p>
</div>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
<div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
<button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
<LeftOutlined />
</button>
</div>
<div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
<button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
<RightOutlined />
</button>
</div>
</div>
</div>
</section>
{/* CTA Section */}
<section className="py-20 bg-blue-600 text-white">
<div className="container mx-auto px-6 text-center">
<h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng nâng cao hiệu suất công việc?</h2>
<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
Khám phá ngay cách FlowPro có thể giúp doanh nghiệp của bạn tối ưu hóa quy trình và tăng năng suất
</p>
<Button
size="large"
className="!rounded-button whitespace-nowrap bg-white text-blue-600 hover:bg-gray-100 border-none text-base px-8 cursor-pointer"
onClick={showVpsModal}
>
Đăng ký ngay
</Button>
</div>
</section>
{/* Contact Section */}
<section id="contact" className="py-20">
<div className="container mx-auto px-6">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
<div>
<h2 className="text-3xl font-bold text-gray-800 mb-6">Liên hệ với chúng tôi</h2>
<p className="text-gray-600 mb-8">
Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào hoặc cần tư vấn về giải pháp phù hợp với doanh nghiệp của bạn.
</p>
<div className="space-y-6">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
<PhoneOutlined className="text-blue-600" />
</div>
<div>
<h4 className="text-lg font-semibold text-gray-800">Điện thoại</h4>
<p className="text-gray-600">0888134448</p>
</div>
</div>
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
<MailOutlined className="text-blue-600" />
</div>
<div>
<h4 className="text-lg font-semibold text-gray-800">Email</h4>
<p className="text-gray-600">hoaithanhaiagent@gmail.com</p>
</div>
</div>
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
<EnvironmentOutlined className="text-blue-600" />
</div>
<div>
<h4 className="text-lg font-semibold text-gray-800">Địa chỉ</h4>
<p className="text-gray-600">Số 3 Dương Đình Nghệ, P. Yên Hòa, Q. Cầu Giấy, Hà Nội</p>
</div>
</div>
</div>
</div>
<div className="bg-white p-8 rounded-xl shadow-sm">
<h3 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
<form className="space-y-6">
<div>
<Input
size="large"
placeholder="Họ và tên"
className="w-full border-gray-300 rounded-lg"
/>
</div>
<div>
<Input
size="large"
placeholder="Email"
className="w-full border-gray-300 rounded-lg"
/>
</div>
<div>
<Input
size="large"
placeholder="Số điện thoại"
className="w-full border-gray-300 rounded-lg"
/>
</div>
<div>
<Input.TextArea
placeholder="Nội dung tin nhắn"
rows={4}
className="w-full border-gray-300 rounded-lg"
/>
</div>
<Button
type="primary"
size="large"
className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 w-full cursor-pointer"
>
Gửi tin nhắn
</Button>
</form>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="bg-gray-900 text-white pt-16 pb-8">
<div className="container mx-auto px-6">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
<div>
<h3 className="text-2xl font-bold mb-6">
N8N<span className="text-blue-400">Việt</span>
</h3>
<p className="text-gray-400 mb-6">
Giải pháp quản lý công việc toàn diện giúp doanh nghiệp của bạn tối ưu hóa quy trình, tiết kiệm thời gian và tăng năng suất.
</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<FacebookOutlined className="text-xl" />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<TwitterOutlined className="text-xl" />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<InstagramOutlined className="text-xl" />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<LinkedinOutlined className="text-xl" />
</a>
</div>
</div>
<div>
<h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
<ul className="space-y-3">
<li>
<a
onClick={(e) => {
e.preventDefault();
window.scrollTo({ top: 0, behavior: 'smooth' });
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Trang chủ
</a>
</li>
<li>
<a
onClick={(e) => {
e.preventDefault();
document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Sản phẩm
</a>
</li>
<li>
<a
onClick={(e) => {
e.preventDefault();
document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Tính năng
</a>
</li>
<li>
<a
onClick={() => setIsVpsModalVisible(true)}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Bảng giá
</a>
</li>
<li>
<a
onClick={(e) => {
e.preventDefault();
document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Liên hệ
</a>
</li>
</ul>
</div>
<div>
<h4 className="text-lg font-semibold mb-6">Hỗ trợ</h4>
<ul className="space-y-3">
<li><a href="#contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Trung tâm hỗ trợ</a></li>
<li>
<a
onClick={() => {
Modal.info({
title: 'Hướng dẫn sử dụng',
width: 800,
content: (
<div className="py-4">
<h3 className="text-xl font-semibold mb-4">Hướng dẫn tổng quan</h3>
<div className="space-y-4">
<div>
<h4 className="font-medium mb-2">1. Đăng ký tài khoản</h4>
<p>Nhấn vào nút "Đăng ký" ở góc phải màn hình và điền thông tin cần thiết</p>
</div>
<div>
<h4 className="font-medium mb-2">2. Chọn gói dịch vụ</h4>
<p>Lựa chọn gói VPS phù hợp với nhu cầu của bạn từ mục Sản phẩm</p>
</div>
<div>
<h4 className="font-medium mb-2">3. Thanh toán</h4>
<p>Thực hiện thanh toán theo hướng dẫn và chờ kích hoạt dịch vụ</p>
</div>
<div>
<h4 className="font-medium mb-2">4. Sử dụng dịch vụ</h4>
<p>Sau khi được kích hoạt, bạn có thể bắt đầu sử dụng các tính năng của VPS</p>
</div>
</div>
</div>
)
});
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Hướng dẫn sử dụng
</a>
</li>
<li>
<a
onClick={() => {
Modal.info({
title: 'Câu hỏi thường gặp',
width: 800,
content: (
<div className="py-4">
<div className="space-y-6">
<div>
<h4 className="font-medium text-lg mb-2">VPS là gì?</h4>
<p>VPS (Virtual Private Server) là một máy chủ ảo riêng biệt, cho phép bạn có toàn quyền kiểm soát và quản lý như một máy chủ vật lý.</p>
</div>
<div>
<h4 className="font-medium text-lg mb-2">Làm thế nào để nâng cấp VPS?</h4>
<p>Bạn có thể dễ dàng nâng cấp VPS bằng cách liên hệ với bộ phận hỗ trợ của chúng tôi. Quá trình nâng cấp sẽ được thực hiện nhanh chóng và không làm gián đoạn dịch vụ.</p>
</div>
<div>
<h4 className="font-medium text-lg mb-2">Chính sách hoàn tiền như thế nào?</h4>
<p>Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày đầu sử dụng nếu bạn không hài lòng với dịch vụ.</p>
</div>
<div>
<h4 className="font-medium text-lg mb-2">Thời gian hỗ trợ kỹ thuật?</h4>
<p>Đội ngũ kỹ thuật của chúng tôi làm việc 24/7 để hỗ trợ bạn mọi lúc khi cần.</p>
</div>
</div>
</div>
)
});
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Câu hỏi thường gặp
</a>
</li>
<li>
<a
onClick={() => {
Modal.info({
title: 'Tham gia cộng đồng Zalo',
width: 400,
content: (
<div className="py-4 text-center">
<img
src="https://static.readdy.ai/image/b8ee466497754c6c7c37fc0fc27d58f1/032813e3a3e939b80a454a3638fa082c.png"
alt="Zalo Group QR Code"
className="mx-auto mb-4"
/>
<p>Quét mã QR hoặc <a href="https://zalo.me/g/rbnuyv818" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">nhấn vào đây</a> để tham gia nhóm Zalo của chúng tôi</p>
</div>
)
});
}}
className="text-gray-400 hover:text-white transition-colors cursor-pointer"
>
Cộng đồng
</a>
</li>
<li><a href="#contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Báo lỗi</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-semibold mb-6">Phương thức thanh toán</h4>
<div className="grid grid-cols-3 gap-4">
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-cc-visa text-2xl"></i>
</div>
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-cc-mastercard text-2xl"></i>
</div>
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-cc-paypal text-2xl"></i>
</div>
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-cc-amex text-2xl"></i>
</div>
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-apple-pay text-2xl"></i>
</div>
<div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg">
<i className="fab fa-google-pay text-2xl"></i>
</div>
</div>
</div>
</div>
<Divider className="border-gray-700" />
<div className="text-center text-gray-500 pt-4">
<p>&copy; {new Date().getFullYear()} N8N Việt. Tất cả các quyền được bảo lưu.</p>
</div>
</div>
</footer>
</div>
);
}
export default App