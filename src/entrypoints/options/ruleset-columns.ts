import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import RulesetToggle from "./ruleset-toggle.svelte"
import RulesetActions from "./ruleset-actions.svelte"
import { RulesetStorage } from "$lib/storage";
import { push } from 'svelte-spa-router';
import { Ruleset } from "$lib/schema";
import { toast } from 'svelte-sonner'
import ToastHTML from '$lib/components/toast-html.svelte'

export const columns: ColumnDef<Ruleset>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      return renderComponent(RulesetToggle, {
        id: row.original.id,
        checked: row.original.active,
        disabled: false,
        onCheckedChange: async () => {
          const ruleset = await RulesetStorage.get(row.original.id);
          if (ruleset == undefined) return;
          ruleset.active = !ruleset.active;
          await RulesetStorage.update(ruleset)
          if (!ruleset.active) {
            toast(ToastHTML, { componentProps: { message: `${row.original.name} - <b>Disabled</b>` } })
          } else {
            toast(ToastHTML, { componentProps: { message: `${row.original.name} - <b>Enabled</b>` } })
          }
        }
      })
    }
  },
  {
    accessorKey: "updated",
    header: "Last updated",
    cell: ({ row }) => {
      return renderSnippet(
        createRawSnippet(() => {
          return { render: () => `<p>${new Date(row.original.updated).toLocaleString()}</p>` }
        }), {})
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(RulesetActions, {
        editRuleset: () => push(`/ruleset/${row.original.id}`),
        deleteRuleset: () => RulesetStorage.delete(row.original.id),
        name: row.original.name,
      })
    }
  }
];
