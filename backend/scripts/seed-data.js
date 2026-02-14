/**
 * 商南茶城官网 - 种子数据填充脚本
 * 
 * 使用方法：
 * 1. 确保后端正在运行 (npm run develop)
 * 2. 登录管理后台 http://localhost:1337/admin
 * 3. 进入 Settings → API Tokens → Create new API Token
 * 4. 名称：seed-data，Token type: Full access，保存并复制 token
 * 5. 将 token 替换到下面的 ADMIN_TOKEN 常量
 * 6. 运行: node scripts/seed-data.js
 */

const API_URL = 'http://localhost:1337/api';
const ADMIN_TOKEN = 'e8654064f4c1246d3ed41729075dceb215a619a29107ab0748379d4f0db053091a24d62eb619ac5bfb7f24678575dd954c71b2971b0a50682e929bfc9c6b0b79e368c03a19ac366c64f92c6ed4d35676b66b290c695305d3aa8c5fad39dc27b26bd68800504483f6183019111667f5d20ff7bc7fc0f2f982a975ddea5bf42503';

// Global 全局配置数据 (Single Type)
// 注意：由于 navbar.navbarLogo 和 footer.footerLogo 需要上传图片，
// 这里暂时不设置 logo，可以后续在管理后台手动上传
const globalData = {
  data: {
    metadata: {
      metaTitle: '商南茶城 - 传承千年茶文化，品味自然好茶',
      metaDescription: '商南茶城位于陕西省商洛市商南县，专注于高品质茶叶生产和销售。我们提供商南仙茗、商南毛尖、商南红茶等优质茶叶产品。'
    },
    navbar: {
      links: [
        { url: '/', newTab: false, text: '首页' },
        { url: '/products', newTab: false, text: '产品' },
        { url: '/blog', newTab: false, text: '茶文化' },
        { url: '/about', newTab: false, text: '关于我们' },
        { url: '/contact', newTab: false, text: '联系我们' }
      ],
      button: {
        url: 'http://localhost:8082',
        newTab: true,
        text: '进入商城',
        type: 'primary'
      }
      // navbarLogo 需要上传图片，暂时不设置
    },
    footer: {
      menuLinks: [
        { url: '/', newTab: false, text: '首页' },
        { url: '/products', newTab: false, text: '产品' },
        { url: '/blog', newTab: false, text: '茶文化' },
        { url: '/about', newTab: false, text: '关于我们' },
        { url: '/contact', newTab: false, text: '联系我们' }
      ],
      legalLinks: [
        { url: '#', newTab: false, text: '© 2024 商南茶城 版权所有' },
        { url: '#', newTab: false, text: '陕西省商洛市商南县' }
      ]
      // footerLogo 和 socialLinks 可选，暂时不设置
    }
  }
};

// 公司信息数据 (Single Type)
const companyInfoData = {
  data: {
    companyName: '商南茶城',
    slogan: '传承千年茶文化，品味自然好茶',
    introduction: '<p>商南茶城位于陕西省商洛市商南县，是一家专注于高品质茶叶生产和销售的企业。我们秉承"传承千年茶文化，品味自然好茶"的理念，致力于为消费者提供最优质的茶叶产品。</p><p>商南县地处秦岭南麓，气候温和，雨量充沛，土壤肥沃，是茶叶生长的理想之地。我们的茶园坐落在海拔800-1200米的高山之上，常年云雾缭绕，为茶叶的生长提供了得天独厚的自然条件。</p>',
    history: '<p>商南茶文化源远流长，可追溯至唐代。据史料记载，商南茶叶曾作为贡品进献朝廷。改革开放以来，商南茶产业得到快速发展，成为当地的支柱产业之一。</p><p>商南茶城成立于2010年，经过十余年的发展，已成为商南地区最具影响力的茶叶企业之一。我们始终坚持传统工艺与现代技术相结合，不断提升茶叶品质。</p>',
    culture: '<p>我们的企业文化以"诚信、品质、创新、共赢"为核心价值观。</p><ul><li><strong>诚信</strong>：以诚待人，以信立业</li><li><strong>品质</strong>：精益求精，追求卓越</li><li><strong>创新</strong>：与时俱进，开拓进取</li><li><strong>共赢</strong>：合作共赢，共同发展</li></ul>',
    address: '陕西省商洛市商南县茶叶产业园区',
    phone: '400-888-6688',
    email: 'contact@shangnantea.com',
    wechat: 'shangnantea',
    businessHours: '周一至周日 9:00-18:00',
    shopUrl: 'http://localhost:8082'
  }
};

// 分类数据
const categoriesData = [
  { name: '茶文化', slug: 'tea-culture', description: '探索中国茶文化的博大精深' },
  { name: '公司新闻', slug: 'company-news', description: '商南茶城最新动态' },
  { name: '行业资讯', slug: 'industry-news', description: '茶叶行业最新资讯' }
];

