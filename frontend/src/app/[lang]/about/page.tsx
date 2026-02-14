import Link from 'next/link';
import { fetchCompanyInfo } from '../utils/tea-api';
import { getStrapiMedia } from '../utils/api-helpers';

export default async function AboutPage() {
  try {
    const companyInfo = await fetchCompanyInfo();

    return (
      <div className="flex flex-col">
        {/* Page Header */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">
              关于{companyInfo.attributes.companyName}
            </h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              {companyInfo.attributes.slogan}
            </p>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">公司简介</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: companyInfo.attributes.introduction }}
              />
            </div>
          </div>
        </section>

        {/* Company History */}
        {companyInfo.attributes.history && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">公司历史</h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: companyInfo.attributes.history }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Company Culture */}
        {companyInfo.attributes.culture && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">企业文化</h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: companyInfo.attributes.culture }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Company Images */}
        {companyInfo.attributes.images?.data && companyInfo.attributes.images.data.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">公司风采</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {companyInfo.attributes.images.data.map((image) => (
                  <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={getStrapiMedia(image.attributes.url) || ''}
                      alt={image.attributes.alternativeText || '公司图片'}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">想要了解更多？</h2>
            <p className="text-xl mb-8">欢迎联系我们或访问我们的在线商城</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                联系我们
              </Link>
              <Link
                href={companyInfo.attributes.shopUrl}
                target="_blank"
                className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition font-medium border-2 border-white"
              >
                进入商城
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading about page:', error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">加载失败</h1>
        <p className="text-gray-600">请确保后端服务正在运行</p>
      </div>
    );
  }
}
