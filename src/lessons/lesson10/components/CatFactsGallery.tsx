import { FC } from "react";
import { CatFactCard } from "./CatFactCard";

interface CatFactsGalleryProps {
  facts: Array<{ fact: string; imageUrl?: string }>;
}

export const CatFactsGallery: FC<CatFactsGalleryProps> = ({ facts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {facts.map((fact, index) => (
        <CatFactCard key={index} fact={fact.fact} imageUrl={fact.imageUrl} />
      ))}
    </div>
  );
};
