import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-footer.png"
              alt="Softex Celware"
              width={489}
              height={72}
              className="h-5 w-auto"
            />
            <p className="text-xs text-gray-500 mt-1">
              Excel VBA・GAS・Webアプリ開発で業務を自動化
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.softex-celware.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              公式サイト
            </a>
            <a
              href="https://www.softex-celware.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              無料相談
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Softex Celware. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
