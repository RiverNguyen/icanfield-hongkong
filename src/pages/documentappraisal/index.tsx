import { Breadcrumb } from "@/components/breadcrumb";
import { Banner } from "@/sections/detail-settlement-programs/banner";
import FormAppraisal from "@/sections/document-appraisal/FormAppraisal";
import { Taxonomies, dataAppraisal } from "@/types/dataAppraisal.interface";

export default function DocumentAppraisal({data,dataTaxonomies}: {data: dataAppraisal, dataTaxonomies: Taxonomies}) {
    return (
        <main>
            <Banner
                title_line_1={data?.banner_evaluation?.title_line_1}
                title_line_2={data?.banner_evaluation?.title_line_2}
                description={data?.banner_evaluation?.description}
                backgroundOverlay='bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_30%,rgba(240,240,240,0)_64%,rgba(246,246,244,1)_100%)]'
                className='z-20 xsm:rounded-bl-[1.25rem] xsm:rounded-br-[1.25rem]'
                background_pc={data?.banner_evaluation?.images}
            >
                <Breadcrumb
                    items={[
                        {label: 'Trang chủ', href: '/'},
                        {label: 'thẩm định hồ sơ', href: '#'},
                    ]}
                />
            </Banner>
            <FormAppraisal
                dataTaxonomies={dataTaxonomies}
                otherInformation={data?.filter_value}
            />
        </main>
    )
}