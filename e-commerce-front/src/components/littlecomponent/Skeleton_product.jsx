import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
export default function Skeleton_product (){
    return
    (
        <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
       
        {/* For other variants, adjust the size with `width` and `height` */}
        
        <Skeleton variant="rectangular" width={210} height={120} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" width={130} height={60} />
      </Stack>
     
    );

}