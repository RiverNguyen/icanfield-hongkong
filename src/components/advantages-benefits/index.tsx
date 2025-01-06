import ImageV2 from '@/components/image/ImageV2'
import {Media} from '@/types/image.interface'
import {FC} from 'react'

interface IAdvantagesBenefitsProps {
  subtitle: string
  title: string
  description: string
  backgroundPc: Media
  backgroundMb: Media
  items: IAdvantagesBenefitsItem[]
}

export const AdvantagesBenefits: FC<IAdvantagesBenefitsProps> = ({
  title,
  subtitle,
  description,
  backgroundPc,
  backgroundMb,
  items,
}) => {
  return (
    <section>
      <div>
        <span>{subtitle}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <div>
          <ImageV2
            src={backgroundPc.url}
            alt={backgroundPc.alt}
            width={backgroundPc.width}
            height={backgroundPc.height}
          />
          <ImageV2
            src={backgroundMb.url}
            alt={backgroundMb.alt}
            width={backgroundMb.width}
            height={backgroundMb.height}
          />
        </div>
        <div>
          {items.map((item, index) => (
            <AdvantagesBenefitsItem
              {...item}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface IAdvantagesBenefitsItem {
  title: string
  content: string
  image: Media
}
interface IAdvantagesBenefitsItemProps extends IAdvantagesBenefitsItem {
  className?: string
}
export const AdvantagesBenefitsItem: FC<IAdvantagesBenefitsItemProps> = ({
  title,
  content,
  image,
  className,
}) => {
  return (
    <div className={className}>
      <ImageV2
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
      />
      <div>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
    </div>
  )
}
