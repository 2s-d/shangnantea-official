/**
 * 商南茶城官网 API 调用函数
 * 用于获取 Tea Product, Company Info, Article, Category 等数据
 */

import { fetchAPI } from './fetch-api';

// ============================================
// 类型定义
// ============================================

export interface TeaProduct {
  id: number;
  attributes: {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    category: string;
    origin: string;
    features: string[];
    displayOrder: number;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          width: number;
          height: number;
        };
      };
    };
    gallery?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          width: number;
          height: number;
        };
      }>;
    };
    seo?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface CompanyInfo {
  id: number;
  attributes: {
    companyName: string;
    slogan: string;
    introduction: string;
    history: string;
    culture: string;
    address: string;
    phone: string;
    email: string;
    wechat: string;
    businessHours: string;
    shopUrl: string;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }>;
    };
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    articles?: {
      data: Article[];
    };
  };
}

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    cover?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    category: {
      data: Category;
    };
    blocks: any[];
    seo?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Global {
  id: number;
  attributes: {
    metadata: {
      metaTitle: string;
      metaDescription: string;
    };
    favicon?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    navbar: {
      navbarLogo?: {
        logoImg: {
          data: {
            id: number;
            attributes: {
              url: string;
              alternativeText?: string;
            };
          };
        };
        logoText?: string;
      };
      links: Array<{
        url: string;
        newTab: boolean;
        text: string;
      }>;
      button: {
        url: string;
        newTab: boolean;
        text: string;
        type: string;
      };
    };
    footer: {
      menuLinks: Array<{
        url: string;
        newTab: boolean;
        text: string;
      }>;
      legalLinks: Array<{
        url: string;
        newTab: boolean;
        text: string;
      }>;
      socialLinks?: Array<{
        url: string;
        newTab: boolean;
        text: string;
        social: string;
      }>;
    };
  };
}

// ============================================
// API 调用函数
// ============================================

/**
 * 获取全局配置 (导航栏、页脚等)
 */
export async function fetchGlobal(): Promise<Global> {
  // 对于组件字段，必须使用 populate[字段名][populate]=* 的方式
  const data = await fetchAPI('/global', {
    populate: {
      metadata: true,
      favicon: true,
      navbar: {
        populate: {
          links: true,
          button: true,
          navbarLogo: {
            populate: '*'
          }
        }
      },
      footer: {
        populate: '*'
      }
    }
  });
  
  return data.data;
}

/**
 * 获取公司信息
 */
export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const data = await fetchAPI('/company-info', {
    populate: '*',
  });
  return data.data;
}

/**
 * 获取所有茶叶产品
 */
export async function fetchTeaProducts(params?: {
  sort?: string;
  limit?: number;
}): Promise<TeaProduct[]> {
  const data = await fetchAPI('/tea-products', {
    populate: '*',
    sort: params?.sort || 'displayOrder:asc',
    ...(params?.limit && { 'pagination[limit]': params.limit }),
  });
  return data.data;
}

/**
 * 根据 slug 获取单个茶叶产品
 */
export async function fetchTeaProductBySlug(slug: string): Promise<TeaProduct | null> {
  const data = await fetchAPI('/tea-products', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*',
  });
  return data.data?.[0] || null;
}

/**
 * 获取相关产品 (同类别的其他产品)
 */
export async function fetchRelatedTeaProducts(
  category: string,
  excludeSlug: string,
  limit: number = 3
): Promise<TeaProduct[]> {
  const data = await fetchAPI('/tea-products', {
    filters: {
      category: {
        $eq: category,
      },
      slug: {
        $ne: excludeSlug,
      },
    },
    populate: '*',
    sort: 'displayOrder:asc',
    'pagination[limit]': limit,
  });
  return data.data;
}

/**
 * 获取所有分类
 */
export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchAPI('/categories', {
    populate: '*',
  });
  return data.data;
}

/**
 * 获取所有文章
 */
export async function fetchArticles(params?: {
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: Article[]; meta: any }> {
  const filters: any = {};
  
  if (params?.category) {
    filters.category = {
      name: {
        $eq: params.category,
      },
    };
  }

  const data = await fetchAPI('/articles', {
    filters,
    populate: '*',
    sort: params?.sort || 'createdAt:desc',
    'pagination[page]': params?.page || 1,
    'pagination[pageSize]': params?.pageSize || 6,
  });
  
  return {
    data: data.data,
    meta: data.meta,
  };
}

/**
 * 根据 slug 获取单篇文章
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const data = await fetchAPI('/articles', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*',
  });
  return data.data?.[0] || null;
}

/**
 * 获取相关文章 (同分类的其他文章)
 */
export async function fetchRelatedArticles(
  categoryName: string,
  excludeSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const data = await fetchAPI('/articles', {
    filters: {
      category: {
        name: {
          $eq: categoryName,
        },
      },
      slug: {
        $ne: excludeSlug,
      },
    },
    populate: '*',
    sort: 'createdAt:desc',
    'pagination[limit]': limit,
  });
  return data.data;
}

/**
 * 获取首页数据 (精选产品 + 最新文章)
 */
export async function fetchHomePageData() {
  const [companyInfo, featuredProducts, latestArticles, global] = await Promise.all([
    fetchCompanyInfo(),
    fetchTeaProducts({ limit: 3 }),
    fetchArticles({ pageSize: 2 }),
    fetchGlobal(),
  ]);

  return {
    companyInfo,
    featuredProducts,
    latestArticles: latestArticles.data,
    global,
  };
}
