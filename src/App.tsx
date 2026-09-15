import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { PromptView } from './components/PromptView'
import { BetterList } from './components/BetterList'
import { Explanation } from './components/Explanation'
import { BookFooter } from './components/BookFooter'
import { EditorPage } from './components/EditorPage'
import { parsePrompt } from './parsePrompt'
import { encodeDoc, segmentsToDoc, stringifyDoc } from './promptDoc'

const DEFAULT_PROMPT =
  'Please open the file config.json and ' +
  '[replace all double quotes with single quotes]' +
  '{This is a simple find-and-replace — a one-line sed command is faster and 100% reliable, ' +
  'no need to ask an LLM: `sed -i \'\' "s/\\"/\'/g" config.json`} ' +
  'then save it.'

function getPromptFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get('p')
}

function useHash(): string {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

function ImproveCta({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="shrink-0 rounded-[9px] bg-brand px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap text-white hover:opacity-90"
    >
      Build a walkthrough →
    </a>
  )
}

function Home() {
  const prompt = useMemo(() => getPromptFromUrl() ?? DEFAULT_PROMPT, [])
  const segments = useMemo(() => parsePrompt(prompt), [prompt])
  const walkthroughHref = useMemo(() => {
    const text = stringifyDoc(segmentsToDoc(segments))
    return `?doc=${encodeDoc(text)}#editor`
  }, [segments])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center px-6 pt-16 pb-14">
        <div className="flex w-full max-w-[860px] flex-col gap-10">
          <div className="flex items-start justify-between gap-4">
            <Header />
            <ImproveCta href={walkthroughHref} />
          </div>
          <PromptView segments={segments} />
          <BetterList segments={segments} />
        </div>
      </div>
      <Explanation />
      <BookFooter />
    </div>
  )
}

function App() {
  const hash = useHash()
  return hash.startsWith('#editor') ? <EditorPage /> : <Home />
}

export default App
