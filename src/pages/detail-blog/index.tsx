import { BannerStatic } from "@/components/banner-static";
import blogBanner from "@/sections/blogs/banner/constants";
import BlogDetail from "@/sections/blogs/detail/BlogDetail";
import RelatedArticles from "@/sections/blogs/detail/RelatedArticles";

export default function IndexDetailBlog() {
  return (
    <>
      <BannerStatic backgroundImage={blogBanner.backgroundImage} />
      <BlogDetail />
      <RelatedArticles />
    </>
  );
}
