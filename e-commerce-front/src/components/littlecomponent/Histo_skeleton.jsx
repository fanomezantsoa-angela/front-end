import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
export const Histo_skeleton = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <Stack
          key={index}
          spacing={1}
          sx={{ width: 210, marginRight: 5, my: 5 }}
        >
          <div className="bg-white rounded-lg p-1.5">
            <Skeleton variant="rectangular" width={190} height={170} />
            <Skeleton variant="text" sx={{ fontSize: "2.5rem" }} />
            <Skeleton variant="text" width={110} height={20} />
            <Skeleton
              variant="text"
              width={70}
              height={20}
              sx={{ marginLeft: 5, marginRight: 5 }}
            />
            <Skeleton
              variant="rounded"
              width={160}
              height={80}
              sx={{ marginLeft: 2, marginRight: 2 }}
            />
          </div>
        </Stack>
      ))}
    </div>
  );
};