// 茶叶产品数据
const teaProductsData = [
  {
    name: '商南仙茗',
    slug: 'shangnanxianming',
    shortDescription: '高山云雾茶，清香淡雅，回甘悠长',
    description: '<p>商南仙茗产自海拔1000米以上的高山茶园，常年云雾缭绕，日照充足。采用传统手工采摘，精选一芽一叶，经过杀青、揉捻、干燥等工序精制而成。</p><p>茶汤清澈明亮，香气清新持久，滋味鲜爽甘醇，叶底嫩绿匀整。富含茶多酚、氨基酸等营养成分，具有提神醒脑、生津止渴的功效。</p>',
    category: '绿茶',
    origin: '陕西商南',
    features: ['有机认证', '高山茶', '手工采摘', '传统工艺'],
    displayOrder: 1
  },
  {
    name: '商南毛尖',
    slug: 'shangnanmaojian',
    shortDescription: '细嫩芽尖，香高味醇，品质上乘',
    description: '<p>商南毛尖选用清明前后的细嫩芽尖为原料，经过精心挑选和加工。外形细直圆润，白毫显露，色泽翠绿。</p><p>冲泡后香气馥郁，汤色嫩绿明亮，滋味鲜醇回甘，叶底嫩匀成朵。是商南茶叶中的精品，深受茶友喜爱。</p>',
    category: '绿茶',
    origin: '陕西商南',
    features: ['明前茶', '芽尖', '精品', '礼盒装'],
    displayOrder: 2
  },
  {
    name: '商南红茶',
    slug: 'shangnanhongcha',
    shortDescription: '红汤红叶，香甜醇厚，温润养胃',
    description: '<p>商南红茶采用优质茶树鲜叶，经过萎凋、揉捻、发酵、干燥等工序制成。外形条索紧结，色泽乌润，金毫显露。</p><p>冲泡后汤色红艳明亮，香气浓郁持久，滋味醇厚甘甜，叶底红匀明亮。具有暖胃养胃、提神消疲的功效，适合四季饮用。</p>',
    category: '红茶',
    origin: '陕西商南',
    features: ['全发酵', '暖胃', '香甜', '耐泡'],
    displayOrder: 3
  }
];

// 文章数据
const articlesData = [
  {
    title: '商南茶文化的历史渊源',
    slug: 'shangnantea-history',
    description: '探索商南茶文化的千年传承，了解商南茶叶的历史发展脉络',
    blocks: [
      {
        __component: 'shared.rich-text',
        body: '<h2>商南茶文化源远流长</h2><p>商南县位于陕西省东南部，秦岭南麓，是中国重要的茶叶产区之一。商南茶文化可追溯至唐代，据《新唐书·地理志》记载，商南地区在唐代就已开始种植茶叶。</p><h3>历史发展</h3><p>唐代：商南茶叶开始种植，主要供应长安（今西安）市场。</p><p>宋代：商南茶叶品质得到提升，成为贡茶之一。</p><p>明清：商南茶叶生产规模扩大，茶文化逐渐形成。</p><p>现代：商南茶产业快速发展，成为当地支柱产业。</p><h3>文化传承</h3><p>商南茶文化融合了秦岭山区的自然风光和陕南地区的人文特色，形成了独特的茶文化体系。当地茶农世代传承制茶技艺，保留了许多传统的制茶方法。</p>'
      }
    ],
    categoryName: '茶文化'
  },
  {
    title: '如何品鉴一杯好茶',
    slug: 'tea-tasting-guide',
    description: '学习专业的品茶方法，提升茶叶鉴赏能力',
    blocks: [
      {
        __component: 'shared.rich-text',
        body: '<h2>品茶的艺术</h2><p>品茶是一门艺术，需要调动视觉、嗅觉、味觉等多种感官。一杯好茶，不仅要有优质的茶叶，还需要正确的冲泡方法和品鉴技巧。</p><h3>观其色</h3><p>首先观察干茶的外形、色泽，优质茶叶外形匀整，色泽鲜活。冲泡后观察茶汤的颜色和透明度，好茶汤色清澈明亮。</p><h3>闻其香</h3><p>闻干茶的香气，优质茶叶香气纯正、持久。冲泡后闻茶汤的香气，好茶香气馥郁、层次丰富。</p><h3>品其味</h3><p>小口品饮，让茶汤在口腔中停留片刻，感受茶的滋味。好茶滋味鲜爽、醇厚、回甘，无苦涩感。</p><h3>看叶底</h3><p>品饮后观察叶底，优质茶叶叶底嫩匀、完整、鲜活。</p>'
      }
    ],
    categoryName: '茶文化'
  }
];

