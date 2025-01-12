import ButtonBrown from '@/components/button/ButtonBrown'
import ImageV2 from '@/components/image/ImageV2'
import { dataReachFar } from '@/types/dataAcfImmigration.interface'

export default function ContentDossierAppraisal({dataDossierAppraisal}: {dataDossierAppraisal: dataReachFar}) {
    return (
        <div className="xsm:px-[1rem] relative z-10 sm:mt-[7.13rem] sm:mr-[11.63rem] space-y-[2.19rem] xsm:space-y-[1.5rem] w-[35.9375rem] xsm:w-full">
            <div className="xsm:mx-auto relative w-[35.37519rem] h-[9.63756rem] xsm:w-[20.125rem] xsm:h-[5.49931rem]">
                <ImageV2
                    className="size-full object-contain"
                    width={566}
                    height={154}
                    alt={dataDossierAppraisal?.logo?.alt}
                    src={dataDossierAppraisal?.logo?.url}
                />
                {/* <p className="absolute bottom-[0.25rem] right-0 font-optima text-[1.375rem] xsm:text-[0.702rem] sm:tracking-[0.02806rem] text-brown leading-[1.3] tracking-[-0.055rem]">
                    Vươn xa với tương lai bền vững
                </p> */}
            </div>
            <p className="body-14 text-greyscaletext-800">
                {dataDossierAppraisal?.describe}
            </p>
            <ButtonBrown
                link={dataDossierAppraisal?.document_appraisal?.url}
                title={dataDossierAppraisal?.document_appraisal?.title}
                target={dataDossierAppraisal?.document_appraisal?.target}
                className="w-max p-[0.5rem_0.75rem_0.5rem_1.5rem]"
            />
        </div>
    )
}