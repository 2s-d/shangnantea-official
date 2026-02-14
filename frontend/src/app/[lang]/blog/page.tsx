"use client";
import { useState, useEffect } from "react";
import { fetchArticles, fetchCategories, type Article, type Category } from "../utils/tea-api";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [articlesData, categoriesData] = await Promise.all([
          fetchArticles({
            category: selectedCategory || undefined,
            page: currentPage,
            pageSize: 6,
          }),
          fetchCategories(),
        ]);
        
        setArticles(articlesData.data);
        setCategories(categoriesData);
        setTotalPages(articlesData.meta.pagination.pageCount);
      } catch (error) {
        console.error("加载文章失败:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">茶文化</h1>
        <p className="text-gray-600">探索茶的世界，品味千年文化</p>
      </div>

      {/* 分类筛选 */}
      <div className="flex justify-center mb-8 flex-wrap gap-3">
        <button
          onClick={() => handleCategoryChange("")}
          className={`px-6 py-2 rounded-full transition-colors ${
            selectedCategory === ""
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.attributes.name)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === category.attributes.name
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.attributes.name}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">暂无文章</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => {
            const coverUrl = article.attributes.cover?.data
              ? getStrapiMedia(article.attributes.cover.data.attributes.url)
              : null;
            const categoryName = article.attributes.category.data.attributes.name;
            const categorySlug = article.attributes.category.data.attributes.slug;

            return (
              <Link
                key={article.id}
                href={`/blog/${categorySlug}/${article.attributes.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {coverUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={coverUrl}
                      alt={article.attributes.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-green-600 mb-2">{categoryName}</div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {article.attributes.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.attributes.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(article.attributes.publishedAt).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span className="px-4 py-2">
            第 {currentPage} / {totalPages} 页
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
