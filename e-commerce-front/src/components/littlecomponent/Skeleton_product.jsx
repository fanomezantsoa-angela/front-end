import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export const Skeleton_produit=()=>{
    return (
        <div className="flex flex-row items-center justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <Stack key={index} spacing={1} sx={{ width: 210, marginRight: 5, my: 5 }}>
            <Skeleton variant="rectangular"width={200} height={170}/>
            <Skeleton variant="text" sx={{ fontSize: '2.5rem' }} />
            <Skeleton variant="text" width={110} height={20} />
            <Skeleton variant="text" width={70} height={20} />
            <Skeleton variant="rounded" width={190} height={80} />
          </Stack>
        ))}
      </div>
      );
}