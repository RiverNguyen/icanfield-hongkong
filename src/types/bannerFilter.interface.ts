export interface FilterOption {
    label: string; // Nhãn hiển thị cho bộ lọc
    key: string; // Khóa duy nhất của bộ lọc
    icon: string; // Đường dẫn đến icon đại diện
    selected: string; // Giá trị được chọn mặc định
    children: Array<FilterChild>; // Danh sách các lựa chọn con
  }
  export interface FilterChild {
    label: string; // Nhãn hiển thị cho lựa chọn
    slug: string; // Giá trị slug của lựa chọn
  }