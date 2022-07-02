/* eslint-disable import/prefer-default-export */
import { Skeleton, Stack, Card, CardHeader, CardContent } from '@mui/material';

export const DrinkLabelSkeleton = () => (
    <Stack spacing={1}>
        <Skeleton variant="wave" width="70%" height={30} />
        <Skeleton variant="wave" width="35%" />
    </Stack>
);

export const PreparationSkeleton = () => (
    <Stack spacing={1}>
        <Skeleton variant="wave" width="100%" />
        <Skeleton variant="wave" width="100%" />
        <Skeleton variant="wave" width="90%" />
        <Skeleton variant="wave" width="60%" />
    </Stack>
);

export const IngredientSkeleton = () => (
    <Card variant="outlined" sx={{ minWidth: 150, borderRadius: 8 }}>
        <CardHeader title={<Skeleton variant="wave" width="70%" />} />
        <Skeleton variant="rectangular" width={150} height={80} />
        <CardContent>
            <Skeleton variant="wave" width="100%" />
        </CardContent>
    </Card>
);
