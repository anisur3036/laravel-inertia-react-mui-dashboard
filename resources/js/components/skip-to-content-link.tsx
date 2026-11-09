import Button from '@mui/material/Button';

export function SkipToContentLink({ targetId }: { targetId: string }) {
    return (
        <Button
            href={`#${targetId}`}
            variant="contained"
            onClick={(event) => {
                event.preventDefault();
                document.getElementById(targetId)?.focus();
            }}
            sx={(theme) => ({
                position: 'fixed',
                top: 8,
                left: 8,
                zIndex: theme.zIndex.tooltip + 1,
                transform: 'translateY(-200%)',
                '&:focus-visible': { transform: 'translateY(0)' },
            })}
        >
            Skip to main content
        </Button>
    );
}
