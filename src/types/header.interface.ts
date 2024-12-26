export interface LanguageOption {
  value: string
  label: string
  text: string
  flagUrl: string
}
export interface MenuItem {
  title: string
  href: string
  imgUrl?: string // Dùng dấu ? để biểu thị rằng thuộc tính này là tùy chọn
  children?: MenuItem[] // Nếu menu có con, nó cũng sẽ có cấu trúc giống `MenuItem`
}
export interface SocialNetwork {
  title: string
  link: string
  icon: string
}
export interface PostOutstanding {
  title: string;
  href: string;
}
export interface TopHeaderItem {
  title: string;
  linkIcon: string;
  href: string;
}
