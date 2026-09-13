import { useMemo } from 'react'
import { Header } from './components/Header'
import { PromptView } from './components/PromptView'
import { BetterList } from './components/BetterList'
import { Explanation } from './components/Explanation'
import { BookFooter } from './components/BookFooter'
import { parsePrompt } from './parsePrompt'

const DEFAULT_PROMPT =
  'Please open the file config.json and ' +
  '[replace all double quotes with single quotes]' +
  '{This is a simple find-and-replace — a one-line sed command is faster and 100% reliable, ' +
  'no need to ask an LLM: sed -i \'\' "s/\\"/\'/g" config.json} ' +
  'then save it.'

function getPromptFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get('p')
}

function App() {
  const prompt = useMemo(() => getPromptFromUrl() ?? DEFAULT_PROMPT, [])
  const segments = useMemo(() => parsePrompt(prompt), [prompt])

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-16 pb-24">
      <div className="flex w-full max-w-[860px] flex-col gap-10">
        <Header />
        <PromptView segments={segments} />
        <BetterList segments={segments} />
        <Explanation />
        <BookFooter />
      </div>
    </div>
  )
}

export default App
