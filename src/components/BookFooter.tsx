import bookCover from '../assets/book-cover.webp'

const BOOK_URL = 'https://learning.oreilly.com/library/view/building-ai-agent/0642572243906/'

export function BookFooter() {
  return (
    <div className="w-full bg-ink">
      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:text-left">
        <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img
            src={bookCover}
            alt="Building AI Agent Platforms book cover"
            className="h-[112px] w-auto rounded shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
          />
        </a>
        <div className="flex flex-1 flex-col gap-1">
          <div className="text-xs font-semibold tracking-wider text-[oklch(0.75_0.03_264)] uppercase">
            From the authors of
          </div>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-[#faf9f7] hover:underline"
          >
            Building AI Agent Platforms
          </a>
          <div className="text-sm text-[oklch(0.82_0.01_264)]">Ben O'Mahony, Fabian Nonnenmacher</div>
          <div className="max-w-[480px] text-sm text-[oklch(0.82_0.01_264)]">
            A practical guide to scaling the development of AI applications and agents efficiently across the enterprise.
          </div>
        </div>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[9px] bg-[#faf9f7] px-[18px] py-2.5 text-[13.5px] font-semibold whitespace-nowrap text-ink"
        >
          Get the book
        </a>
      </div>
    </div>
  )
}
