import { Pagination, Grid } from '@mui/material'
import { ContainerPagination } from './style'

interface PaginationProps {
  totalPages: number;
  page: number;
  handleChange: any;
}

export default function PortalPagination({ totalPages, page, handleChange }: PaginationProps) {
  return (<>
    <Grid container spacing={1}>
      <ContainerPagination item xs={12} md={12} lg={12}>
        {/* <Pagination count={1} color="secondary" /> */}
        <Pagination color='secondary' count={totalPages} page={page} onChange={handleChange} />
      </ContainerPagination>
    </Grid>
  </>
  )
}