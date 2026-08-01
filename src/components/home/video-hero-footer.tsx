export function VideoHeroFooter() {
  return (
    <section className="h-[350px] w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="size-full object-cover object-center"
      >
        <source src="/videos/gearup-login.mp4" type="video/mp4" />
      </video>
    </section>
  );
}