import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import Icon from "./common/icon";
import NavLinks from "./nav-links";
import { Button } from "./ui/button";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          className="inline-flex rounded-full md:hidden size-11"
          size={"icon"}
          variant={"secondary"}
        >
          <Icon name="Menu" size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader />

        <NavLinks className="mt-5" />
      </SheetContent>
    </Sheet>
  );
}
