import Section from "./(sections)/section";

export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] h-[300vh]">
      <Section>
        <div className="mt-6">
          <img
            src="https://cdnpro.eraspace.com/media/mageplaza/blog/post/a/p/apaitustreetphotography_3.jpeg"
            alt="hero"
            height={500}
            width={1500}
          />
        </div>
      </Section>
    </div>
  );
}
