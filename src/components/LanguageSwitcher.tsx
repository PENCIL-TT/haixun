import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // Normalize language code
  const currentLang = i18n.language?.startsWith("zh") ? "zh" : "en";

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {currentLang === "en" ? "中文" : "EN"}
    </Button>
  );
}
