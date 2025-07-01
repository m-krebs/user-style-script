import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import RulesetToggle from "./ruleset-toggle.svelte"
import { ExtModuleStorage } from "$lib/storage";
import { ExtModule } from "$lib/schema";
import ModuleActions from "./module-actions.svelte"
import { truncateUrl } from "$lib/utils";
import { createRawSnippet } from "svelte";

export const columns: ColumnDef<ExtModule>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const url = truncateUrl(row.original.source)
      return renderSnippet(
        createRawSnippet(() => {
          return { render: () => `<p>${url}</p>` }
        }), {})
    }
  },

  {
    header: "Auto Update",
    cell: ({ row }) => {
      return renderComponent(RulesetToggle, {
        id: row.original.id,
        checked: row.original.autoUpdate,
        disabled: true,
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
