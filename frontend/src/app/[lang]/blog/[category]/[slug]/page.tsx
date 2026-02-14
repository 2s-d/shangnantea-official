import { fetchArticleBySlug, fetchRelatedArticles, fetchCategories } from '@/app/[lang]/utils/tea-api';
import { getStrapiMedia } from '@/app/[lang]/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await fetchArticleBySlug(params.slug);
    
    if (!article) {
        return {
            title: '文章未找到',
            description: '该文章不存在或已被删除',
        };
    }

    return {
        title: article.attributes.title,
        description: article.attributes.description,
    };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string; category: string } }) {
    // 确保参数存在
    if (!params.slug) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-700">文章未找到</h2>
                <p className="text-gray-600 mt-4">无效的文章链接</p>
                <Link href="/blog" className="text-green-600 hover:underline mt-4 inline-block">
                    返回文章列表
                </Link>
            </div>
        );
    }

    const article = await fetchArticleBySlug(params.slug);
    
    if (!article) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-700">文章未找到</h2>
                <p className="text-gray-600 mt-4">该文章不存在或已被删除</p>
                <Link href="/blog" className="text-green-600 hover:underline mt-4 inline-block">
                    返回文章列表
                </Link>
            </div>
        );
    }

    // 安全地获取分类信息
    const categoryData = article.attributes.category?.data;
    const categoryName = categoryData?.attributes?.name || '未分类';
    const categorySlug = categoryData?.attributes?.slug || 'uncategorized';
    const coverUrl = article.attributes.cover?.data
        ? getStrapiMedia(article.attributes.cover.data.attributes.url)
        : null;

    // 获取所有分类和相关文章
    const [categories, relatedArticles] = await Promise.all([
        fetchCategories(),
        fetchRelatedArticles(categoryName, article.attributes.slug, 3)
    ]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* 面包屑导航 */}
                <div className="text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-green-600">首页</Link>
                    {' > '}
                    <Link href="/blog" className="hover:text-green-600">茶文化</Link>
                    {' > '}
                    <Link href={`/blog?category=${categorySlug}`} className="hover:text-green-600">
                        {categoryName}
                    </Link>
                    {' > '}
                    <span className="text-gray-900">{article.attributes.title}</span>
                </div>

                {/* 文章标题 */}
                <h1 className="text-4xl font-bold mb-4">{article.attributes.title}</h1>

                {/* 文章元信息 */}
                <div className="flex items-center gap-4 text-gray-600 mb-8">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {categoryName}
                    </span>
                    <span>{new Date(article.attributes.publishedAt).toLocaleDateString('zh-CN')}</span>
                </div>

                {/* 文章封面 */}
                {coverUrl && (
                    <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={coverUrl}
                            alt={article.attributes.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* 文章描述 */}
                <div className="text-xl text-gray-700 mb-8 leading-relaxed">
                    {article.attributes.description}
                </div>

                {/* 文章内容块 */}
                <div className="prose prose-lg max-w-none mb-12">
                    {article.attributes.blocks && article.attributes.blocks.map((block: any, index: number) => {
                        if (block.__component === 'shared.rich-text') {
                            return (
                                <div key={index} dangerouslySetInnerHTML={{ __html: block.body }} />
                            );
                        }
                        if (block.__component === 'shared.quote') {
                            return (
                                <blockquote key={index} className="border-l-4 border-green-600 pl-4 italic my-6">
                                    {block.body}
                                </blockquote>
                            );
                        }
                        if (block.__component === 'shared.media') {
                            const mediaUrl = block.file?.data?.attributes?.url
                                ? getStrapiMedia(block.file.data.attributes.url)
                                : null;
                            return mediaUrl ? (
                                <div key={index} className="my-6">
                                    <Image
                                        src={mediaUrl}
                                        alt={block.file.data.attributes.alternativeText || ''}
                                        width={800}
                                        height={600}
                                        className="rounded-lg"
                                    />
                                </div>
                            ) : null;
                        }
                        return null;
                    })}
                </div>

                {/* 相似分类 */}
                {categories.length > 0 && (
                    <div className="p-6 rounded-lg bg-gray-50 mb-12">
                        <h2 className="text-xl font-bold mb-4">相似分类</h2>
                        <div className="flex flex-wrap gap-2">
                            {/* 当前分类 */}
                            <Link
                                href={`/blog/${categorySlug}`}
                                className="px-3 py-1 rounded-lg bg-violet-700 text-white transition-colors"
                            >
                                #{categoryName}
                            </Link>
                            
                            {/* 其他分类（最多显示2个） */}
                            {categories
                                .filter(cat => cat.attributes.slug !== categorySlug)
                                .slice(0, 2)
                                .map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/blog/${cat.attributes.slug}`}
                                        className="px-3 py-1 rounded-lg bg-violet-400 text-gray-900 hover:bg-violet-500 transition-colors"
                                    >
                                        #{cat.attributes.name}
                                    </Link>
                                ))}
                            
                            {/* 全部分类 */}
                            <Link
                                href="/blog"
                                className="px-3 py-1 rounded-lg bg-violet-400 text-gray-900 hover:bg-violet-500 transition-colors"
                            >
                                #全部
                            </Link>
                        </div>
                    </div>
                )}

                {/* 相关文章 */}
                {relatedArticles.length > 0 && (
                    <div className="border-t pt-12">
                        <h2 className="text-2xl font-bold mb-6">相关文章</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => {
                                const relatedCoverUrl = related.attributes.cover?.data
                                    ? getStrapiMedia(related.attributes.cover.data.attributes.url)
                                    : null;
                                const relatedCategorySlug = related.attributes.category?.data?.attributes?.slug || 'uncategorized';

                                return (
                                    <Link
                                        key={related.id}
                                        href={`/blog/${relatedCategorySlug}/${related.attributes.slug}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        {relatedCoverUrl && (
                                            <div className="relative h-40 w-full">
                                                <Image
                                                    src={relatedCoverUrl}
                                                    alt={related.attributes.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-semibold mb-2 line-clamp-2">
                                                {related.attributes.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {related.attributes.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
