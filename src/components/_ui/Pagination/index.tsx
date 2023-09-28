import { Pagination, Grid } from '@mui/material'
import { ContainerPagination } from './style'

interface PaginationProps {
  totalPages: number;
  page: number;
  handleChange: any;
}

export const PortalPagination = ({
  totalPages, page, handleChange
}: PaginationProps) => (
  <Grid container spacing={1}>
    <ContainerPagination item xs={12} md={12} lg={12}>
      <Pagination color='secondary' count={totalPages} page={page} onChange={handleChange} />
    </ContainerPagination>
  </Grid>
)