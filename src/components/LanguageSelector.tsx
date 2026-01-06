"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Menu, MenuItem, Button, ListItemText, Box } from "@mui/material";
import { Check, ChevronDown, Globe } from "lucide-react";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (code: string) => {
        setLanguage(code as any);
        handleClose();
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'te', label: 'Telugu (తెలుగు)' },
        { code: 'hi', label: 'Hindi (हिंदी)' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <Box>
            <Button
                onClick={handleClick}
                variant="contained"
                disableElevation
                sx={{
                    textTransform: 'none',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    color: '#333',
                    border: '1px solid #e0e0e0',
                    padding: { xs: '8px', md: '6px 16px' },
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                        borderColor: '#d0d0d0',
                    },
                    minWidth: 'auto',
                    display: 'flex',
                    gap: 1,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
            >
                <Globe size={18} className="text-gray-600" />
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, fontWeight: 600, fontSize: '0.875rem' }}>
                    {currentLang.label.split(' ')[0]}
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </Box>
            </Button>

            <Menu
                anchorEl={anchorEl}
                id="language-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.1))',
                        mt: 0.5,
                        borderRadius: 3,
                        minWidth: 180,
                        border: '1px solid #f0f0f0',
                        '& .MuiList-root': {
                            padding: 1
                        }
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        selected={language === lang.code}
                        sx={{
                            padding: '10px 16px',
                            borderRadius: 2,
                            mb: 0.5,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 101, 54, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 101, 54, 0.12)',
                                }
                            },
                            '&:hover': {
                                backgroundColor: '#f9fafb'
                            }
                        }}
                    >
                        <ListItemText
                            primary={lang.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color: '#1f2937' }}
                        />
                        {language === lang.code && (
                            <Check size={16} color="#006536" />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
