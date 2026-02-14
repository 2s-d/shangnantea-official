import Link from 'next/link';
import { fetchHomePageData } from './utils/tea-api';
import { getStrapiMedia } from './utils/api-helpers';

export default async function HomePage({ params }: { params: { lang: string } }) {
  try {
    const { companyInfo, featuredProducts, latestArticles, global } = await fetchHomePageData();

    return (
      <div className="flex flex-col">
        {/* 首页专属背景 */}
        <div className="home-bg-image"></div>
        <div className="home-bg-overlay"></div>
        
        {/* Hero Section - 优化背景和视觉效果 */}
        <section className="relative py-24 overflow-hidden bg-transparent">
          {/* 装饰性背景元素 - 移除，使用全局背景 */}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                ✨ 传承千年茶文化
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {companyInfo.attributes.companyName}
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 mb-10 font-light">
                {companyInfo.attributes.slogan}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href={companyInfo.attributes.shopUrl}
                  target="_blank"
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-lg"
                >
                  <span className="flex items-center gap-2">
                    进入商城
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="bg-white text-green-700 px-10 py-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-lg"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Company Introduction - 优化布局和视觉 */}
        <section className="py-20 bg-white/70 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gray-900">关于商南茶城</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full"></div>
              </div>
              <div 
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-center"
                dangerouslySetInnerHTML={{ 
                  __html: companyInfo.attributes.introduction?.substring(0, 300) + '...' 
                }}
              />
              <div className="text-center mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-lg group"
                >
                  查看详情
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products - 优化卡片设计 */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gray-900">精选茶叶</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.attributes.slug}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {product.attributes.image?.data && (
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      <img
                        src={getStrapiMedia(product.attributes.image.data.attributes.url) || ''}
                        alt={product.attributes.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">{product.attributes.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.attributes.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes.features?.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full border border-green-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-lg"
              >
                查看全部产品
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">茶文化</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.attributes.category.data.attributes.slug}/${article.attributes.slug}`}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {article.attributes.cover?.data && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getStrapiMedia(article.attributes.cover.data.attributes.url) || ''}
                        alt={article.attributes.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-green-600 mb-2">
                      {article.attributes.category.data.attributes.name}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{article.attributes.title}</h3>
                    <p className="text-gray-600">{article.attributes.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="text-green-600 hover:text-green-700 font-medium text-lg"
              >
                查看更多文章 →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">想要购买我们的茶叶？</h2>
            <p className="text-xl mb-8">访问我们的在线商城，享受优质茶叶</p>
            <Link
              href={companyInfo.attributes.shopUrl}
              target="_blank"
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block font-medium"
            >
              进入商城购买
            </Link>
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    console.error('Error loading home page:', error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">加载失败</h1>
        <p className="text-gray-600">请确保后端服务正在运行</p>
      </div>
    );
  }
}
