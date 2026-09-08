import DivisionPage from '@/components/ecosystem/DivisionPage'
import { getDivision } from '@/lib/divisions'
import { divisionJsonLd, divisionMetadata } from '@/lib/division-meta'

const division = getDivision('teams')

export const metadata = divisionMetadata(division)

export default function TeamsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(divisionJsonLd(division)) }}
      />
      <DivisionPage division={division} />
    </>
  )
}
