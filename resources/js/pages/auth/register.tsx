import { RouterLink } from '@/components/router-link';
import { Form, Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthHeading } from '@/components/auth/auth-heading';
import { PasswordField } from '@/components/auth/password-field';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <AuthHeading
                title="Create an account"
                description="Get started in less than a minute."
            />

            <Form
                {...store.form()}
                resetOnError={['password', 'password_confirmation']}
                disableWhileProcessing
            >
                {({ errors, processing }) => (
                    <Stack spacing={2.5}>
                        <TextField
                            name="name"
                            label="Full name"
                            autoComplete="name"
                            autoFocus
                            required
                            fullWidth
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        <TextField
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            required
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <PasswordField
                            name="password"
                            label="Password"
                            autoComplete="new-password"
                            required
                            fullWidth
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password ?? 'At least 8 characters.'
                            }
                        />
                        <PasswordField
                            name="password_confirmation"
                            label="Confirm password"
                            autoComplete="new-password"
                            required
                            fullWidth
                            error={Boolean(errors.password_confirmation)}
                            helperText={errors.password_confirmation}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            loading={processing}
                            fullWidth
                        >
                            Create account
                        </Button>
                    </Stack>
                )}
            </Form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <MuiLink
                        component={RouterLink}
                        href={login.url()}
                        sx={{ fontWeight: 600 }}
                    >
                        Log in
                    </MuiLink>
                </Typography>
            </Box>
        </>
    );
}
