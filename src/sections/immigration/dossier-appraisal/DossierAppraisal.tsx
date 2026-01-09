import ImageV2 from '@/components/image/ImageV2'
import ContentDossierAppraisal from '@/sections/immigration/dossier-appraisal/ContentDossierAppraisal'
import { dataReachFar } from '@/types/dataAcfImmigration.interface'

export default function DossierAppraisal({dataDossierAppraisal}: {dataDossierAppraisal: dataReachFar}) {
  return (
    <section className="xsm:mt-[3.12rem] flex xsm:flex-col-reverse h-[100vh] xsm:h-max relative bg-[linear-gradient(180deg,#F6F6F4_0%,#FAF8F1_100%)]">
      <div className="relative w-[57rem] h-full xsm:w-full xsm:h-[25.13513rem]">
        <ImageV2
          alt=""
          width={912}
          height={825}
          src={'/imgs/homepage/section-ketnoi/banner-formlh.webp'}
          className="xsm:hidden absolute sm:bottom-[-12.75rem] xsm:bottom-[-5rem] w-[57rem] h-[51.5625rem] xsm:w-full xsm:h-[25.13513rem] object-contain"
        />
        <ImageV2
          alt=""
          width={912}
          height={825}
          src={'/imgs/immigration/dossier-appraisal/bg-mbv2.webp'}
          className="sm:hidden absolute xsm:bottom-[-5rem] xsm:w-full xsm:h-[25.13513rem]"
        />
      </div>
      <ImageV2
        alt=""
        width={912}
        height={825}
        src={'/imgs/homepage/section-ketnoi/bg-sectionform.png'}
        className="absolute right-0 top-[-4rem] xsm:top-[10rem] h-[44rem] xsm:h-[29.22088rem] w-[81.5rem] object-cover"
      />
      <ContentDossierAppraisal dataDossierAppraisal={dataDossierAppraisal} />
    </section>
  )
}
