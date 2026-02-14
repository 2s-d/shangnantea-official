import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { fetchGlobal } from "./utils/tea-api";
import { getStrapiMedia } from "./utils/api-helpers";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const global = await fetchGlobal();
    const { metadata, favicon } = global.attributes;

    // 获取 favicon URL
    const faviconUrl = favicon?.data?.attributes?.url 
      ? getStrapiMedia(favicon.data.attributes.url)
      : null;

    return {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      ...(faviconUrl && {
        icons: {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        },
      }),
    };
  } catch (error) {
    return {
      title: "商南茶城",
      description: "传承千年茶文化，品味自然好茶",
    };
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await fetchGlobal();
  const navbar = global?.attributes?.navbar;
  const footer = global?.attributes?.footer;

  // 如果没有数据，直接抛出错误，不使用 fallback
  if (!navbar || !navbar.links || !navbar.button) {
    throw new Error("Navbar data is missing from CMS!");
  }
  if (!footer || !footer.menuLinks || !footer.legalLinks) {
    throw new Error("Footer data is missing from CMS!");
  }

  // 获取 logo 数据
  const logoImg = navbar.navbarLogo?.logoImg?.data?.attributes?.url
    ? getStrapiMedia(navbar.navbarLogo.logoImg.data.attributes.url)
    : null;
  const logoText = navbar.navbarLogo?.logoText || "商南茶城";

  return (
    <html lang={params.lang}>
      <body>
        {/* Navbar - 始终显示 */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3">
                {logoImg && (
                  <img 
                    src={logoImg} 
                    alt={logoText}
                    className="h-10 w-auto"
                  />
                )}
                <span className="text-2xl font-bold text-green-600">
                  {logoText}
                </span>
              </Link>
              <div className="hidden md:flex space-x-8">
                {navbar.links.map((link: any, index: number) => (
                  <Link
                    key={index}
                    href={link.url}
                    target={link.newTab ? "_blank" : undefined}
                    className="text-gray-700 hover:text-green-600 transition"
                  >
                    {link.text}
                  </Link>
                ))}
                <Link
                  href={navbar.button.url}
                  target={navbar.button.newTab ? "_blank" : undefined}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  {navbar.button.text}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer - 始终显示 */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Menu Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">快速链接</h3>
                <ul className="space-y-2">
                  {footer.menuLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        target={link.newTab ? "_blank" : undefined}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold mb-4">联系我们</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>电话: 400-888-6688</li>
                  <li>邮箱: contact@shangnantea.com</li>
                  <li>地址: 陕西省商洛市商南县</li>
                </ul>
              </div>
            </div>

            {/* Legal Links */}
            <div className="pt-8 border-t border-gray-800 text-center">
              <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm">
                {footer.legalLinks.map((link: any, index: number) => (
                  <span key={index}>
                    {link.url === '#' ? (
                      link.text
                    ) : (
                      <Link
                        href={link.url}
                        target={link.newTab ? "_blank" : undefined}
                        className="hover:text-white transition"
                      >
                        {link.text}
                      </Link>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
