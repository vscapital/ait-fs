import { FC } from "react";

interface CatFactCardProps {
  fact: string;
  imageUrl?: string;
}

export const CatFactCard: FC<CatFactCardProps> = ({ fact, imageUrl }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
      {imageUrl && (
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={imageUrl}
          alt="Cat"
        />
      )}
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {fact}
        </p>
      </div>
    </div>
  );
};
