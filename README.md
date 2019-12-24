# Smart Iot Eco Documentation
 
## Thử nghiệm bản thử nghiệm tại [DEMO](http://54.237.117.36)

## Mục lục
1. Tổng quan
2. Các tính năng chính
    * [Room Status](#room-status)
    * [Weather Forecast](#weather-forecast)
    * [Account Manager](#account-manager)
    * [Others](#others)

##  Tổng quan
Dự án này mô tả phần mềm Smart IoT Eco - phần mềm quản lý số liệu quan trắc môi trường dành cho các phòng nghiên cứu, trạm quan trắc môi trường, nhà ở của người dân. Người dùng sử dụng phần mềm trên web để phục vụ việc xem thông tin về các chỉ số quan trắc môi trường như nhiệt độ, độ ẩm, AQI,... trong phòng ở hoặc môi trường cần quan trắc. Dữ liệu được gửi về từ hệ thống cảm biến, có thể mở rộng khả năng quan trắc thông qua việc tăng số lượng cảm biến lên. 

Phần mềm giúp việc quản lý các số liệu quan trắc môi trường trong phòng ở hoặc vườn cây trồng...trở nên tiện lợi và thông minh với việc tích hợp hệ thống cảnh báo tuỳ biến theo bối cảnh và nhu cầu của người dùng (ví dụ: Nếu đặt trong nhà ở thì sẽ cảnh báo nhiệt độ để chủ động mặc thêm áo, Nếu đặt trong vườn cây trồng thì sẽ cảnh báo độ ẩm để tưới nước,...). Điều này giúp chủ căn phòng có hành động phù hợp với điều kiện của căn phòng.

## Các tính năng chính

### Room Status
![image](https://i.imgur.com/aDG5l75.png)
Đây là trang chính khi bạn truy cập vào hệ thống. Giúp bạn quan sát được các thông số AQI, Nhiệt độ, Độ ẩm của phòng thông qua cảm biến và biểu đồ thống kê các chỉ sổ.

### Weather Forecast
![image](https://i.imgur.com/OoEudKr.png)
Cho phép người dùng xem dự báo thời tiết tại một thành phố bất kì trên bản đồ Google Maps.
![image](https://i.imgur.com/Gjpf06Y.png)
Sau khi chọn thành phố và nhấn Search. Bạn có thể xem thông tin chi tiết về thời tiết tại thành phố đó theo từng giờ.

### Account Manager
![image](https://i.imgur.com/AOfCwG6.png)
Chức năng chỉ dành cho tài khoản mang quyền admin, có thể thêm, sửa, xóa, chặn, bỏ chặn một tài khoản người dùng.

### Others
Ngoài ra còn các chức năng khác bạn có thể trải nghiệm thông qua bản Demo.

### Reference component
- ApexCharts : https://github.com/apexcharts/react-apexcharts
