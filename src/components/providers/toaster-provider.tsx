import Icon from "../common/icon";
import { Toaster } from "../ui/sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      dir="rtl"
      pauseWhenPageIsHidden
      toastOptions={{ className: "bg-background font-vazirmatn" }}
      icons={{
        info: <Icon name="Info" size={16} className="stroke-cyan-500" />,
        success: (
          <Icon name="CircleCheckBig" size={16} className="stroke-green-500" />
        ),
        error: (
          <Icon name="CircleAlert" size={16} className="stroke-destructive" />
        ),
        warning: (
          <Icon name="TriangleAlert" size={16} className="stroke-yellow-500" />
        ),
        loading: (
          <Icon name="LoaderCircle" size={16} className="animate-spin" />
        ),
      }}
    />
  );
}
