import ImageV2 from '@/components/image/ImageV2'
import CF7Request from '@/fetch/cf7Request'
import {IPropsPopup} from '@/layout/header'
import React, {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'

interface FormData {
  fullName: string
  phone: string
  email: string
  programs: string
  message: string
}

const PopupForm: React.FC<{dataPopup: IPropsPopup}> = ({dataPopup}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (!dataPopup || !dataPopup.setting) return

    const currentPath = window.location.pathname.trim()

    const matchedPage = dataPopup.setting.find((item) => {
      if (!item.slug || !item.show_popup) return false

      const slug = item.slug.trim()
      // Xử lý slug động (ví dụ: /tin-tuc/${slug} hoặc /${nation}/${slug})
      if (slug.includes('${')) {
        // Chuyển slug thành regex
        const regexPattern = slug
          .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape ký tự đặc biệt
          .replace(/\${[^}]+}/g, '[^/]+') // Thay ${...} bằng regex khớp bất kỳ
        const regex = new RegExp(`^${regexPattern}$`)
        return regex.test(currentPath)
      }

      // So sánh slug tĩnh
      return slug === currentPath
    })

    if (matchedPage) {
      const rawTime = matchedPage.time_show?.toString().trim()
      const time = parseInt(rawTime, 10)

      if (!isNaN(time) && time > 0) {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, time * 1000)

        return () => clearTimeout(timer) // Cleanup timer
      } else {
        console.warn(
          '⚠️ time_show không hợp lệ hoặc bằng 0, không hiển thị popup.',
        )
        setIsOpen(false) // Không hiển thị nếu time_show lỗi hoặc = 0
      }
    } else {
      setIsOpen(false) // Không có matchedPage, đảm bảo popup không hiển thị
    }
  }, [dataPopup, pathname])

  const [isLoading, setIsLoading] = useState(false)
  const [showStatusPopup, setShowStatusPopup] = useState<
    'success' | 'error' | null
  >(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    programs: '',
    message: '',
  })

  useEffect(() => {
    if (showStatusPopup) {
      const timer = setTimeout(() => {
        setShowStatusPopup(null)
        setIsOpen(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showStatusPopup])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự'
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Email không hợp lệ'
    }

    // Validate programs
    if (!formData.programs.trim()) {
      newErrors.programs = 'Vui lòng chọn chương trình quan tâm'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form trước khi submit
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const request = new CF7Request({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        programs: formData.programs,
        message: formData.message,
      })

      const response = await request.send({
        id: '5420',
        unitTag: 'def4957',
      })

      if (response?.status === 'mail_sent') {
        setShowStatusPopup('success')
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          programs: '',
          message: '',
        })
        setErrors({}) // Clear errors khi thành công
      } else {
        setShowStatusPopup('error')
      }
    } catch {
      setShowStatusPopup('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => setIsOpen(false)

  const programsList = [
    'Chương trình định cư Châu Âu',
    'Chương trình định cư Canada',
    'Chương trình định cư Mỹ',
    'Chương trình định cư Úc',
    'Chương trình định cư Quốc tịch Caribe',
  ]

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 sm:p-6'>
          <div className='absolute h-full w-full'></div>
          <div className='relative flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-in-out sm:flex-row'>
            {/* Status Popup */}
            {showStatusPopup && (
              <div className='fixed inset-0 z-[52] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300'>
                <div
                  className={`animate-popup w-full max-w-sm rounded-2xl px-8 py-6 text-center text-white shadow-2xl ${
                    showStatusPopup === 'success'
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }`}
                >
                  <p className='mb-1 text-xl font-semibold'>
                    {showStatusPopup === 'success'
                      ? 'Đăng ký thành công'
                      : 'Đăng ký thất bại'}
                  </p>
                  <p className='text-sm opacity-90'>
                    {showStatusPopup === 'success'
                      ? 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.'
                      : 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'}
                  </p>
                </div>
              </div>
            )}

            {/* Banner */}
            <div className='hidden w-1/2 sm:block'>
              <ImageV2
                src={
                  dataPopup?.image_form_all?.url || '/images/popup-banner.jpg'
                }
                alt='Popup Banner'
                width={500}
                height={300}
                className='h-full w-full object-cover'
              />
            </div>

            {/* Form */}
            <div className='w-full px-6 py-8 sm:w-1/2 sm:px-8 sm:py-10'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-brown'>
                  Đăng Ký Tư Vấn
                </h2>
                <button
                  onClick={handleClose}
                  className='text-2xl font-bold text-gray-400 transition hover:text-brown'
                >
                  ×
                </button>
              </div>
              <p className='mb-6 text-sm text-brown'>
                Điền thông tin để được tư vấn chi tiết về các chương trình định
                cư.
              </p>

              <form
                onSubmit={handleSubmit}
                className='space-y-4'
              >
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Họ tên'
                  className={`w-full rounded-xl border px-4 py-2 text-sm text-brown placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className='text- text-sm'>{errors.fullName}</p>
                )}

                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Số điện thoại'
                  className={`w-full rounded-xl border px-4 py-2 text-sm text-brown placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  required
                />
                {errors.phone && (
                  <p className='text-sm text-red-500'>{errors.phone}</p>
                )}

                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className={`w-full rounded-xl border px-4 py-2 text-sm text-brown placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  required
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email}</p>
                )}

                <div className='space-y-3'>
                  <p className='text-sm font-medium text-brown'>
                    Chương trình quan tâm:
                  </p>
                  <div className='relative'>
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                        errors.programs
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    >
                      <span
                        className={
                          formData.programs ? 'text-brown' : 'text-gray-400'
                        }
                      >
                        {formData.programs || 'Chọn chương trình quan tâm'}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className='absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-lg'>
                        {programsList.map((program, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                programs: program,
                              }))
                              setIsDropdownOpen(false)
                              // Clear error khi chọn
                              if (errors.programs) {
                                setErrors((prev) => ({...prev, programs: ''}))
                              }
                            }}
                            className='cursor-pointer px-4 py-2 text-sm text-brown first:rounded-t-xl last:rounded-b-xl hover:bg-gray-100'
                          >
                            {program}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.programs && (
                    <p className='text-sm text-red-500'>{errors.programs}</p>
                  )}
                </div>

                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Lời nhắn (không bắt buộc)'
                  className='w-full resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm text-brown placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
                  rows={3}
                />

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full rounded-lg bg-[linear-gradient(90deg,#95502F_-4.54%,#F5C178_95.42%)] py-2 text-base font-semibold text-white transition hover:bg-[linear-gradient(90deg,#95502F_-4.54%,#F5C178_95.42%)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='mr-2 h-5 w-5 animate-spin'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    'Gửi Đăng Ký'
                  )}
                </button>
              </form>

              <button
                onClick={handleClose}
                className='mt-4 w-full text-center text-sm text-brown underline hover:text-primary-brown'
              >
                Đóng popup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupForm
