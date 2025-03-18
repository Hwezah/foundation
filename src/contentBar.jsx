export default function BontentBar() {
  return (
    <div className="flex justify-between items-center  p-12 pt-4 font-bold">
      <div>
        <a href="/sermons" className="bg-[#01222e] px-4 py-2 block rounded-lg">
          Sermons
        </a>
      </div>
      <div>
        <a href="/podcasts" className="bg-[#01222e] px-4 py-2 block rounded-lg">
          Podcasts
        </a>
      </div>
      <div>
        <a href="/music" className="bg-[#01222e] px-4 py-2 block rounded-lg">
          Music
        </a>
      </div>
      <div>
        <a
          href="/bible-studies"
          className="bg-[#01222e] px-4 py-2 block rounded-lg"
        >
          Bible Studies
        </a>
      </div>
      <div>
        <a
          href="/prayer-fellowship"
          className="bg-[#01222e] px-4 py-2 block rounded-lg"
        >
          Prayer & Fellowship
        </a>
      </div>
      <div>
        <a
          href="/live-feed"
          className="bg-[#01222e] px-4 py-2 block rounded-lg"
        >
          Live-feed
        </a>
      </div>
      <div>
        <a
          href="/Testimonies"
          className="bg-[#01222e] px-4 py-2 block rounded-lg"
        >
          Testimonies
        </a>
      </div>
    </div>
  );
}
