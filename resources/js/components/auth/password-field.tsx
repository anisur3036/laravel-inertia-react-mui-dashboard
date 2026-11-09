import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';

export function PasswordField(props: Omit<TextFieldProps, 'type'>) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <TextField
            {...props}
            type={isVisible ? 'text' : 'password'}
            slotProps={{
                ...props.slotProps,
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    setIsVisible((visible) => !visible)
                                }
                                aria-label={
                                    isVisible
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                                aria-pressed={isVisible}
                                edge="end"
                            >
                                {isVisible ? (
                                    <VisibilityOffRounded />
                                ) : (
                                    <VisibilityRounded />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
