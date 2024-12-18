import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading.tsx";
import { FC, useCallback, useEffect, useState } from "react";

interface FoxApiResponse {
  image: string;
  link: string;
}

const Lesson08: FC = () => {
  const { t, ready } = useTranslation("lesson08", { useSuspense: false });
  const [foxImage, setFoxImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const fetchFoxImage = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsImageLoaded(false);
      const response = await fetch("https://randomfox.ca/floof/");
      const data: FoxApiResponse = await response.json();
      setFoxImage(data.image);
    } catch (error) {
      console.error("Error fetching fox image:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFoxImage();
  }, [fetchFoxImage]);

  const handleImageLoad = (): void => {
    setIsImageLoaded(true);
    setIsLoading(false);
  };

  const handleImageError = (): void => {
    setIsLoading(false);
    setIsImageLoaded(false);
    console.error("Error loading image");
  };

  const handleRefreshClick = (): void => {
    void fetchFoxImage();
  };

  if (!ready) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {t("title")}
        </h1>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-full max-w-md h-[300px] flex justify-center items-center">
            {foxImage && (
              <img
                src={foxImage}
                alt="Random Fox"
                className={`
                  w-full h-full object-cover rounded-lg shadow-lg
                  transition-opacity duration-300
                  ${isImageLoaded ? "opacity-100" : "opacity-0"}
                `}
                width={400}
                height={300}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>

          <button
            onClick={handleRefreshClick}
            type="button"
            disabled={isLoading}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {isLoading ? t("loading") : t("refresh")}
          </button>

          {!isImageLoaded && !isLoading && foxImage && (
            <div className="text-red-600 dark:text-red-400 text-center">
              {t("error-loading")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson08;
