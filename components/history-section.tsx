import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { changelog } from "@/lib/mock-data";
import Image from "next/image";

export function HistorySection() {
  const data = changelog.map((item, index) => ({
    title: item.title,
    content: (
      <div key={index}>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          {item.content}
        </p>
        {item?.additionalContent && (
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            {item?.additionalContent}
          </p>
        )}
        <div className="grid grid-cols-2 gap-4">
          {item.images.map((image, index) => (
            <Image
              src={image || "/placeholder.svg"}
              key={index}
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
