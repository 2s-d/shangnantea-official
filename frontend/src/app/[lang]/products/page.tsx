import Link from 'next/link';
import { fetchTeaProducts, fetchCompanyInfo } from '../utils/tea-api';
import { getStrapiMedia } from '../utils/api-helpers';

export default async function ProductsPage() {
  try {
    const [products, companyInfo] = await Promise.all([
      fetchTeaProducts(),
      fetchCompanyInfo(),
    ]);

    return (
      <div className="flex flex-col min-h-screen">
        {/* Page Header */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">我们的茶叶产品</h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              精选商南高山茶叶，传承千年制茶工艺
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 flex-grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.attributes.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  {product.attributes.image?.data && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getStrapiMedia(product.attributes.image.data.attributes.url) || ''}
                        alt={product.attributes.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        {product.attributes.category}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.attributes.name}</h3>
                    <p className="text-gray-600 mb-4">{product.attributes.shortDescription}</p>
                    
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">产地：</span>
                      <span className="text-sm font-medium">{product.attributes.origin}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.attributes.features?.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 text-green-600 font-medium group-hover:text-green-700">
                      查看详情 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">暂无产品</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">想要购买？</h2>
            <p className="text-xl text-gray-600 mb-8">
              访问我们的在线商城，立即下单购买
            </p>
            <Link
              href={companyInfo.attributes.shopUrl}
              target="_blank"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition inline-block font-medium"
            >
              进入商城
            </Link>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">加载失败</h1>
        <p className="text-gray-600">请确保后端服务正在运行</p>
      </div>
    );
  }
}
