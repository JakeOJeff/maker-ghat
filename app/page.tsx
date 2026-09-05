import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import StoryCanvas from "./components/StoryCanvas";

export default function OurStoryPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <StoryCanvas />
      </main>
      <SiteFooter />
    </>
  );
}
