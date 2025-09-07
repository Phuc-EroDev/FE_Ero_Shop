# Hướng dẫn Responsive cho FE_Ero_Shop

## Các cải tiến đã thực hiện

1. **Cập nhật HeaderComponent**:
   - Thêm menu di động với Drawer component
   - Điều chỉnh bố cục để phù hợp với màn hình nhỏ
   - Ẩn một số thông tin không cần thiết trên mobile

2. **Cập nhật FooterComponent**:
   - Điều chỉnh bố cục lưới thành 2 cột trên tablet và 1 cột trên mobile
   - Giảm kích thước font và khoảng cách phù hợp

3. **Cập nhật ProductListComponent**:
   - Tối ưu hóa hiển thị sản phẩm trên các kích thước màn hình khác nhau
   - Điều chỉnh phân trang phù hợp với màn hình nhỏ

4. **Cập nhật CardComponent**:
   - Làm cho thẻ sản phẩm responsive với kích thước linh hoạt
   - Điều chỉnh hiển thị hình ảnh và thông tin sản phẩm

5. **Cập nhật TypeProduct**:
   - Tối ưu hóa danh mục sản phẩm cho thiết bị di động
   - Thêm cuộn ngang cho danh mục trên màn hình nhỏ

6. **Cập nhật SliderComponent**:
   - Điều chỉnh kích thước và điều khiển slider phù hợp với mobile

7. **Thêm responsive.css**:
   - Tạo file CSS chung với các utility classes cho responsive
   - Override các component của Ant Design cho phù hợp với mobile

## Hướng dẫn tiếp theo

1. **Trang Chi tiết Sản phẩm**:
   - Điều chỉnh bố cục từ 2 cột sang 1 cột trên màn hình nhỏ
   - Tối ưu hóa gallery hình ảnh sản phẩm
   - Điều chỉnh kích thước nút và thông tin

2. **Trang Giỏ hàng và Thanh toán**:
   - Điều chỉnh bảng sản phẩm để dễ xem trên di động
   - Đơn giản hóa form thanh toán trên màn hình nhỏ

3. **Trang Quản trị**:
   - Thêm responsive cho bảng dữ liệu
   - Tối ưu hóa các biểu đồ thống kê

4. **Kiểm tra Thực tế**:
   - Kiểm tra trên các thiết bị thực tế hoặc sử dụng Developer Tools
   - Sửa các vấn đề hiển thị nếu cần

## Tiêu chuẩn Breakpoints

Dự án sử dụng các breakpoints sau:
- **Desktop**: > 1200px
- **Laptop**: 992px - 1200px
- **Tablet**: 768px - 991px
- **Mobile**: < 768px
- **Mobile nhỏ**: < 576px

## Tài nguyên Tham khảo

- [Ant Design Responsive](https://ant.design/components/grid)
- [Styled Components Media Queries](https://styled-components.com/docs/advanced#media-templates)

## Mẹo

1. Luôn sử dụng đơn vị tương đối (%, em, rem) thay vì px cố định
2. Kiểm tra hiển thị trên các kích thước màn hình khác nhau
3. Sử dụng các utility class từ responsive.css để tránh lặp code
4. Ưu tiên trải nghiệm mobile-first khi phát triển tính năng mới
