import Loader from "../../../components/Loader.tsx";
import { CatFactsGallery } from "../components/CatFactsGallery.tsx";
import { useEffect, useState } from "react";
import Button from "../../../components/Button.tsx";
import { useTranslation } from "react-i18next";

interface CatFact {
  fact: string;
  imageUrl?: string;
}

export default function Lesson10() {
  const [facts, setFacts] = useState<CatFact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, ready } = useTranslation("lesson10", { useSuspense: false });

  const fetchCatFact = async () => {
    setIsLoading(true);
    try {
      const factResponse = await fetch("https://catfact.ninja/fact");
      const factData = await factResponse.json();

      const imageResponse = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=false&order=RANDOM&page=0&limit=1",
      );
      const imageData = await imageResponse.json();

      const newFact: CatFact = {
        fact: factData.fact,
        imageUrl: imageData[0]?.url,
      };

      setFacts((prev) => [...prev, newFact]);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  const handleGetMoreInfo = () => {
    fetchCatFact();
  };

  const handleDeleteAllData = () => {
    setFacts([]);
  };

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 mb-6">
        <Button onClick={handleGetMoreInfo}>{t("get-more")}</Button>
        {facts.length > 0 && (
          <Button
            onClick={handleDeleteAllData}
            className={
              "py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            }
          >
            {t("delete-all")}
          </Button>
        )}
      </div>

      {isLoading && <Loader />}

      <div className="overflow-y-auto" style={{ maxHeight: "700px" }}>
        {facts.length > 0 && <CatFactsGallery facts={facts} />}
      </div>
    </div>
  );
}
