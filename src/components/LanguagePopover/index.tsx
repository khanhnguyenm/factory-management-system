import { useState } from 'react';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import VietnamIcon from '../../assets/icons/ic_flag_vn.svg';
import EnglishIcon from '../../assets/icons/ic_flag_en.svg';
import JapanIcon from '../../assets/icons/ic_flag_ja.svg';
import './style.scss';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: EnglishIcon,
  },
  {
    value: 'ja',
    label: 'Japanese',
    icon: JapanIcon,
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: VietnamIcon,
  },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGS[0]);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (selectedValue: any) => {
    handleClose();
    setSelectedLanguage(LANGS.filter(lang => lang.value === selectedValue)[0]);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44
        }}
      >
        <img src={selectedLanguage.icon} alt={selectedLanguage.label} className="flag-img"/>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => handleChangeLanguage(option.value)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
