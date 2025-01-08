import IConSeeMore from "@/components/icon/IConSeeMore";
import ImageV2 from "@/components/image/ImageV2";
import IndexSortAndSearchPosts from "@/sections/blogs/list-blogs/sort-and-search";
import ItemProgramme from "@/sections/immigration/programme/ItemProgramme";
import './style.css'

export default function Programme() {
    return (
        <section className="w-full relative sm:pt-[7.75rem] mt-[5rem]">
            <div className='w-full sm:sticky sm:top-[100vh] xsm:relative'>
                <ImageV2
                    className='absolute left-0 h-[100vh] w-full sm:top-[-100vh] xsm:top-0 xsm:hidden'
                    width={1600}
                    height={788}
                    alt=''
                    src={'/imgs/immigration/programme/d-bg-programmeV2.webp'}
                />
            </div>
            <div className="xsm:w-full relative z-10 section-container flex xsm:flex-col sm:items-start sm:space-x-[6.19rem]">
                <div className="sticky top-[7.75rem] xsm:w-full w-[23.9375rem] space-y-[2.5rem]">
                    <h2 className="heading1 font-optima font-semibold text-orangetext-900">
                        Các Chương Trình Định Cư Canada
                    </h2>
                    {/* <IndexSortAndSearchPosts
                        sortOptions={sortOptions}
                        search={search}
                        selectedSortOption={selectedSortOption}
                        setSearch={setSearch}
                        setSelectedSortOption={setSelectedSortOption}
                    /> */}
                </div>
                <div className="flex-1 xsm:w-full flex flex-col items-center pb-[9.5rem] xsm:pb-[2.5rem]">
                    <div className="w-full grid grid-cols-2 xsm:grid-cols-1 gap-[1.5rem] pb-[12.59rem] xsm:pb-[2rem]">
                        {new Array(10).fill(0).map((e, index) => (
                            <ItemProgramme
                                key={index} 
                                className="sm:even:translate-y-[7.5rem]" 
                            />
                        ))}
                    </div>
                    <div className="flex items-center space-x-[1.12rem] cursor-pointer">
                        <IConSeeMore className="object-contain size-[1.375rem] up-down" />
                        <p className="body-14 text-brown">XEM THÊM</p>
                    </div>
                </div>
            </div>
        </section>
    )
}