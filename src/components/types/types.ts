import { DialogProps } from '@mui/material'

export type DialogProp = {
    open: boolean;
    title: string;
    handleClickOpen: () => void;
    handleClose: () => void;
    content: any;
    maxWidth: DialogProps['maxWidth'];
    fullWidthValeu: boolean | undefined;
    footer: any;
    icon: boolean | undefined;
    iconType: string | null;
    textAlign: string | null;
}