"use client";

import AboutBentoGrid from "@/components/about/AboutBentoGrid";
import PageContainer from "@/components/PageContainer";
import { ABOUT_COPY } from "@/constants/about";
import { CSS_VARS } from "@/constants/theme";

export default function AboutPage() {
  return (
    <PageContainer
      title={ABOUT_COPY.title}
      subtitle={ABOUT_COPY.subtitle}
      themeColor={CSS_VARS.themePardon}
      hideHeader
      pageClassName="overflow-x-hidden overflow-y-scroll"
      contentClassName="flex min-h-screen w-full max-w-[1040px] items-center justify-center px-4 py-8 md:px-6"
    >
      <AboutBentoGrid />
    </PageContainer>
  );
}
