import { RouterLink } from '@/components/router-link';
import { Form, Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthHeading } from '@/components/auth/auth-heading';
import { PasswordField } from '@/components/auth/password-field';
import { register } from '@/routes';
import { store } from '@/routes/login';

export default function Login() {
    return (
        <>
            <Head title="Log in" />
            <AuthHeading
                title="Welcome back"
                description="Log in to your account to continue."
            />

            <Form
                {...store.form()}
                resetOnError={['password']}
                disableWhileProcessing
            >
                {({ errors, processing }) => (
                    <Stack spacing={2.5}>
                        <TextField
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <PasswordField
                            name="password"
                            label="Password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox name="remember" value="1" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            loading={processing}
                            fullWidth
                        >
                            Log in
                        </Button>
                    </Stack>
                )}
            </Form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Don&apos;t have an account?{' '}
                    <MuiLink
                        component={RouterLink}
                        href={register.url()}
                        sx={{ fontWeight: 600 }}
                    >
                        Create one
                    </MuiLink>
                </Typography>
            </Box>
        </>
    );
}
