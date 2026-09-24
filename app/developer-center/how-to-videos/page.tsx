import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { SectionHeading } from "@/components/section-heading";
import {
  DEVELOPER_HOW_TOS,
  DEVELOPER_HOW_TOS_INTRO,
  PRODUCT_RELEASES,
  RELEASE_NOTES_HREF,
  VIDEO_SHORTS,
  VIDEO_SHORTS_INTRO,
} from "@/lib/developer-how-tos";

// Content mirrors community.vantiq.com/devcenter/technical-documents-content/
// (see lib/developer-how-tos.ts). Every link opens the real page in a new tab.

const SECTIONS = [
  { id: "developer-how-tos", label: "Developer How Tos" },
  { id: "key-resources", label: "Key Resources" },
  { id: "product-release", label: "Product Release" },
  { id: "how-to-video-shorts", label: "How-To Video Shorts" },
] as const;

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
    >
      {children}
    </a>
  );
}

export default function DeveloperHowTosPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Developer How To's"
        description="Welcome to the VANTIQ Developer Portal. This is where you can find all technical resources for Vantiq developers."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/how-to-videos",
            label: "Developer How To's",
            href: "/developer-center/how-to-videos",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="max-w-3xl space-y-8">
          <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-primary hover:underline">
                {s.label}
              </a>
            ))}
          </nav>

          <section id="developer-how-tos" className="scroll-mt-6">
            <SectionHeading>Developer How Tos</SectionHeading>
            <Card className="shadow-card gap-0 p-6">
              <p className="text-sm text-muted-foreground">{DEVELOPER_HOW_TOS_INTRO}</p>
              {DEVELOPER_HOW_TOS.map((y) => (
                <div key={y.year} className="mt-5">
                  <h3 className="text-base font-semibold text-foreground">{y.year}</h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {y.entries.map((e) => (
                      <li key={e.when + e.title}>
                        <strong className="font-semibold text-foreground">{e.when}</strong>{" "}
                        <Ext href={e.href}>{e.title}</Ext>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          </section>

          <section id="key-resources" className="scroll-mt-6">
            <SectionHeading>Key Resources</SectionHeading>
            <Card className="shadow-card gap-0 p-6 text-sm text-muted-foreground">
              <h4 className="text-sm font-semibold text-foreground">
                VANTIQ Platform Documentation (<Ext href="https://dev.vantiq.com/docs/system/index.html">link</Ext>)
              </h4>
              <div className="mt-2 space-y-3">
                <p>
                  The documentation provides a number of fully worked examples as well as descriptions of each VANTIQ
                  feature and the details necessary to use the feature effectively.
                </p>
                <p>
                  We recommend starting with the tutorials, including the{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/tutorials/tutorial/index.html">Introductory Tutorial,</Ext>{" "}
                  that contain fully worked example automation systems.
                </p>
                <p>
                  Documentation for Vantiq’s full suite of development tools include the{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/services/index.html">Service Builder</Ext>,{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/cbuser/index.html">Client Builder</Ext> and{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/designmodeler/index.html">Design Modeler</Ext>.
                </p>
                <p>
                  The <Ext href="https://dev.vantiq.com/docs/system/api/index.html">API Reference Guide</Ext> and the{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/resourceguide/index.html">Resource Reference Guide</Ext>{" "}
                  detail the available resources and the structure of the REST API for accessing the resources. The{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/rules/index.html">Rule and Procedure Reference Guide</Ext>{" "}
                  describes all the features available for creating rules to ingest data, identify situations and produce
                  actions and notifications.
                </p>
                <p>
                  The resources can also be accessed from the <Ext href="https://dev.vantiq.com/">Developer Portal</Ext>{" "}
                  and from the Vantiq{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/cli/index.html">CLI Reference Guide</Ext>.
                </p>
                <p>
                  The integration of external sources and systems is documented in the{" "}
                  <Ext href="https://dev.vantiq.com/docs/system/sources/source/index.html">Source Overview</Ext>.
                </p>
              </div>

              <h4 className="mt-6 text-sm font-semibold text-foreground">
                Deployment Configurations Presentation (
                <Ext href="https://community.vantiq.com/resourcefiles/vantiq-deployment-configurations/">link</Ext>)
              </h4>
              <p className="mt-2">
                VANTIQ supports a range of deployment options for the VANTIQ platform. Customers select the option that
                best matches their business and technical requirements.
                <br />
                This paper presents the VANTIQ deployment options, the prerequisites that must be satisfied for each
                deployment option and the advantages and disadvantages of each option.
              </p>
            </Card>
          </section>

          <section id="product-release" className="scroll-mt-6">
            <SectionHeading>Product Release</SectionHeading>
            <Card className="shadow-card gap-0 p-6 text-sm text-muted-foreground">
              <p>VANTIQ generally schedules 3 product releases per calendar year.</p>
              <p className="mt-4 font-semibold text-foreground">Product Release Notes in Documentation</p>
              <p className="mt-1">
                <Ext href={RELEASE_NOTES_HREF}>See All Release Notes</Ext>
              </p>
              {PRODUCT_RELEASES.map((r) => (
                <div key={r.label} className="mt-4">
                  <p className="font-semibold text-foreground">{r.label}</p>
                  <p className="mt-1">
                    <Ext href={r.href}>{r.linkText}</Ext>
                  </p>
                </div>
              ))}
            </Card>
          </section>

          <section id="how-to-video-shorts" className="scroll-mt-6">
            <SectionHeading>How-To Video Shorts</SectionHeading>
            <Card className="shadow-card gap-0 p-6">
              <p className="text-sm text-muted-foreground">{VIDEO_SHORTS_INTRO}</p>
              {VIDEO_SHORTS.map((g) => (
                <div key={g.heading} className="mt-5">
                  <h4 className="text-sm font-semibold text-foreground">{g.heading}</h4>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Ext href={item.href}>{item.title}</Ext>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          </section>
      </div>
    </div>
  );
}
