import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function AuthHeading({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
        </Box>
    );
}
