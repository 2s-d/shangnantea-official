/**
 * 测试 Article API 查询
 */

const API_URL = 'http://localhost:1337/api';

async function testArticleQueries() {
  console.log('========================================');
  console.log('测试 Article API 查询');
  console.log('========================================\n');

  // 测试 1: 获取所有文章（不带 populate）
  console.log('测试 1: 获取所有文章（不带 populate）');
  try {
    const response1 = await fetch(`${API_URL}/articles`);
    const data1 = await response1.json();
    console.log(`✓ 找到 ${data1.data.length} 篇文章`);
    if (data1.data.length > 0) {
      console.log(`  第一篇文章: ID=${data1.data[0].id}, slug=${data1.data[0].attributes.slug}`);
    }
  } catch (error) {
    console.error('✗ 查询失败:', error.message);
  }

  console.log('\n测试 2: 用 slug 查询（不带 populate）');
  try {
    const response2 = await fetch(`${API_URL}/articles?filters[slug][$eq]=shangnanchawenhuadelishiyuanyuan`);
    const data2 = await response2.json();
    console.log(`✓ 找到 ${data2.data.length} 篇文章`);
    if (data2.data.length > 0) {
      console.log(`  文章标题: ${data2.data[0].attributes.title}`);
      console.log(`  文章 slug: ${data2.data[0].attributes.slug}`);
    }
  } catch (error) {
    console.error('✗ 查询失败:', error.message);
  }

  console.log('\n测试 3: 用 slug 查询（带 populate=*）');
  try {
    const response3 = await fetch(`${API_URL}/articles?filters[slug][$eq]=shangnanchawenhuadelishiyuanyuan&populate=*`);
    const data3 = await response3.json();
    console.log(`✓ 找到 ${data3.data.length} 篇文章`);
    if (data3.data.length > 0) {
      console.log(`  文章标题: ${data3.data[0].attributes.title}`);
      console.log(`  有 blocks: ${data3.data[0].attributes.blocks ? 'YES' : 'NO'}`);
      if (data3.data[0].attributes.blocks) {
        console.log(`  blocks 数量: ${data3.data[0].attributes.blocks.length}`);
      }
    }
  } catch (error) {
    console.error('✗ 查询失败:', error.message);
  }

  console.log('\n测试 4: 用 slug 查询（带 populate=deep）');
  try {
    const response4 = await fetch(`${API_URL}/articles?filters[slug][$eq]=shangnanchawenhuadelishiyuanyuan&populate=deep`);
    const data4 = await response4.json();
    console.log(`✓ 找到 ${data4.data.length} 篇文章`);
    if (data4.data.length > 0) {
      console.log(`  文章标题: ${data4.data[0].attributes.title}`);
      console.log(`  有 blocks: ${data4.data[0].attributes.blocks ? 'YES' : 'NO'}`);
      if (data4.data[0].attributes.blocks) {
        console.log(`  blocks 数量: ${data4.data[0].attributes.blocks.length}`);
      }
    }
  } catch (error) {
    console.error('✗ 查询失败:', error.message);
  }

  console.log('\n========================================');
}

testArticleQueries();
