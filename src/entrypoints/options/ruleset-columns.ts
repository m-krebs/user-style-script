import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import RulesetToggle from "./RulesetToggle.svelte"
import RulesetActions from "./RulesetActions.svelte"
import { RulesetStorage } from "$lib/storage";
import { push } from 'svelte-spa-router';
import { Ruleset } from "$lib/schema";

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
        checked: row.original.active
      })
    }
  },
  {
    accessorKey: "updated",
    header: "Last updated",
    cell: ({ row }) => {
      return renderSnippet(
        createRawSnippet(() => {
          return { render: () => `${new Date(row.original.updated).toLocaleString()}` }
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
