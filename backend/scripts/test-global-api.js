/**
 * 测试 Global API 返回的数据结构
 * 用于调试 navbarLogo 是否正确返回
 */

const API_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token-here'; // 从 .env 文件获取

async function testGlobalAPI() {
  try {
    const url = `${API_URL}/api/global?populate[metadata]=true&populate[favicon]=true&populate[navbar][populate][links]=true&populate[navbar][populate][button]=true&populate[navbar][populate][navbarLogo][populate]=*&populate[footer][populate]=*`;
    
    console.log('🔍 Testing Global API...');
    console.log('URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('\n✅ API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // 检查 navbarLogo
    const navbarLogo = data.data?.attributes?.navbar?.navbarLogo;
    console.log('\n📋 NavbarLogo Data:');
    console.log(JSON.stringify(navbarLogo, null, 2));
    
    if (navbarLogo) {
      console.log('\n✅ NavbarLogo exists!');
      console.log('- logoImg:', navbarLogo.logoImg ? '✅ Found' : '❌ Missing');
      console.log('- logoText:', navbarLogo.logoText || '(empty)');
    } else {
      console.log('\n❌ NavbarLogo is missing!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGlobalAPI();
