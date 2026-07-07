import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Row } from '@/components/layout/Row';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { catalogStats, marketplaceItems } from '@/data/marketplace';

export function ExportFormats() {
  return (
    <Section>
      <Container>
        <Row className="mb-8 items-end justify-between">
          <Stack className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#CCFF00]">Export inventory</p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Preview-only export surfaces</h2>
          </Stack>
          <p className="max-w-md text-sm leading-6 text-zinc-400">All {marketplaceItems.length} catalog items expose this same UI-only export format set.</p>
        </Row>
        <Grid className="sm:grid-cols-2 lg:grid-cols-7">
          {catalogStats.exportFormats.map((format) => (
            <div className="rounded-2xl border border-white/10 bg-[#0D1320] p-4 text-center text-sm text-zinc-200" key={format}>
              {format}
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
