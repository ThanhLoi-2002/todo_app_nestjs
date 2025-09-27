# Todo App với NestJS

## Tính năng chính

- **Xác thực người dùng**: Đăng ký, đăng nhập với JWT token.
- **Quản lý người dùng**: Tạo và lấy thông tin người dùng.
- **Quản lý công việc**: Tạo, cập nhật, xóa và lấy danh sách công việc.


## Cài đặt

1. Clone repository này về máy tính.
2. Mở terminal và điều hướng đến thư mục gốc của dự án.
3. Chạy lệnh sau để cài đặt các dependencies:

   ```bash
   npm install
   ```

## Chạy ứng dụng

### Chế độ phát triển

Để chạy ứng dụng trong chế độ phát triển với tính năng watch mode:

```bash
npm run start:dev
```

Ứng dụng sẽ chạy trên `http://localhost:3000` (mặc định).

## API Endpoints

### Auth
- `POST /auth/register` - Đăng ký tài khoản mới
- `POST /auth/login` - Đăng nhập

### User
- `GET /user` - Lấy thông tin người dùng hiện tại

### Todo
- `GET /todo` - Lấy danh sách công việc
- `POST /todo` - Tạo công việc mới
- `PATCH /todo/:id` - Cập nhật công việc
- `DELETE /todo/:id` - Xóa công việc