// 创建全局配置
async function createGlobal() {
  console.log('正在创建全局配置...');
  try {
    const response = await fetch(`${API_URL}/global`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify(globalData)
    });
    
    if (response.ok) {
      console.log('✓ 全局配置创建成功');
    } else {
      const error = await response.text();
      console.error('✗ 全局配置创建失败:', error);
    }
  } catch (error) {
    console.error('✗ 全局配置创建失败:', error.message);
  }
}

// 创建公司信息
async function createCompanyInfo() {
  console.log('\n正在创建公司信息...');
  try {
    const response = await fetch(`${API_URL}/company-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify(companyInfoData)
    });
    
    if (response.ok) {
      console.log('✓ 公司信息创建成功');
    } else {
      const error = await response.text();
      console.error('✗ 公司信息创建失败:', error);
    }
  } catch (error) {
    console.error('✗ 公司信息创建失败:', error.message);
  }
}

// 创建分类
async function createCategories() {
  console.log('\n正在创建分类...');
  const createdCategories = {};
  
  for (const category of categoriesData) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`
        },
        body: JSON.stringify({ data: category })
      });
      
      if (response.ok) {
        const data = await response.json();
        createdCategories[category.name] = data.data.id;
        console.log(`✓ 分类 "${category.name}" 创建成功 (ID: ${data.data.id})`);
      } else {
        const error = await response.text();
        console.error(`✗ 分类 "${category.name}" 创建失败:`, error);
      }
    } catch (error) {
      console.error(`✗ 分类 "${category.name}" 创建失败:`, error.message);
    }
  }
  
  return createdCategories;
}

// 创建茶叶产品
async function createTeaProducts() {
  console.log('\n正在创建茶叶产品...');
  for (const product of teaProductsData) {
    try {
      const response = await fetch(`${API_URL}/tea-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`
        },
        body: JSON.stringify({ data: product })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ 产品 "${product.name}" 创建成功 (ID: ${data.data.id})`);
        
        // 发布产品
        if (data.data && data.data.id) {
          await publishTeaProduct(data.data.id);
        }
      } else {
        const error = await response.text();
        console.error(`✗ 产品 "${product.name}" 创建失败:`, error);
      }
    } catch (error) {
      console.error(`✗ 产品 "${product.name}" 创建失败:`, error.message);
    }
  }
}

// 发布茶叶产品
async function publishTeaProduct(id) {
  try {
    await fetch(`${API_URL}/tea-products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          publishedAt: new Date().toISOString()
        }
      })
    });
    console.log(`  ✓ 产品 ID ${id} 已发布`);
  } catch (error) {
    console.error(`  ✗ 产品 ID ${id} 发布失败:`, error.message);
  }
}

// 创建文章
async function createArticles(categories) {
  console.log('\n正在创建文章...');
  for (const article of articlesData) {
    try {
      const categoryId = categories[article.categoryName];
      if (!categoryId) {
        console.error(`✗ 文章 "${article.title}" 创建失败: 找不到分类 "${article.categoryName}"`);
        continue;
      }
      
      const articleData = {
        title: article.title,
        slug: article.slug,
        description: article.description,
        blocks: article.blocks,
        category: categoryId
      };
      
      const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`
        },
        body: JSON.stringify({ data: articleData })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ 文章 "${article.title}" 创建成功 (ID: ${data.data.id})`);
        
        // 发布文章
        if (data.data && data.data.id) {
          await publishArticle(data.data.id);
        }
      } else {
        const error = await response.text();
        console.error(`✗ 文章 "${article.title}" 创建失败:`, error);
      }
    } catch (error) {
      console.error(`✗ 文章 "${article.title}" 创建失败:`, error.message);
    }
  }
}

// 发布文章
async function publishArticle(id) {
  try {
    await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          publishedAt: new Date().toISOString()
        }
      })
    });
    console.log(`  ✓ 文章 ID ${id} 已发布`);
  } catch (error) {
    console.error(`  ✗ 文章 ID ${id} 发布失败:`, error.message);
  }
}

// 主函数
async function main() {
  console.log('========================================');
  console.log('商南茶城官网 - 种子数据填充');
  console.log('========================================\n');
  
  await createGlobal();
  await createCompanyInfo();
  const categories = await createCategories();
  await createTeaProducts();
  await createArticles(categories);
  
  console.log('\n========================================');
  console.log('✅ 数据填充完成！');
  console.log('========================================');
  console.log('\n请访问以下地址查看：');
  console.log('- 管理后台: http://localhost:1337/admin');
  console.log('- 全局配置: http://localhost:1337/api/global?populate=deep');
  console.log('- 公司信息: http://localhost:1337/api/company-info?populate=*');
  console.log('- 分类列表: http://localhost:1337/api/categories');
  console.log('- 产品列表: http://localhost:1337/api/tea-products?populate=*');
  console.log('- 文章列表: http://localhost:1337/api/articles?populate=*\n');
}

main();
