import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTeaProductBySlug, fetchRelatedTeaProducts, fetchCompanyInfo } from '../../utils/tea-api';
import { getStrapiMedia } from '../../utils/api-helpers';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const product = await fetchTeaProductBySlug(params.slug);
    
    if (!product) {
      notFound();
    }

    const [relatedProducts, companyInfo] = await Promise.all([
      fetchRelatedTeaProducts(product.attributes.category, product.attributes.slug),
      fetchCompanyInfo(),
    ]);

    return (
      <div className="flex flex-col">
        {/* Product Detail */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Product Images */}
              <div>
                {product.attributes.image?.data && (
                  <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                    <img
                      src={getStrapiMedia(product.attributes.image.data.attributes.url) || ''}
                      alt={product.attributes.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                {/* Gallery */}
                {product.attributes.gallery?.data && product.attributes.gallery.data.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {product.attributes.gallery.data.map((image) => (
                      <div key={image.id} className="rounded-lg overflow-hidden shadow">
                        <img
                          src={getStrapiMedia(image.attributes.url) || ''}
                          alt={product.attributes.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.attributes.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4">{product.attributes.name}</h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {product.attributes.shortDescription}
                </p>

                <div className="border-t border-b border-gray-200 py-6 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 block mb-1">茶叶种类</span>
                      <span className="font-medium">{product.attributes.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">产地</span>
                      <span className="font-medium">{product.attributes.origin}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {product.attributes.features && product.attributes.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-3">产品特点</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 px-4 py-2 rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={companyInfo.attributes.shopUrl}
                  target="_blank"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition inline-block font-medium text-lg w-full text-center"
                >
                  进入商城购买
                </Link>
              </div>
            </div>

            {/* Product Description */}
            {product.attributes.description && (
              <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-bold mb-6">产品详情</h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.attributes.description }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">相关产品</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.attributes.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    {relatedProduct.attributes.image?.data && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getStrapiMedia(relatedProduct.attributes.image.data.attributes.url) || ''}
                          alt={relatedProduct.attributes.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{relatedProduct.attributes.name}</h3>
                      <p className="text-gray-600">{relatedProduct.attributes.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">加载失败</h1>
        <p className="text-gray-600">请确保后端服务正在运行</p>
      </div>
    );
  }
}
