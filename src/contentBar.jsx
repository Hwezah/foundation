export default function ContentBar() {
  return (
    <div className="flex overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hidden gap-4 justify-between items-center md:pt-3 pt-2 pb-3 font-bold">
      <div>
        <a
          href="/sermons"
          className="bg-amber-400 text-[#000608] px-4 py-2 block rounded-lg"
        >
          Sermons
        </a>
      </div>
      <div>
        <a href="/podcasts" className="bg-[#000608] px-4 py-2 block rounded-lg">
          Podcasts
        </a>
      </div>
      <div>
        <a href="/music" className="bg-[#000608] px-4 py-2 block rounded-lg">
          Music
        </a>
      </div>
      <div>
        <a
          href="/bible-studies"
          className="bg-[#000608] px-4 py-2 block rounded-lg"
        >
          Bible Studies
        </a>
      </div>
      <div>
        <a
          href="/prayer-fellowship"
          className="bg-[#000608] px-4 py-2 block rounded-lg"
        >
          Prayer
        </a>
      </div>
      <div>
        <a
          href="/live-feed"
          className="bg-[#000608] px-4 py-2 block rounded-lg"
        >
          Live-feed
        </a>
      </div>
      <div>
        <a
          href="/Testimonies"
          className="bg-[#000608] px-4 py-2 block rounded-lg"
        >
          Testimonies
        </a>
      </div>
    </div>
  );
}
