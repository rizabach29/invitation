import Counter from "./(sections)/counter";
import Section from "./(sections)/section";

export default function Home() {
  return (
    <div className="items-center justify-items-center pb-20 gap-16 font-[family-name:var(--font-geist-sans)] h-[300vh]">
      <Section>
        <div className="">
          <img
            src="https://cdnpro.eraspace.com/media/mageplaza/blog/post/a/p/apaitustreetphotography_3.jpeg"
            alt="hero"
            className="w-screen h-auto"
          />
        </div>
      </Section>
      <Section>
        <div className="mt-24">
          <Counter />
        </div>
      </Section>
    </div>
  );
}
