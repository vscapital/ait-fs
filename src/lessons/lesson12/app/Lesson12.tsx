import { FormGender } from "../components/FormGender";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";

export default function Lesson12() {
  const { ready } = useTranslation("lesson12", { useSuspense: false });

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FormGender />
    </div>
  );
}
