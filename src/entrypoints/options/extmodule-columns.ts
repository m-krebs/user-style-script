import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import RulesetToggle from "./RulesetToggle.svelte"
import { ExtModuleStorage } from "$lib/storage";
import { ExtModule } from "$lib/schema";
import ModuleActions from "./ModuleActions.svelte"

export const columns: ColumnDef<ExtModule>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "source",
    header: "Source"
  },
  {
    header: "Auto Update",
    cell: ({ row }) => {
      return renderComponent(RulesetToggle, {
        id: row.original.id,
        checked: row.original.autoUpdate,
        onCheckedChange: async () => {
          const module = await ExtModuleStorage.get(row.original.id);
          if (module == undefined) return;
          module.autoUpdate = !module.autoUpdate;
          ExtModuleStorage.update(module)
        }
      })
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(ModuleActions, {
        id: row.original.id,
      })
    }
  }
];
