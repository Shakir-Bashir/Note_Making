import { supabase } from "../supabaseClient";
import type { Page } from "./types";
import { debounce } from "./debounce";

export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("pages").update(page).eq("id", page.id);
  },
  500
);
