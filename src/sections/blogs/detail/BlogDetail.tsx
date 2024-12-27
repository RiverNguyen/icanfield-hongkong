import AsideDetail from '@/sections/blogs/detail/AsideDetail'
import ContentDetail from '@/sections/blogs/detail/ContentDetail'
const fakeContent = `
  <strong>Chương trình thẻ thường trú nhân Malta (Malta Permanent Residence Programme - MPRP) là một trong những lựa chọn đầu tư định cư được quan tâm nhất tại châu Âu. Tuy nhiên, từ ngày 01/01/2025, mức phí tham gia chương trình này sẽ có sự điều chỉnh tăng đáng kể.</strong>
  <img src="/imgs/about-us/banner/d-name-icanfield.png" />
  <h2>Lý do thay đổi chính sách</h2>
  <p>Trong bối cảnh các chương trình định cư tại Châu Âu ngày càng cạnh tranh, Malta muốn cải thiện tính hấp dẫn của chương trình Thẻ thường trú nhân nhằm thu hút các nhà đầu tư quốc tế có tiềm lực tài chính vững mạnh. Ngoài ra, Chính phủ cũng đặt mục tiêu nâng cao chất lượng hồ sơ, đảm bảo rằng chương trình mang lại giá trị kinh tế lâu dài và duy trì tính bền vững về xã hội. Những thay đổi lần này còn giúp chương trình đáp ứng các tiêu chuẩn quốc tế ngày một khắt khe, đặc biệt trong việc sàng lọc hồ sơ và quản lý tài chính.
  Những thông tin dưới đây sẽ giúp Quý khách hàng hiểu rõ các thay đổi, đồng thời hướng dẫn cách tận dụng lợi ích tối đa trước khi chính sách mới có hiệu lực.</p>
  <ul>
    <li>Các yêu cầu đơn giản hơn, giúp giảm bớt áp lực chuẩn bị hồ sơ.</li>
    <li>Mức phí thấp hơn, phù hợp hơn với kế hoạch tài chính. </li>
    <li>Điểm nổi bật 3</li>
  </ul>

  <h2>Phần Tiêu Đề 2</h2>
  <p>Nunc scelerisque, nulla in sagittis luctus, felis velit hendrerit risus, a eleifend libero augue id augue. Vestibulum quis diam vel ligula congue vestibulum.</p>
  <blockquote>
    "Một câu nói nổi bật ở đây, nhấn mạnh ý tưởng quan trọng."
  </blockquote>

  <h2>Phần Tiêu Đề 3</h2>
  <p>Praesent malesuada, sem vitae fermentum vehicula, nisi ex bibendum elit, a consectetur lorem est in sapien. Sed lacinia mauris nec elit efficitur vehicula.</p>
  <ol>
    <li>Bước 1: Lorem ipsum dolor sit amet.</li>
    <li>Bước 2: Praesent malesuada sem vitae.</li>
    <li>Bước 3: Sed lacinia mauris nec elit.</li>
  </ol>
`;
export default function BlogDetail() {
  return (
    <section className='mb-[6.31rem] mt-[5rem] xsm:pt-[3rem] flex xsm:flex-col sm:space-x-[3.75rem] section-container pt-[7rem]'>
      <AsideDetail dataContent={fakeContent} />
      <ContentDetail dataContent={fakeContent} />
    </section>
  )
}
