import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";
import { Button } from "./button";

export function LanguageToggle() {
  const { t } = useTranslation();
  const { toggleLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className="text-primary hover:text-accent transition-colors"
    >
      {t("nav.language")}
    </Button>
  );
}
