"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { SectionHeading, SectionHeadingLink } from "@/components/section-heading";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { ANNOUNCEMENTS } from "@/lib/sample-data";
import { Bookmark } from "lucide-react";

const SAVED_ITEMS_VISIBLE_COUNT = 6;

export function AdminDashboard({ firstName }: { firstName: string }) {
  const { items: savedItems } = useSavedItems();

  return (
    <div className="space-y-6">
      <PageHero
        title={`Welcome back, ${firstName}`}
        description="Track ecosystem health and manage the partner community."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col lg:col-span-3">
          <SectionHeading action={<SectionHeadingLink href="/saved-items" />}>Saved Items</SectionHeading>
          {savedItems.length === 0 ? (
            <Card className="flex flex-1 flex-col items-center justify-center gap-2 border border-border p-8 text-center">
              <Bookmark className="size-6 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">No saved items yet</p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Click the bookmark icon on any hub page to pin it here for quick access.
              </p>
            </Card>
          ) : (
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
              {savedItems.slice(0, SAVED_ITEMS_VISIBLE_COUNT).map((item) => {
                const Icon = SAVED_ITEM_ICONS[item.iconKey] ?? Bookmark;
                return (
                  <Link key={item.id} href={item.href}>
                    <Card className="flex h-full flex-col justify-center border border-border bg-linear-to-br from-emphasis/20 via-accent to-secondary p-4 transition-all hover:border-primary hover:shadow-card">
                      <div className="flex size-10 items-center justify-center text-primary">
                        <Icon className="size-5" />
                      </div>
                      <p className="mt-3 text-sm font-medium leading-snug">{item.label}</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:col-span-2">
          <SectionHeading action={<SectionHeadingLink href="/resources" />}>Announcements</SectionHeading>
          <Card className="flex-1 border border-border p-5">
            <ItemGroup>
              {ANNOUNCEMENTS.map((item, i) => (
                <React.Fragment key={item.title}>
                  <Item size="sm" className="items-start px-0">
                    <ItemMedia className="self-stretch">
                      <div
                        className={`h-full w-1 rounded-full ${item.isEvent ? "bg-info" : "bg-border"}`}
                      />
                    </ItemMedia>
                    <ItemContent className="min-w-0">
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemDescription className="text-xs">{item.description}</ItemDescription>
                    </ItemContent>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-xs whitespace-nowrap text-emphasis">{item.time}</span>
                    </div>
                  </Item>
                  {i < ANNOUNCEMENTS.length - 1 && <ItemSeparator />}
                </React.Fragment>
              ))}
            </ItemGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}
