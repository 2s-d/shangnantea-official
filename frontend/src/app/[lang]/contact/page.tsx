import { fetchCompanyInfo } from '../utils/tea-api';

export default async function ContactPage() {
  const companyInfo = await fetchCompanyInfo();
  const company = companyInfo.attributes;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">联系我们</h1>
          <p className="text-gray-600">欢迎联系{company.companyName}，我们期待为您服务</p>
        </div>

        {/* 联系信息卡片 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 联系方式 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">电话</p>
                  <p className="text-gray-600">{company.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">邮箱</p>
                  <p className="text-gray-600">{company.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">地址</p>
                  <p className="text-gray-600">{company.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">营业时间</p>
                  <p className="text-gray-600">{company.businessHours}</p>
                </div>
              </div>

              {company.wechat && (
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01.18-.557c1.527-1.123 2.5-2.738 2.5-4.514 0-3.039-2.774-5.569-6.062-5.569zm-3.753 4.28c.72 0 1.304.6 1.304 1.338a1.32 1.32 0 01-1.304 1.337 1.32 1.32 0 01-1.304-1.337c0-.738.584-1.339 1.304-1.339zm6.506 0c.72 0 1.304.6 1.304 1.338a1.32 1.32 0 01-1.304 1.337 1.32 1.32 0 01-1.304-1.337c0-.738.584-1.339 1.304-1.339z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">微信</p>
                    <p className="text-gray-600">{company.wechat}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 在线商城 */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">访问在线商城</h2>
            <p className="text-gray-700 mb-6">
              欢迎访问我们的在线商城，浏览更多茶叶产品，享受便捷的在线购物体验。
            </p>
            <a
              href={company.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              前往商城
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
