import {z} from 'zod'

export function buildFormSchema(t: (arg: string) => string) {
  return z.object({
    username: z.string().min(2, {
      message: t('truong_nay_it_nhat_phai_co_2_ky_tu'),
    }),
    email: z
      .string({
        required_error: t('vui_long_nhap_email'),
      })
      .email({message: t('email_khong_hop_le')}),
    callingcode: z.string().optional(),
    phone: z
      .string({
        required_error: t('truong_nay_khong_duoc_de_trong'),
      })
      .regex(/^\d{4,20}$/, {message: t('dinh_dang_khong_hop_le')}),
    location: z.string().optional(),
    nation: z.string().optional(),
    educationlevel: z.string({
      required_error: t('vui_long_chon_truong_nay'),
    }),
    languageproficiencytype: z.enum(['none', 'basic', 'certificate'], {
      required_error: t('vui_long_chon_truong_nay'),
    }),
    languageproficiency: z.string().optional(),
    languageproficiency_score: z.string().nullable().optional(),
    languageproficiency_effective_from: z.string().optional(),
    visapurpose: z.string({
      required_error: t('vui_long_chon_truong_nay'),
    }),
    managementexperience: z.preprocess((val) => {
      if (typeof val === 'string') {
        const s = val.trim()
        if (s === '') return undefined
        const n = Number(s)
        return Number.isNaN(n) ? val : n
      }
      return val
    }, z.number().optional()),
  })
}

export type FormSchema = ReturnType<typeof buildFormSchema>
