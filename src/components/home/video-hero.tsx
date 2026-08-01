export function VideoHero() {
  return (
    <section className="h-[400px] w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="size-full object-cover object-center"
      >
        <source src="/videos/gearup-hero.mp4" type="video/mp4" />
      </video>
    </section>
  );
}