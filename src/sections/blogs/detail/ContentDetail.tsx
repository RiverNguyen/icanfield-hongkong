const fakeContent = `
  <h2>Phần Tiêu Đề 1</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci ac arcu cursus consectetur non vitae nulla. Phasellus in lacus eget nunc posuere vehicula.</p>
  <ul>
    <li>Điểm nổi bật 1</li>
    <li>Điểm nổi bật 2</li>
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
`
const addIdsToH2Tags = (htmlString: string) => {
  let index = 1
  return htmlString.replace(/<h2[^>]*>/g, (match) => {
    return `${match.slice(0, -1)} id="section-${index++}">`
  })
}
export default function ContentDetail() {
  const htmlWithIds = addIdsToH2Tags(fakeContent)
  return (
    <div className='w-[58.3125rem]'>
      <h1 className='font-optima text-orangetext-900 text-[2rem] font-semibold leading-[1.3] tracking-[-0.02rem]'>
        Chương trình thẻ thường trú nhân Malta (MPRP) sẽ tăng phí từ ngày
        01/01/2025 – Những điều nhà đầu tư cần biết
      </h1>
      <div
        className='flex-1 [&_h2]:mb-[1000px]'
        dangerouslySetInnerHTML={{__html: htmlWithIds}}
      ></div>
      <div className="h-[0.0625rem] w-full bg-[rgba(0,0,0,0.04)] my-[1.5rem]"></div>
      <p className="text-end w-full text-orangetext-900 body16-s">Đăng bởi Admin</p>
    </div>
  )
}
