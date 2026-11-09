import { router } from '@inertiajs/react';
import { SearchRounded } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/config/navigation';
import { flattenNavItems } from '@/lib/navigation';
import type { SearchableNavItem } from '@/lib/navigation';

const searchableItems = flattenNavItems(
    navigation.flatMap((section) => section.items),
);

/** Searches the navigation tree. Focus with Ctrl/⌘ + K. */
export function GlobalSearch() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent));

        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === 'k'
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = (item: SearchableNavItem | null) => {
        if (!item) {
            return;
        }

        setInputValue('');
        inputRef.current?.blur();
        router.visit(item.href);
    };

    return (
        <Box role="search" sx={{ width: '100%', maxWidth: 440 }}>
            <Autocomplete<SearchableNavItem, false, false, false>
                options={searchableItems}
                value={null}
                inputValue={inputValue}
                onInputChange={(_event, value) => setInputValue(value)}
                onChange={(_event, item) => handleSelect(item)}
                getOptionLabel={(option) => option.title}
                filterOptions={(options, { inputValue: query }) => {
                    const needle = query.trim().toLowerCase();

                    return needle === ''
                        ? options
                        : options.filter((option) =>
                              `${option.path} ${option.title}`
                                  .toLowerCase()
                                  .includes(needle),
                          );
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="No matching pages"
                blurOnSelect
                clearOnBlur
                handleHomeEndKeys
                popupIcon={null}
                size="small"
                renderOption={({ key, ...optionProps }, option) => {
                    const Icon = option.icon;

                    return (
                        <Box
                            component="li"
                            key={key}
                            {...optionProps}
                            sx={{ gap: 1.5 }}
                        >
                            <Icon fontSize="small" color="action" />
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" noWrap>
                                    {option.title}
                                </Typography>
                                {option.path && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        noWrap
                                        component="p"
                                    >
                                        {option.path}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputRef={inputRef}
                        placeholder="Search pages…"
                        slotProps={{
                            ...params.slotProps,
                            htmlInput: {
                                ...params.slotProps.htmlInput,
                                'aria-label': 'Search pages',
                            },
                            input: {
                                ...params.slotProps.input,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <Box
                                        component="kbd"
                                        aria-hidden
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'inline-flex',
                                            },
                                            px: 0.75,
                                            py: 0.25,
                                            mr: 0.5,
                                            fontSize: 11,
                                            fontFamily: 'inherit',
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'divider',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        {isMac ? '⌘K' : 'Ctrl K'}
                                    </Box>
                                ),
                            },
                        }}
                        sx={(theme) => ({
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2.5,
                                bgcolor: alpha(
                                    theme.palette.text.primary,
                                    0.04,
                                ),
                                '& fieldset': { borderColor: 'transparent' },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.divider,
                                },
                            },
                        })}
                    />
                )}
            />
        </Box>
    );
}
